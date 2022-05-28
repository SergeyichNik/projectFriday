import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

type InitialValuesType = {
    email: string
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
})

const RecoveryPassword = () => {

    const initialValues: InitialValuesType = {
        email: ''
    }

    const onSubmit = (values: InitialValuesType) => {
        console.log('Values: ', values)
    }

    console.log(initialValues)

    return (
        <>
            <h1>It-incubator</h1>
            <div>Forgot your password?</div>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SignupSchema}>
                <Form>
                    <div>
                        <label htmlFor={'email'}>
                            <Field
                                type={'text'}
                                name={'email'}
                                id={'email'}
                                placeholder={'Email'}/>
                            <ErrorMessage
                                name={'email'}
                                render={msg => <div style={{color: 'red', fontWeight: 'bold'}}>{msg}</div>}/>
                        </label>
                    </div>

                    <div>
                        <button type={'submit'}>
                            Send Instructions
                        </button>
                    </div>
                </Form>
            </Formik>

            <div>Did you remember your password?</div>
            <div>Try logging in</div>
        </>
    );
};

export default RecoveryPassword;