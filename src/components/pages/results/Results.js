import React from 'react';
import RHeader from './RHeader';
import { Button } from 'reactstrap';
import { views } from '../../App';
import RContainer from './RContainer';
import { myersBriggsTypes as MBTypes } from '../../../constants';
import RSuggestions from './RSuggestions';

export default class Results extends React.Component {

  goBack = () => {
    this.props.setView(views.questions);
  };

  render() {
    const acronym = this.props.results && this.props.results['type'];
    const pseudonym = this.props.results && MBTypes.find(t => t.acronym === acronym)['pseudonym'];
    const dimensions = this.props.results && this.props.results['dimensions'] ;
    const suggestions = this.props.results && this.props.results['alternatives'];

    return (
        <div className='page w-100 vh-100'>
          <RHeader acronym={acronym} pseudonym={pseudonym}/>
          <RContainer dimensions={dimensions} suggestions={suggestions}/>
          <RSuggestions suggestions={suggestions}/>
          <div>
            <Button id='goBackButton' name='goBackButton'
                    outline color='danger' className='my-5 px-5'
                    onClick={this.goBack}>Retake Test
            </Button>
          </div>
        </div>
    );
  };
}
