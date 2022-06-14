import React, {ChangeEvent, FC} from 'react';
import classes from "./EditModal.module.css";
import {TextField} from "@mui/material";
import {ButtonCP} from "../../pages/PackTable/TablePack";
import LoadingButton from "@mui/lab/LoadingButton";

type PropsType = {
    closeModalClick: () => void
    value: string
    onChangeValue: (e: ChangeEvent<HTMLTextAreaElement>) => void
    updatePackName: () => void
    isLoading: boolean
}


export const EditModal: FC<PropsType> =
    ({
         closeModalClick,
         value,
         onChangeValue,
         updatePackName,
         isLoading
     }) => {
        return (
            <div className={classes.wrapper}>
                <h3>Edit pack name</h3>
                <TextField id="standard-basic"
                           value={value}
                           onChange={onChangeValue}
                           label="Name pack" variant="standard"/>
                <div className={classes.btnGroup}>
                    <ButtonCP style={{width: "130px", backgroundColor: '#7f8383'}}
                              onClick={closeModalClick}>Cancel</ButtonCP>
                    <LoadingButton
                        loading={isLoading}
                        loadingPosition="center"
                        variant="contained"
                        style={{width: "130px", backgroundColor: '#33b198'}}
                        sx={{textTransform: 'none'}}
                        onClick={updatePackName}
                    >
                        Edit
                    </LoadingButton>
                </div>
            </div>
        );
    };
