import React from 'react';
import RChart from './RChart';

const dimensionsLeft = [`Extroversion`, 'Sensing', 'Thinking', 'Judging'];
const dimensionsRight = ['Introversion', 'iNtuition', 'Feeling', 'Perceiving'];

export default class RContainer extends React.Component {

  createLabelHTML = (label) => {
    let key = label;
    label = label.replace(/[A-Z]/, l => `<b class="text-accent">${ l }</b>`);
    return (<span key={key} className='r-chart-label'
                  dangerouslySetInnerHTML={{ __html: label }}/>);
  };

  render() {
    const labelsLeft = dimensionsLeft.map(d => this.createLabelHTML(d));
    const labelsRight = dimensionsRight.map(d => this.createLabelHTML(d));

    return (
        <div>
          <div className='r-chart-container'>
            <div className='r-chart-label-group align-items-end'>
              {labelsLeft}
            </div>
            <div>
              <div>
                <RChart data={this.props.dimensions}/>
              </div>
            </div>
            <div className='r-chart-label-group align-items-start'>
              {labelsRight}
            </div>
          </div>
        </div>
    );
  };
}
