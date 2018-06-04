import React from 'react';
import { Button, FormGroup, Label, Input, FormText, FormFeedback,ModalFooter } from 'reactstrap';
import { Field, Form, reduxForm} from 'redux-form'
import { addComment, updateComment , setComment} from '../actions'
import { connect } from 'react-redux'
import uuid from 'uuid'

class FormComment extends React.Component {

  submit = (values) => {
    const {parentId} = this.props
    const comment = {
        id: values.id || uuid().split("-").join(""),
        timestamp: values.timestamp || Date.now(),
        body: values.body,
        author: values.author,
        parentId: parentId,
        voteScore: 1,
        deleted: false,
        parentDeleted: false
    }

    if(values.id === undefined) {
        this.props.addComment({ ...comment})
    } else {
        this.props.updateComment({ ...comment})
    }

    // ({ id, timestamp, body, author, parentId })

    
    this.props.setComment(null);
    
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <Form onSubmit={handleSubmit(this.submit)}>
        <Field name="author" component={renderField} type="text" placeholder="Author" label="Author"/>
        <Field name="body" component={renderField} type="textarea" placeholder="Body" label="Body"/>

        <ModalFooter>
          <Button color="primary" disabled={pristine || submitting} type="submit">Save</Button>
        </ModalFooter>

      </Form>
    );
  }
}


const renderField = ({
  input,
  label,
  type,
  name,
  placeholder,
  value,
  meta: { touched, error, warning, ...custom}
}) => (
  <FormGroup>
    <Label for={name}>{label}</Label>
    <Input type={type} name={name} id={name} placeholder={placeholder} {...input} {...custom } />
    {touched &&
      ((error && <FormFeedback>{error}</FormFeedback>) ||
        (warning && <FormText>{warning}</FormText>))}
  </FormGroup> 
)

//Post side validation
function validate(values) {
    const errors = {};

    if (!values.author || values.author.trim() === '') {
        errors.author = 'Enter an Author';
    }

    if(values.author && values.author.length > 10) {
        errors.author = 'Too big, max 10 characters';
    }

    if(!values.body || values.body.trim() === '') {
        errors.body = 'Enter a Body';
    }

    if(values.body && values.body.length > 50) {
        errors.body = 'Too big, max 50 characters';
    }
    return errors;
}

FormComment = reduxForm({
  form: 'commentform', // a unique identifier for this form
  // validate, // <--- validation function given to redux-form
  // warn // <--- warning function given to redux-form
})(FormComment)

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.comment,
  }
}

const mapDispatchToProps = { addComment, updateComment, setComment }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComment)