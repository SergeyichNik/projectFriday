import React, {FC} from 'react';
import classes from "./EditModal.module.css";
import {TextField} from "@mui/material";
import {ButtonCP} from "../../pages/PackTable/TablePack";

type PropsType = {
    closeModalClick: () => void
}


export const EditModal: FC<PropsType> = ({closeModalClick}) => {
    return (
        <div className={classes.wrapper}>
            <h3>Edit pack name</h3>
            <TextField id="standard-basic" label="Name pack" variant="standard"/>
            <div className={classes.btnGroup}>
                <ButtonCP style={{width: "130px", backgroundColor: '#7f8383'}}
                          onClick={closeModalClick}>Cancel</ButtonCP>
                <ButtonCP style={{width: "130px"}} onClick={closeModalClick}>Edit</ButtonCP>
            </div>
        </div>
    );
};
