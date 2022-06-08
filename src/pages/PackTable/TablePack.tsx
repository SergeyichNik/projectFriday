import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch} from '../../bll/store/store';
import {PackCard} from '../../api/pack-api';
import {TableSortLabel} from '@mui/material';
import {setSortBy} from '../../bll/reducers/pack-reducer';
import {CardType} from "../../api/cards-api";
import {useNavigate} from "react-router-dom";
import {setPackId} from "../../bll/reducers/cards-reducer";

interface Data {
    packName: string;
    cardsCount: number;
    createdDate: string;
    createdByName: string;
    updatedDate: string;
    packID: string;
    actions?: null;
}

function createData(
    packName: string,
    cardsCount: number,
    createdDate: string,
    createdByName: string,
    updatedDate: string,
    packID: string
): Data {
    return {packName, cardsCount, createdDate, createdByName, updatedDate, packID};
}

type TablePackPropsType = {
    pack: PackCard[]
    sortBy: string
    order: 'desc' | 'asc'
}

export const TablePack: React.FC<TablePackPropsType> = ({pack, sortBy, order}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const rows = pack.map(el => createData(
        el.name,
        el.cardsCount,
        new Date(el.created).toLocaleDateString(),
        el.user_name,
        new Date(el.updated).toLocaleString(),
        el._id))

    const styleTHead = {
        background: '#2c2b3f',
        'th': {color: '#fff', fontWeight: 'bold'}
    }

    const styleTd = {
        '&:last-child td, &:last-child th': {border: 0},
        '&:nth-of-type(even)': {background: ' #F8F7FD'}
    }

    const styleAlignCell = {
        '& :not(:first-of-type)': {textAlign: 'right'}
    }

    const styleActiveLabel = {
        color: '#fff !important',
        '& svg': {color: '#fff !important'}
    }

    const onClickSortByHandler = (sortBy: string) => () => {
        dispatch(setSortBy(sortBy))
    }
    const handlerGetCards = (id: string) => {
        navigate('../cards')
        dispatch(setPackId(id))
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead sx={styleTHead}>
                        <TableRow sx={styleAlignCell}>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortBy === 'name'}
                                    direction={sortBy === 'name' ? order : 'asc'}
                                    onClick={onClickSortByHandler('name')}
                                >Pack name</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortBy === 'cardsCount'}
                                    direction={sortBy === 'cardsCount' ? order : 'asc'}
                                    onClick={onClickSortByHandler('cardsCount')}
                                >Count</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortBy === 'created'}
                                    direction={sortBy === 'created' ? order : 'asc'}
                                    onClick={onClickSortByHandler('created')}
                                >Created at</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortBy === 'user_name'}
                                    direction={sortBy === 'user_name' ? order : 'asc'}
                                    onClick={onClickSortByHandler('user_name')}
                                >Created by</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortBy === 'updated'}
                                    direction={sortBy === 'updated' ? order : 'asc'}
                                    onClick={onClickSortByHandler('updated')}
                                >Updated</TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.packID}
                                sx={[styleTd, styleAlignCell]}
                                // sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{row.packName}</TableCell>
                                <TableCell>{row.cardsCount}</TableCell>
                                <TableCell>{row.createdDate}</TableCell>
                                <TableCell>{row.createdByName}</TableCell>
                                <TableCell>{row.updatedDate}</TableCell>
                                <TableCell>
                                    <button onClick={() => handlerGetCards(row.packID)}>Learn</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}
