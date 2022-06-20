import React from 'react';
import {Grid, Typography} from '@mui/material';
import {Answer} from './Answer/Answer';
import {RecoveryPasswordForm} from './RecoveryPasswordForm/RecoveryPasswordForm';
import {useAppSelector} from '../../bll/store/store';

import '../../styles/common.css';


const RecoveryPassword = () => {

    const responseInfo = useAppSelector<string>(state => state.recoverPassword.info)

    return (
        <>
            <Grid container className={'containerGrid'}>
                <Grid className={'itemGrid'}>

                    <Typography sx={titleOne} variant={'h1'}>
                        It-incubator</Typography>

                    {responseInfo
                        ? <Answer/>
                        : <RecoveryPasswordForm/>
                    }

                </Grid>
            </Grid>
        </>
    );
};

export default RecoveryPassword;

const titleOne: React.CSSProperties = {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 26,
    lineHeight: '39px',
    color: '#2D2E46',
    marginBottom: '30px'
}