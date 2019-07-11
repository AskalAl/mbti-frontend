import React from 'react';
import '../styles/app.css';
import Questions from './pages/questions/Questions';
import Results from './pages/results/Results';

export const views = Object.freeze({ questions: 1, results: 2 });

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { view: views.questions, results: undefined };
  }

  setView = (view) => {
    this.setState({ view })
  };

  updateResults = (results) => {
    this.setState({ results });
  };

  render() {
    const { view } = this.state;
    return (
        <div>
          {view === views.questions
              && <Questions setView={this.setView}
                            updateResults={this.updateResults}/>}
          {view === views.results
              && <Results setView={this.setView}
                          results={this.state.results}/>}
        </div>
    );
  }
}
