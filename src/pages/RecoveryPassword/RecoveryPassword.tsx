import React from 'react';
import {Grid, Typography} from '@mui/material';
import {useAppSelector} from './hooks/typedHooks';
import {Answer} from './Answer/Answer';
import {RecoveryPasswordForm} from './RecoveryPasswordForm/RecoveryPasswordForm';


const RecoveryPassword = () => {

    const responseInfo = useAppSelector<string>(state => state.recoverPassword.info)

    const forTypoH: React.CSSProperties = {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 26,
        lineHeight: '39px',
        color: '#2D2E46'
    }

    const forGr: React.CSSProperties = {
        background: '#F9F9FE',
        marginTop: '84px',
        width: '413px',
        minHeight: '468px',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '8px',
        padding: '24px'
    }

    return (
        <>
            <Grid container justifyContent={'center'} alignItems={'center'} height={'100%'}>
                <Grid sx={forGr}>

                    <Typography sx={forTypoH} variant={'h1'} marginBottom={'30px'}>
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