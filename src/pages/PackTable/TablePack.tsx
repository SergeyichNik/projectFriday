import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination/TablePagination';
import {useAppSelector} from '../../bll/store/store';
import {PackCards} from '../../api/packApi';

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

export const TablePack = () => {
    const pack = useAppSelector<PackCards>(state => state.pack.cardPacks)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const rows = pack.map(el => createData(el.name, el.cardsCount, el.created, el.user_name, el.updated))

    let a
    let v
    let n
    let z
    if (pack[0]?.created) {
        let b = pack[0].created
        let c = b.toString()
    a = new Date(c)

      v = a.toLocaleTimeString()
      n = a.toLocaleDateString()
        z = a.toLocaleString()
    }

//     const date = pack[0]?.created
//
//     const addZero = (date: number | null) => {
//         if (date === null) return
//         return date < 10 ? `0${date}` : date
//     }
//     debugger
// //@ts-ignore
//     const stringTime = date &&`${addZero(date!.getHours())} : ${addZero(date!.getMinutes())} : ${addZero(date!.getSeconds())}`

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const styleTHead: React.CSSProperties = {
        background: '#2c2b3f',
    }

    const styleTd = {
        '&:last-child td, &:last-child th': {border: 0},
        '&:nth-of-type(even)': {background: ' #F8F7FD'}
    }

    return (
        <>
            <div>time toLocaleTimeString: {v}</div>
            <div>time toLocaleDateString: {n}</div>
            <div>time toLocaleString: {z}</div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead sx={styleTHead}>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold', color: '#fff'}}>Pack name</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#fff'}} align="right">Count</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#fff'}} align="right">Created at</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#fff'}} align="right">Created by</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#fff'}} align="right">Updated</TableCell>
                            <TableCell sx={{fontWeight: 'bold', color: '#fff'}} align="right">Actions</TableCell>
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
                        {/*{emptyRows > 0 && (*/}
                        {/*    <TableRow*/}
                        {/*        style={{*/}
                        {/*            height: (dense ? 33 : 53) * emptyRows,*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <TableCell colSpan={6}/>*/}
                        {/*    </TableRow>*/}
                        {/*)}*/}
                    </TableBody>
                </Table>
            </TableContainer>


            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
