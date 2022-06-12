import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useAppDispatch, useAppSelector} from "../../bll/store/store";
import {AddModal, DeleteModal, EditModal} from "../modal-components";
import {controlModalWindowAC, selectModal} from "../../bll";
import classes from "./ModalWindow.module.css";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "5px",
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export const ModalWindow = () => {
    const isOpen = useAppSelector(selectModal).isOpen
    const component = useAppSelector(selectModal).component
    const dispatch = useAppDispatch()

    const closeModalClick = () => {
        dispatch(controlModalWindowAC(false, null))
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={closeModalClick}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <Box className={classes.modalWrapper} sx={style}>
                        {component === "ADD" && <AddModal closeModalClick={closeModalClick}/>}
                        {component === "DELETE" && <DeleteModal closeModalClick={closeModalClick}/>}
                        {component === "EDIT" && <EditModal closeModalClick={closeModalClick}/>}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};
