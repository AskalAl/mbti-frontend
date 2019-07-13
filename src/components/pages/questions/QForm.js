import React from 'react';
import QListItem from './QListItem';
import { Alert, Button, Form, Label, ListGroup, } from 'reactstrap';
import QEmailInput from './QEmailInput';
import { views } from '../../App';
import { getQuestions, postAnswers } from '../../../services/backend';
import { emailValidationRegex } from '../../../constants';

export default class QForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: this.getQuestionsFromStorage(),
      isValidEmail: true,
      unanswered: [],
      emailString: '',
    };

    if (!this.state.questions.length) {
      this.loadQuestionsFromServer();
    }

    this.props.updateResults(undefined);
  }

  getQuestionsFromStorage = () => {
    try {
      return JSON.parse(sessionStorage.getItem('questions')) || [];
    } catch (ignored) {
      return [];
    }
  };

  loadQuestionsFromServer = () => {
    getQuestions().then(data => {
      this.setState({
        questions: data.questions
      }, () => {
        sessionStorage.setItem('questions', JSON.stringify(this.state.questions))
      });
    });
  };

  handleInputChangeAnswer = (index, answer) => {
    this.setState({
      questions: this.state.questions.map((q, i) => index === i ? { ...q, answer: answer } : q),
      unanswered: this.state.unanswered.filter(i => index !== i)
    });
  };

  handleInputChangeEmail = (event) => {
    this.setState({
      emailString: event.target.value.trim()
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let isValidEmail = emailValidationRegex.test(this.state.emailString);

    let unanswered = this.state.questions
        .filter(q => !q.hasOwnProperty('answer'))
        .map(q => this.state.questions.indexOf(q));

    this.setState({
      isValidEmail: isValidEmail,
      unanswered: unanswered
    });

    if (isValidEmail && unanswered.length === 0) {
      const answers = this.state.questions.map(
          q => ({ questionId: q['id'], answer: q['answer'] }));

      postAnswers(answers, this.state.emailString)
          .then(data => {
            if (data) {
              this.props.updateResults(data);
              this.props.setView(views.results);
            } else {
              throw Error(data);
            }
          })
          .catch(error => {
            this.setState({ error: error.error || error.toString() });
          });
    }
  };

  render() {
    return (
        <Form className='q-form' onSubmit={this.handleSubmit}>
          <ListGroup flush className='border-top border-bottom border-dark'>
            {
              this.state.questions.length > 0
                  ? this.state.questions.map(
                  (q, i) => <QListItem question={q['text']}
                                       index={i} key={i}
                                       unanswered={this.state.unanswered}
                                       handleInputChangeAnswer={this.handleInputChangeAnswer}/>)
                  : <Alert isOpen className='my-3' color='danger'>
                    <span>Failed to load questions...</span>
                  </Alert>
            }
          </ListGroup>
          <QEmailInput handleInputChangeEmail={this.handleInputChangeEmail}/>
          <Label className='q-alert-label text-danger'>
            {
              this.state.unanswered.length > 0
                  ? ' Please answer all questions '
                  : !this.state.isValidEmail
                  ? ' Please provide a valid email address '
                  : this.state.error
                      ? <span>{this.state.error}</span>
                      : <span>&nbsp;</span>
            }
          </Label>
          <Button id='submitButton'
                  name='submitButton'
                  color='primary'
                  className='w-25 mb-5'
                  disabled={!this.state.questions.length}>Get Report
          </Button>
        </Form>
    );
  };
}