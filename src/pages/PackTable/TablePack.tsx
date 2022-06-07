import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination/TablePagination';
import {useAppDispatch} from '../../bll/store/store';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {PackCard} from '../../api/packAPI';
import {TableSortLabel} from '@mui/material';
import {setSortBy} from '../../bll/reducers/pack-reducer';
import {Pagination} from "../../components/common/Pagination/Pagination";
import {useEffect} from "react";
import {fetchCardsPack, setPageCount, setPage} from "../../bll/reducers/pack-reducer";

interface Data {
    packName: string;
    cardsCount: number;
    createdDate: string;
    createdByName: string;
    updatedDate: string;
    cardID: string;
    actions?: null;
}

function createData(
    packName: string,
    cardsCount: number,
    createdDate: string,
    createdByName: string,
    updatedDate: string,
    cardID: string
): Data {
    return {packName, cardsCount, createdDate, createdByName, updatedDate, cardID};
}

// const rows = [
//     createData('pack one', 0, 37, 'name leo'),
//     createData('pack two', 1, 250, 'name max'),
//     createData('pack three', 3, 163, 'name di'),
//     createData('pack four', 5, 610, 'name ser'),
//     createData('pack five', 4, 160, 'name kol'),
//     createData('pack six', 1, 132, 'name pet'),
//     createData('pack seven', 3, 90, 'name once'),
//     createData('pack eight', 0, 111, 'name is'),
//     createData('pack nine', 1, 1000, 'name user'),
//     createData('pack ten', 2, 111, 'name dan'),
//     createData('pack eleven', 0, 11011, 'name mor'),
//     createData('pack twelve', 3, 20100, 'name bad'),
// ];
type TablePackPropsType = {
    pack: PackCard[]
    sortBy: string
    order: 'desc' | 'asc'
}



export const TablePack: React.FC<TablePackPropsType> = ({pack, sortBy, order}) => {

    const dispatch = useAppDispatch()
    const pack = useAppSelector<PackCard[]>(state => state.pack.cardPacks)
    const page = useAppSelector<number>(state => state.pack.page)
    const pageCount = useAppSelector<number>(state => state.pack.pageCount)
    const cardsPacksTotalCount = useAppSelector<number>(state => state.pack.cardPacksTotalCount)

    const rows = pack.map(el => createData(
        el.name,
        el.cardsCount,
        new Date(el.created).toLocaleDateString(),
        el.user_name,
        new Date(el.updated).toLocaleString(),
        el._id))

    const handleChangePage = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    const handleChangeRowsPerPage = (pageCount: number) => {
        dispatch(setPageCount(pageCount))
    };

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
                                key={row.cardID}
                                sx={[styleTd, styleAlignCell]}
                                // sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{row.packName}</TableCell>
                                <TableCell>{row.cardsCount}</TableCell>
                                <TableCell>{row.createdDate}</TableCell>
                                <TableCell>{row.createdByName}</TableCell>
                                <TableCell>{row.updatedDate}</TableCell>
                                <TableCell>buttons would be here</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination page={page}
                        pageCount={pageCount}
                        cardsPacksTotalCount={cardsPacksTotalCount}
                        handleChangePage={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
