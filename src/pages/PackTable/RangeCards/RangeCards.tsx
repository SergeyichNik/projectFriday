import styles from './RangeCards.module.css'

import React from 'react';
import Slider, {SliderThumb} from '@mui/material/Slider/Slider';
import {styled} from '@mui/material/styles';
import {setMinMaxSort} from '../../../bll/reducers/pack-reducer';
import {useAppDispatch} from '../../../bll/store/store';


const minDistance = 1;

type RangeCardsPropsType = {
    minCardsCount: number
    maxCardsCount: number
}

export const RangeCards: React.FC<RangeCardsPropsType> = React.memo(({minCardsCount, maxCardsCount}) => {
    const dispatch = useAppDispatch()

    const [value, setValue] = React.useState<number[]>([0, maxCardsCount]);

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

    const range = React.useRef(null)

    React.useEffect(() => {
        let element: any
        if (range.current !== null) {
            element = range.current;
        }
        //
        // const openListeners = () => {
        //     element.addEventListener('mouseup', onChangeMinMax);
        //     element.addEventListener('mouseleave', onChangeMinMax);
        // }

        const onChangeMinMax = () => {
            dispatch(setMinMaxSort(value))
        };


        // element.addEventListener('mousedown', openListeners)

        element.addEventListener('click', onChangeMinMax);
        // element.addEventListener('mouseout', onChangeMinMax);

        return () => {
            // element.removeEventListener('mousedown', openListeners);
            // element.removeEventListener('mouseup', onChangeMinMax);
            // element.removeEventListener('mouseleave', onChangeMinMax);
            element.removeEventListener('click', onChangeMinMax);
            // element.removeEventListener('mouseout', onChangeMinMax);
        };
    }, [value])

    React.useEffect(() => {
        setValue([minCardsCount, maxCardsCount])
    }, [maxCardsCount])

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


const AirbnbSlider = styled(Slider)(() => ({
    color: '#33b198',
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
        background: '#33b198',
        padding: '0.25rem 0.55rem',
        top: '-12px',
        lineHeight: '1.2'
    },
    '& .MuiSlider-track': {
        height: 3,
    },
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