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
import {removePack, setSortBy, updatePack} from '../../bll/reducers/pack-reducer';
import {useNavigate} from 'react-router-dom';
import {setPackId} from '../../bll/reducers/cards-reducer';
import {PackItem} from "./pack-item/PackItem";
import {PackItemSkeleton} from "./pack-item-skeleton/PackItemSkeleton";


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
    const status = useAppSelector(state => state.appReducer.loadingStatus)

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
    const handlerGetCards = (id: string) => {
        navigate(`../cards/${id}`)
        dispatch(setPackId(id))
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
                            <TableCell >
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    active={sortBy === 'name'}
                                    direction={sortBy === 'name' ? order : 'asc'}
                                    onClick={onClickSortByHandler('name')}
                                >Pack name</TableSortLabel>
                            </TableCell>
                            <TableCell >
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
                        {rows.map((row) => {
                            if (status === "loading") {
                                return <PackItemSkeleton/>
                            }
                            return <PackItem authorizedUserId={authorizedUserId}
                                             removePackHandler={removePackHandler}
                                             updatePackHandler={updatePackHandler}
                                             handlerGetCards={handlerGetCards} {...row}/>
                        }

                        )}
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

const styleAlignCell = {
    '& :not(:first-of-type)': {textAlign: 'left'}
}

const styleActiveLabel = {
    color: '#fff !important',
    '& svg': {color: '#fff !important'}
}