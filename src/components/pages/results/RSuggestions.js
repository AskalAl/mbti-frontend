import React from 'react';

export default class RSuggestions extends React.Component {
  render() {
    const { suggestions } = this.props;
    return (
        <div> {
          suggestions
            &&  <p className='mt-3'>You may also consider the following type(s):
                <b> { suggestions.join(', ') }</b></p>
        } </div>
    );
  };
}