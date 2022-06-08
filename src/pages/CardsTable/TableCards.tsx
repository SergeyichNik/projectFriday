import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch} from '../../bll/store/store';
import {TableSortLabel} from '@mui/material';
import {setSortBy} from '../../bll/reducers/pack-reducer';
import {CardType} from "../../api/cards-api";

interface Data {
    question: string;
    answer: string;
    updatedDate: string;
    grade: number;
    cardID: string;
    cardsPackID: string;
}

function createData(
    question: string,
    answer: string,
    updatedDate: string,
    grade: number,
    cardID: string,
    cardsPackID: string,
): Data {
    return {question, answer, updatedDate, grade, cardID, cardsPackID};
}

type TablePackPropsType = {
    cards: CardType[]
    // sortBy: string
    // order: 'desc' | 'asc'
}

export const TableCards: React.FC<TablePackPropsType> = ({cards}) => {
    const dispatch = useAppDispatch()

    const rows = cards.map(el => createData(
        el.question,
        el.answer,
        new Date(el.updated).toLocaleString(),
        el.grade,
        el._id,
        el.cardsPack_id))

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

    // const onClickSortByHandler = (sortBy: string) => () => {
    //     dispatch(setSortBy(sortBy))
    // }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead sx={styleTHead}>
                        <TableRow sx={styleAlignCell}>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    // active={sortBy === 'name'}
                                    // direction={sortBy === 'name' ? order : 'asc'}
                                    // onClick={onClickSortByHandler('name')}
                                >Question</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    // active={sortBy === 'cardsCount'}
                                    // direction={sortBy === 'cardsCount' ? order : 'asc'}
                                    // onClick={onClickSortByHandler('cardsCount')}
                                >Answer</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    // active={sortBy === 'created'}
                                    // direction={sortBy === 'created' ? order : 'asc'}
                                    // onClick={onClickSortByHandler('created')}
                                >Last Updated</TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    sx={styleActiveLabel}
                                    // active={sortBy === 'user_name'}
                                    // direction={sortBy === 'user_name' ? order : 'asc'}
                                    // onClick={onClickSortByHandler('user_name')}
                                >Grade</TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.cardID}
                                sx={[styleTd, styleAlignCell]}
                                // sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{row.question}</TableCell>
                                <TableCell>{row.answer}</TableCell>
                                <TableCell>{row.updatedDate}</TableCell>
                                <TableCell>{row.grade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}
