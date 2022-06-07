import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {PackCard} from '../../api/packAPI';
import {Pagination} from "../../components/common/Pagination/Pagination";
import {useEffect} from "react";
import {fetchCardsPack, setPageCount, setPage} from "../../bll/reducers/pack-reducer";

interface Data {
    packName: string;
    cardsCount: number;
    createdDate: string;
    createdByName: string;
    updatedDate: string;
    actions?: null;
}

function createData(
    packName: string,
    cardsCount: number,
    createdDate: string,
    createdByName: string,
    updatedDate: string
): Data {
    return {packName, cardsCount, createdDate, createdByName, updatedDate};
}

export const TablePack = () => {

    const dispatch = useAppDispatch()

    const pack = useAppSelector<PackCard[]>(state => state.pack.cardPacks)
    const page = useAppSelector<number>(state => state.pack.page)
    const pageCount = useAppSelector<number>(state => state.pack.pageCount)
    const cardsPacksTotalCount = useAppSelector<number>(state => state.pack.cardPacksTotalCount)


    useEffect(() => {
        dispatch(fetchCardsPack())
    }, [page, pageCount])


    const rows = pack.map(el => createData(el.name, el.cardsCount, el.created, el.user_name, el.updated))


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

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead sx={styleTHead}>
                        <TableRow>
                            <TableCell>Pack name</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Created at</TableCell>
                            <TableCell align="right">Created by</TableCell>
                            <TableCell align="right">Updated</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.createdDate}
                                sx={styleTd}
                                // sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{row.packName}</TableCell>
                                <TableCell align="right">{row.cardsCount}</TableCell>
                                <TableCell align="right">{row.createdDate}</TableCell>
                                <TableCell align="right">{row.createdByName}</TableCell>
                                <TableCell align="right">{row.updatedDate}</TableCell>
                                <TableCell align="right">buttons would be here</TableCell>
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
