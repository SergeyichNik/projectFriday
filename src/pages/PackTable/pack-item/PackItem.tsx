import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {ButtonCP} from "../TablePack";

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
        handlerGetCards
    } = props

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
                                onClick={() => removePackHandler(packID)}
                        >Delete</Button>
                    }
                    {packUserID === authorizedUserId &&
                        <ButtonCP
                            onClick={() => updatePackHandler(packID)}
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
