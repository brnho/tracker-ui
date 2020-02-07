import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, FormGroup, ControlLabel, Button, } from 'react-bootstrap';

import UserContext from './UserContext.js';

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value, 
      title: form.title.value, 
      due: new Date(new Date().getTime() + 1000*60*60*24*10),
    }
    this.props.createIssue(issue);
    form.owner.value = ''; form.title.value = '';
  }

  render() {
    const user = this.context;
    return (
      <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>Owner:</ControlLabel>
          {' '}
          <FormControl type="text" name="owner" />
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel>Title:</ControlLabel>
          {' '}
          <FormControl type="text" name="title" />
        </FormGroup>
        {' '}
        <Button disabled={!user.signedIn} bsStyle="primary" type="submit">Add</Button>
      </Form>
    );
  }
}

IssueAdd.contextType = UserContext;

export default IssueAdd;