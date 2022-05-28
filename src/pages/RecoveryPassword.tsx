import React from 'react';

const RecoveryPassword = () => {

    const getInstruction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('called')
    }

    return (
        <>
            <h1>It-incubator</h1>
            <div>Forgot your password?</div>

            <form onSubmit={getInstruction}>
                <div>
                    <label htmlFor={'email'}>
                        <input
                            type={'text'}
                            name={'email'}
                            id={'email'}
                            placeholder={'Email'}/>
                    </label>
                </div>

                <div>
                    <button type={'submit'}>
                        Send Instructions
                    </button>
                </div>
            </form>

            <div>Did you remember your password?</div>
            <div>Try logging in</div>
        </>
    );
};

export default RecoveryPassword;