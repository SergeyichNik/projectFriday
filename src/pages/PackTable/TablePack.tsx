import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {PackCard} from '../../api/pack-api';
import {Button, ButtonProps, styled, TableSortLabel} from '@mui/material';
import {removePack, setSearchPackName, setSortBy, updatePack} from '../../bll/reducers/pack-reducer';
import {useNavigate} from 'react-router-dom';
import {setPackId} from '../../bll/reducers/cards-reducer';


type TablePackPropsType = {
    pack: PackCard[]
    sortBy: string
    order: 'desc' | 'asc'
}

export const TablePack: React.FC<TablePackPropsType> = ({pack, sortBy, order}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    //todo может потом перенести
    const authorizedUserId = useAppSelector(state => state.login.data._id)

    const rows = pack.map(el => createData(
        el.name,
        el.cardsCount,
        new Date(el.created).toLocaleDateString(),
        el.user_name,
        new Date(el.updated).toLocaleString(),
        el._id,
        el.user_id))

    const onClickSortByHandler = (sortBy: string) => () => {
        dispatch(setSortBy(sortBy))
    }
    const handlerGetCards = (id: string, name: string) => {
        navigate(`../card/${id}`)
        // dispatch(setPackId(id))
        dispatch(setSearchPackName(name))
    }

    const removePackHandler = (packID: string) => {
        dispatch(removePack(packID))
    }

    const updatePackHandler = (id: string) => {
        dispatch(updatePack(id))
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
                            >
                                <TableCell>{row.packName}</TableCell>
                                <TableCell>{row.cardsCount}</TableCell>
                                <TableCell>{row.createdDate}</TableCell>
                                <TableCell>{row.createdByName}</TableCell>
                                <TableCell>{row.updatedDate}</TableCell>
                                <TableCell>
                                    <div style={{display: 'flex', gap: '14px', justifyContent: 'end'}}>
                                        {row.packUserID === authorizedUserId &&
                                            <Button variant={'contained'}
                                                    color={'error'}
                                                    sx={{textTransform: 'none'}}
                                                    onClick={() => removePackHandler(row.packID)}
                                            >Delete</Button>
                                        }
                                        {row.packUserID === authorizedUserId &&
                                            <ButtonCP
                                                onClick={() => updatePackHandler(row.packID)}
                                            >Edit</ButtonCP>
                                        }
                                        <ButtonCP
                                            disabled={!row.cardsCount && row.packUserID !== authorizedUserId}
                                            onClick={() => handlerGetCards(row.packID, row.packName)}
                                        >Learn</ButtonCP>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


interface Data {
    packName: string;
    cardsCount: number;
    createdDate: string;
    createdByName: string;
    updatedDate: string;
    packID: string;
    packUserID: string;
    actions?: null;
}

function createData(
    packName: string,
    cardsCount: number,
    createdDate: string,
    createdByName: string,
    updatedDate: string,
    packID: string,
    packUserID: string
): Data {
    return {packName, cardsCount, createdDate, createdByName, updatedDate, packID, packUserID};
}

export const ButtonCP = styled(Button)<ButtonProps>(() => ({
    backgroundColor: '#33b198',
    color: '#fff',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    transition: '.3s',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#33b198',
        opacity: '0.85',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    },
    '&:disabled': {
        background: '#d9d9d9',
        color: '#858585',
        boxShadow: 'none'
    }
}))

const styleTHead = {
    background: '#2c2b3f',
    // background: 'rgb(109,106,153, 0.8)',
    'th': {color: '#fff', fontWeight: 'bold'},
    'th: nth-of-type(6)': {width: '268px'}
}

const styleTd = {
    '&:last-child td, &:last-child th': {border: 0},
    '&:nth-of-type(even)': {background: ' #F8F7FD'}
}

const styleAlignCell = {
    '& :not(:first-of-type)': {textAlign: 'left'}
}

const styleActiveLabel = {
    color: '#fff !important',
    '& svg': {color: '#fff !important'}
}