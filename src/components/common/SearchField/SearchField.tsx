import React, {useEffect, useState} from 'react';
import {alpha, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch} from "../../../bll/store/store";
import {searchPacksByName} from "../../../bll/reducers/pack-reducer";

const SearchField = () => {
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Debounce search term so that it only gives us latest value ...
    // ... if searchTerm has not been updated within last 500ms.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    // We pass generic type, this case string
    const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 3000);
    // Effect for API call
    useEffect(
        () => {
                dispatch(searchPacksByName(debouncedSearchTerm))
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));
    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     debugger
    //     // e.persist();
    //     setSearch(e.currentTarget.value)
    // }
    //
    // const debounce = <T extends (...args: any[]) => any>(
    //     callback: T,
    //     waitFor: number
    // ) => {
    //     let timeout: ReturnType<typeof setTimeout>;
    //     return (...args: Parameters<T>): ReturnType<T> => {
    //         let result: any;
    //         clearTimeout(timeout);
    //         timeout = setTimeout(() => {
    //             result = callback(...args);
    //         }, waitFor);
    //         return result;
    //     };
    // };
    // const debounceSearch = debounce(onChangeHandler, 500)

    return (
        <div>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    // inputProps={{'aria-label': 'search'}}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                />
            </Search>
        </div>
    );
};

export default SearchField;

function useDebounce<T>(value: T, delay: number): T {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}
