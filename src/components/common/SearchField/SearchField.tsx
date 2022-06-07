import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../../bll/store/store";
import s from './SearchField.module.css';
import {fetchCardsPack, setSearchPackName} from "../../../bll/reducers/pack-reducer";

const SearchField = () => {
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState<string>("");

    const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 1000);

    // Effect for API call
    useEffect(
        () => {
                dispatch(setSearchPackName(debouncedSearchTerm))
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    return (
        <div>
                <input
                    className={s.searchInput}
                    type="search"
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                />
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
