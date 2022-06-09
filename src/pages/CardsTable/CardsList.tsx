import React from 'react';
import s from './CardsList.module.css';
import SearchField from '../../components/common/SearchField/SearchField';
import {Pagination} from '../../components/common/Pagination/Pagination';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {
    fetchCards,
    OrderType,
    searchByAnswer,
    searchByQuestion, setCards,
    setCardPage,
    setCardPageCount
} from '../../bll/reducers/cards-reducer';
import {TableCards} from './TableCards';
import {CardType} from '../../api/cards-api';
import {Link} from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import styles from '../Profile/Profile.module.css';



const CardsList = () => {
    const dispatch = useAppDispatch()

    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const cardsCurrentPage = useAppSelector<number>(state => state.cards.page)
    const cardsPageCount = useAppSelector<number>(state => state.cards.pageCount)
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const cardsQuestion = useAppSelector<string>(state => state.cards.cardQuestion)
    const cardsAnswer = useAppSelector<string>(state => state.cards.cardAnswer)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const order = useAppSelector<OrderType>(state => state.cards.order)
    const cardsPackId = useAppSelector(state => state.cards.cardsPackId)

    React.useEffect(() => {
        dispatch(fetchCards())
    }, [cardsAnswer, cardsQuestion, cardsCurrentPage, cardsPageCount, cardsPackId, sortCards, order])

    const searchByQuestionCallback = (question: string) => {
        dispatch(searchByQuestion(question))
    }
    const searchByAnswerCallback = (answer: string) => {
        dispatch(searchByAnswer(answer))
    }
    const backToPacksHandler = () => {
        dispatch(setCards([]))
    }
    const setCardsPageCallback = (page: number) => {
        dispatch(setCardPage(page + 1))
    }
    const setCardsPageCountCallback = (page: number) => {
        dispatch(setCardPageCount(page))
    }

    return (
        <div style={{margin: '30px auto'}}>
            <div className={styles.profileContainer}>

                <div className={s.contentBlock}>
                    <div className={s.backLinkWrapper}>
                        <Link className={s.backLink} to={'../pack-table'} onClick={backToPacksHandler}>
                            <ArrowRightAltIcon sx={arrow}/>
                            Back</Link>
                    </div>
                    <div className={s.cardsSearchBar}>
                        <SearchField
                            searchCallback={searchByQuestionCallback}
                            placeholder={'Question'}
                            initState={cardsQuestion}
                        />
                        <SearchField
                            searchCallback={searchByAnswerCallback}
                            placeholder={'Answer'}
                            initState={cardsAnswer}
                        />
                    </div>
                    <TableCards cards={cards} order={order} sortCards={sortCards}/>
                    <Pagination page={cardsCurrentPage}
                                pageCount={cardsPageCount}
                                cardsPacksTotalCount={cardsTotalCount}
                                setPageCallback={setCardsPageCallback}
                                setPageCountCallback={setCardsPageCountCallback}
                    />
                </div>
            </div>
        </div>
    );
};


export default CardsList;

const arrow = {
    height: '1.4em',
    width: '1.4em',
    transform: 'scale(-1)',
    marginRight: '6px'
}