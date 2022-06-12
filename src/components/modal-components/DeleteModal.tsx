import React, {FC} from 'react';
import {Button} from "@mui/material";
import {ButtonCP} from "../../pages/PackTable/TablePack";
import classes from "./DeleteModal.module.css";

type PropsType = {
    currentPackName?: string | null
    closeModalClick: () => void
    removePackClick: () => void
}

export const DeleteModal: FC<PropsType> = ({closeModalClick, removePackClick, currentPackName}) => {

    return (
        <div className={classes.wrapper}>
            <h3>Delete Pack</h3>

            <p className={classes.text}>
                Do you really want to remove
                <span className={classes.packName}>{currentPackName}</span>?
                <br/> All cards will be excluded from this course.</p>

            <div className={classes.btnGroup}>
                    <ButtonCP style={{width: "130px", backgroundColor: '#7f8383'}} onClick={closeModalClick}>Cancel</ButtonCP>

                    <Button variant={'contained'}
                            style={{width: "130px"}}
                            color={'error'}
                            sx={{textTransform: 'none'}}
                            onClick={removePackClick}
                    >Delete</Button>
            </div>
        </div>
    );
};
