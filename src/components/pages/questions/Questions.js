import React from 'react';
import QForm from './QForm';
import QHeader from './QHeader';

export default class Questions extends React.Component {
  render() {
    return (
        <div className='page'>
          <QHeader/>
          <QForm setView={this.props.setView}
                 updateResults={this.props.updateResults}/>
        </div>
    );
  };
}