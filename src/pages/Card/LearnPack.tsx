import React, {useState} from 'react';
import classes from './Card.module.css'
import '../../styles/common.css';
import {Button, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {useNavigate, useParams} from 'react-router-dom';
import {styleBtn, titleOne} from '../../styles/commonMui';
import {CardType} from '../../api/cards-api';
import {
    fetchCards,
    setCards,
    setPackId,
    updateCardGrade
} from '../../bll/reducers/cards-reducer';
import {setSearchPackName} from '../../bll/reducers/pack-reducer';
import AnswerForm from './AnswerForm';

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    // console.log('test: ', sum, rand, res)
    return cards[res.id + 1];
}

const LearnPack = () => {
    const dispatch = useAppDispatch()
    const {id: packUrlID} = useParams()
    const navigate = useNavigate()

    const loadingStatus = useAppSelector<string>(state => state.appReducer.loadingStatus)
    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const packName = useAppSelector<string>(state => state.pack.packName)

    const [first, setFirst] = useState<boolean>(true)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
    })

    React.useEffect(() => {
        packUrlID && dispatch(setPackId(packUrlID))
    }, [])

    React.useEffect(() => {
        if (first) {
            dispatch(fetchCards())
            setFirst(false)
        }
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, packUrlID, first, cards])

    const onShowAnswerHandler = () => {
        setIsChecked(true)
    }
    const onNextHandler = (grade: number) => {
        setIsChecked(false);

        if (cards.length > 0) {
            dispatch(updateCardGrade(card._id, grade))
            // setCard(getCard(cards)); чтобы не было мерцания, т.к. обновление карточки тоже сетает карточку;
            // или крутилку или другой контент вместо вопроса во время лоадинга (запроса и ответа на сервер)
        }
    }
    const onCancel = () => {
        navigate('../pack-table')
        dispatch(setCards([]))
        dispatch(setSearchPackName(''))
    }

    return (
        <div>
            <Grid container className={'containerGrid'}>
                <Grid className={'itemGrid'}>
                    <div className={classes.cardContent}>
                        <Typography sx={titleOne} variant={'h1'}>
                            Learn "{packName}"</Typography>
                        <p><b>Question:</b> "{card.question}"</p>
                        {isChecked && <p><b>Answer:</b> "{card.answer}"</p>}
                        {
                            !isChecked
                                ? <div className={classes.cardButtons}>
                                    <Button onClick={onCancel}
                                            variant={'contained'}
                                            disabled={loadingStatus === 'loading'}
                                            sx={styleBtn}>
                                        Cancel
                                    </Button>
                                    <Button onClick={onShowAnswerHandler}
                                            variant={'contained'}
                                            disabled={loadingStatus === 'loading'}
                                            sx={styleBtn}>
                                        Show answer
                                    </Button>
                                </div>
                                : <AnswerForm
                                    loadingStatus={loadingStatus}
                                    onCancel={onCancel}
                                    onNextHandler={onNextHandler}
                                />
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
};

export default LearnPack;