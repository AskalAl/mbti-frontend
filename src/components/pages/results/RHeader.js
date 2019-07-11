import React from 'react';

export default class RHeader extends React.Component {
  render() {
    const {acronym, pseudonym} = this.props;
    return (
        <div className='header'>
          <h1 className='header-text'>{acronym}</h1>
          <h5>Your perspective type is <b>{acronym}</b>: {pseudonym}</h5>
        </div>
    );
  };
}
