import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import Input from '../Input';
import { createBetAction } from '../../actions';
import { INPUT_SCHEMA } from '../../utils/validationSchema';

function BetForm (props) {
  const { theme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const createBet = bindActionCreators(createBetAction, dispatch);
  const {
    formClasses: { inputData, selectItem }
  } = props;

  const addBetHandler = (values, formikBag) => {
    createBet(values);

    formikBag.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ team: '', betValue: 500, isWinned: false }}
        validationSchema={INPUT_SCHEMA}
        onSubmit={addBetHandler}
      >
        {formikProps => {
          return (
            <Form className={inputData}>
              <Input name='team' placeholder='Enter a team...' />
              <Field className={selectItem} as='select' name='betValue'>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
                <option value={5000}>5000</option>
              </Field>
              <Button
                variant={theme ? 'outline-primary' : 'outline-light'}
                as='input'
                type='submit'
                value='Add Bet'
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default BetForm;
