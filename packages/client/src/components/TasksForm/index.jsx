import { Formik, Form } from 'formik';
import React from 'react';
import Input from '../Input';
import { createTaskAction } from '../../actions';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { INPUT_SCHEMA } from '../../utils/validationSchema';

function TasksForm (props) {
  const {
    theme,
    createTask,
    formClasses: { inputData }
  } = props;

  const addTaskHandler = (values, formikBag) => {
    createTask(values);

    formikBag.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ description: '', isDone: false }}
        validationSchema={INPUT_SCHEMA}
        onSubmit={addTaskHandler}
      >
        {formikProps => {
          return (
            <Form className={inputData}>
              <Input name='description' placeholder='Enter Todo...' />
              <Button
                variant={theme ? 'outline-primary' : 'outline-light'}
                as='input'
                type='submit'
                value='Add Task'
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

const mapStateToProps = state => state.theme;
const mapDispatchToProps = dispatch => ({
  createTask: task => {
    dispatch(createTaskAction(task));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksForm);
