import React from 'react';

import styles from './ErrorText.module.css'

type ErrorTextPropsType = {
    errorText: string
}

export const ErrorText: React.FC<ErrorTextPropsType> = ({errorText}) => {
    return (
        <div className={styles.error}>{errorText}</div>
    );
};
