import React from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { accentColor, scale } from '../../../constants';

const min = scale[0];
const max = scale[scale.length - 1];
const mid = (min + max) / 2;

export default class RChart extends React.Component {
  formatAndTranspose = data => {
    if (!data) return {};
    return Object.keys(data).map(key => ({
      dimension: key,
      value: data[key] - mid || -.1
    }));
  };

  render() {
    return (
        <BarChart width={500}
                  height={180}
                  data={this.formatAndTranspose(this.props.data)}
                  barCategoryGap={8}
                  layout='vertical'>
          <XAxis type='number' domain={[-3, 3]} hide/>
          <YAxis type='category' dataKey='dimension' hide/>
          <Bar dataKey='value' fill={accentColor}
               background={{ fill: 'white', stroke: accentColor }}/>
        </BarChart>
    );
  };
}
