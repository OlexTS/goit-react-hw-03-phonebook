import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  Input,
  FormCont,
  Label,
  SubmitButton,
  Text,
  ErrorText,
} from './ContactForm.styled';

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const schema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(5)
    .max(24)
    .matches(
      "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
      'Please enter correct name'
    ),
  number: Yup.string().phone('UA').required(),
});

const initialValues = {
  name: '',
  number: '',
};
class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (values, { resetForm }) => {
    this.props.onSubmit(values);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        <FormCont autoComplete="off">
          <Label>
            <Text>Name</Text>
            <Input type="text" name="name" placeholder="Jack Daniel" />
            <FormError name="name" />
          </Label>
          <Label>
            <Text>Number</Text>
            <Input type="tel" name="number" placeholder="8-000-000-00-00" />
            <FormError name="number" />
          </Label>
          <SubmitButton type="submit">Add contact</SubmitButton>
        </FormCont>
      </Formik>
    );
  }
}

export default ContactForm;
