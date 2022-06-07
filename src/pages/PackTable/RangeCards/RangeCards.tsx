import styles from './RangeCards.module.css'

import React from 'react';
import Slider, {SliderThumb} from '@mui/material/Slider/Slider';
import {styled} from '@mui/material/styles';
import {setMinMaxSort} from '../../../bll/reducers/pack-reducer';
import {useAppDispatch} from '../../../bll/store/store';


const minDistance = 1;

type RangeCardsPropsType = {
    minSort: number
    maxSort: number
    maxCardsCount: number
}

export const RangeCards: React.FC<RangeCardsPropsType> = React.memo(({minSort, maxSort, maxCardsCount}) => {
    const dispatch = useAppDispatch()
    const range = React.useRef(null)

    const [value, setValue] = React.useState<number[]>([0, 1]);

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    React.useEffect(() => {
        const handleClick = () => {
            dispatch(setMinMaxSort(value))
        };

        let element: any
        if (range.current !== null) {
            element = range.current;
        }

        element.addEventListener('click', handleClick);
        element.addEventListener('mouseleave', handleClick);

        return () => {
            element.removeEventListener('click', handleClick);
            element.removeEventListener('mouseleave', handleClick);
        };
    }, [value])

    React.useEffect(() => {
        setValue([minSort, maxSort])
    }, [])

    console.log(value)

    return (
        <div className={styles.wrapper}>
            <div style={{marginBottom: '38px'}}>Number of cards</div>
            <AirbnbSlider
                components={{Thumb: AirbnbThumbComponent}}
                getAriaLabel={(index) => (index === 0 ? 'Minimum cards' : 'Maximum cards')}
                valueLabelDisplay="on"
                value={value}
                onChange={handleChange}
                max={maxCardsCount}
                ref={range}
            />
        </div>
    );
});

const AirbnbSlider = styled(Slider)(({theme}) => ({
    color: '#43C6AC',
    height: 3,
    padding: '13px 0',
    width: 'calc(100% - 10px)',
    margin: '0 5px',
    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        backgroundColor: '#fff',
        border: '3px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
    },
    '& .MuiSlider-valueLabel': {
        background: '#43C6AC',
        padding: '0.25rem 0.55rem',
        top: '-12px',
        lineHeight: '1.2'
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    // '& .MuiSlider-rail': {
    //     color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    //     opacity: theme.palette.mode === 'dark' ? undefined : 1,
    //     height: 3,
    // },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {
}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
    const {children, ...other} = props;
    return (
        <SliderThumb {...other}>
            {children}
        </SliderThumb>
    );
}