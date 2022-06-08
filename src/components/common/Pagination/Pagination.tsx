import React, {ChangeEvent} from 'react';
import TablePagination from "@mui/material/TablePagination/TablePagination";

type PaginationPropsType = {
    page: number
    pageCount: number
    cardsPacksTotalCount: number
    setPageCallback: (page: number) => void
    setPageCountCallback: (page: number) => void
}

export const Pagination: React.FC<PaginationPropsType> = (props) => {

    const handleChangePage = (newPage: number) => {
        props.setPageCallback(newPage);
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.setPageCountCallback(+event.target.value);
    };

    const currentPage = props.page - 1;
    return (
        <>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.cardsPacksTotalCount}
                rowsPerPage={props.pageCount}
                page={currentPage}
                onPageChange={(e, newPage) => handleChangePage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};