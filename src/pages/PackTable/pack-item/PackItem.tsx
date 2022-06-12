import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {ButtonCP} from "../TablePack";
import {ModalComponentType} from "../../../bll";
import {ModalModelType} from "../../../bll/reducers/modal-reducer";

const styleTd = {
    '&:last-child td, &:last-child th': {border: 0},
    '&:nth-of-type(even)': {background: ' #F8F7FD'}
}

const styleAlignCell = {
    '& :not(:first-of-type)': {textAlign: 'left'}
}

interface PropsType {
    packName: string;
    cardsCount: number;
    createdDate: string;
    createdByName: string;
    updatedDate: string;
    packID: string;
    packUserID: string;
    actions?: null;
    authorizedUserId: string;
    removePackHandler: (packID: string) => void;
    updatePackHandler: (packID: string) => void;
    handlerGetCards: (packID: string) => void;
    openModalWindow: (model: ModalModelType) => void
}


export const PackItem: FC<PropsType> = (props) => {

    const {
        packName,
        packUserID,
        createdByName,
        packID,
        createdDate,
        cardsCount,
        updatedDate,
        authorizedUserId,
        removePackHandler,
        updatePackHandler,
        handlerGetCards,
        openModalWindow
    } = props
    const removableModel: ModalModelType = {
        isOpen: true,
        currentPackID: packID,
        component: "DELETE",
        currentPackName: packName
    }
    const editableModel: ModalModelType = {
        isOpen: true,
        currentPackID: packID,
        component: "EDIT",
        currentPackName: packName
    }
    return (
        <TableRow
            key={packID}
            sx={[styleTd, styleAlignCell]}
            // sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell>{packName}</TableCell>
            <TableCell>{cardsCount}</TableCell>
            <TableCell>{createdDate}</TableCell>
            <TableCell>{createdByName}</TableCell>
            <TableCell>{updatedDate}</TableCell>
            <TableCell>
                <div style={{display: 'flex', gap: '14px', justifyContent: 'end'}}>
                    {packUserID === authorizedUserId &&
                        <Button variant={'contained'}
                                color={'error'}
                                sx={{textTransform: 'none'}}
                                onClick={() => openModalWindow(removableModel)}
                        >Delete</Button>
                    }
                    {packUserID === authorizedUserId &&
                        <ButtonCP
                            onClick={() => openModalWindow(editableModel)}
                        >Edit</ButtonCP>
                    }
                    <ButtonCP
                        disabled={!cardsCount && packUserID !== authorizedUserId}
                        onClick={() => handlerGetCards(packID)}
                    >Learn</ButtonCP>
                </div>
            </TableCell>
        </TableRow>
    );
};
