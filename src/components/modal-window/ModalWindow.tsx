import React, {ChangeEvent} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useAppDispatch, useAppSelector} from "../../bll/store/store";
import {AddModal, DeleteModal, EditModal} from "../modal-components";
import {
    addCardPackTC,
    controlModalWindowAC,
    removePackTC, selectAppStatus,
    selectModal,
    selectPack,
    setCurrentPackPropsAC,
    updatePackNameTC
} from "../../bll";
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
    const currentPackID = useAppSelector(selectPack).currentPackID
    const currentPackName = useAppSelector(selectPack).currentPackName
    const status = useAppSelector(selectAppStatus)


    const dispatch = useAppDispatch()

    const closeModalClick = () => {
        dispatch(controlModalWindowAC())
        dispatch(setCurrentPackPropsAC())

    }

    const removePackClick = () => {
        dispatch(removePackTC(currentPackID as string))
    }

    const updateCurrentPackName = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setCurrentPackPropsAC(e.currentTarget.value, currentPackID))
    }

    const addNewPack = () => {
        dispatch(addCardPackTC(currentPackName))
    }

    const updatePackName = () => {
        dispatch(updatePackNameTC(currentPackID as string, currentPackName))
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={closeModalClick}
            >
                <Fade in={isOpen}>
                    <Box className={classes.modalWrapper} sx={style}>
                        {component === "ADD" && <AddModal newPackNameValue={currentPackName}
                                                          isLoading={status === "loading"}
                                                          addNewPack={addNewPack}
                                                          updateNewPackName={updateCurrentPackName}
                                                          closeModalClick={closeModalClick}/>}
                        {component === "DELETE" && <DeleteModal removePackClick={removePackClick}
                                                                isLoading={status === "loading"}
                                                                currentPackName={currentPackName}
                                                                closeModalClick={closeModalClick}/>}
                        {component === "EDIT" && <EditModal onChangeValue={updateCurrentPackName}
                                                            isLoading={status === "loading"}
                                                            updatePackName={updatePackName}
                                                            value={currentPackName}
                                                            closeModalClick={closeModalClick}/>}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};
