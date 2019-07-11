import React from 'react';
import { Input, InputGroup, Label, Container } from 'reactstrap';

export default class QEmailInput extends React.Component {
  render() {
    return (
        <Container className='mt-5 w-75'>
          <Label className='font-weight-bold'>Your Email</Label>
          <InputGroup>
            <Input type='text' id='emailInput' name='emailInput'
                   className='form-control'
                   placeholder={'address@domain.com'}
                   onChange={this.props.handleInputChangeEmail}/>
          </InputGroup>
        </Container>
    );
  };
}
