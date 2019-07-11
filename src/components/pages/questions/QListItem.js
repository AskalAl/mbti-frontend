import React from 'react';
import { ButtonGroup, CustomInput, FormGroup, Label, ListGroupItem } from 'reactstrap';
import { scale } from '../../../constants';

export default class QListItem extends React.Component {

  updateCallback = (e) => {
    const index = parseInt(e.target.name);
    const value = parseInt(e.target.id.substring(0, 1));
    this.props.updateAnswer(index, value);
  };

  render() {
    return (
        <ListGroupItem className='pt-4 pb-2' style={
          this.props.unanswered.includes(this.props.index)
              ? { backgroundColor: 'var(--highlight-color)' }
              : { backgroundColor: 'transparent' }}>
          <Label>{this.props.question}</Label>
          <FormGroup className='q-select-group'>
            <span className='q-select-item text-danger'>Disagree</span>
            <ButtonGroup vertical={false} className='q-select-item ml-2'>
              {scale.map(s =>
                  <CustomInput type='radio'
                               className='q-select-radio'
                               key={s}
                               id={`${s}_` + this.props.index}
                               name={this.props.index}
                               onClick={this.updateCallback}/>)}
            </ButtonGroup>
            <span className='q-select-item text-success'>Agree</span>
          </FormGroup>
        </ListGroupItem>
    );
  };
}