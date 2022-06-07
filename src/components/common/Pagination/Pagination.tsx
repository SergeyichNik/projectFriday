import React from 'react';
import TablePagination from "@mui/material/TablePagination/TablePagination";

type PaginationPropsType = {
    page: number
    pageCount: number
    cardsPacksTotalCount: number
    handleChangePage: (newPage: number) => void
    onRowsPerPageChange: (pageCount: number) => void
}

export const Pagination: React.FC<PaginationPropsType> = (props) => {

    let pagesCount = Math.ceil(props.cardsPacksTotalCount / props.pageCount);
    let pages = [];
    for (let i = 0; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pages.length}
                rowsPerPage={props.pageCount}
                page={props.page}
                onPageChange={(event, newPage) => props.handleChangePage(newPage)}
                onRowsPerPageChange={(event) => props.onRowsPerPageChange(+event.target.value)}
            />
        </>
    );
};