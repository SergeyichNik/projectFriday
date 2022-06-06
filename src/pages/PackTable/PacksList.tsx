import React from 'react';
import {TablePack} from './TablePack';
import SearchField from "../../components/common/SearchField/SearchField";

export const PacksList = () => {
    return (
        <div style={{margin: '30px auto', maxWidth: '850px' }}>
            <SearchField/>
            <TablePack />
        </div>
    );
};
