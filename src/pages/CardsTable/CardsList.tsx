import React from 'react';
import s from './CardsList.module.css';
import SearchField from '../../components/common/SearchField/SearchField';
import {Pagination} from '../../components/common/Pagination/Pagination';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {
    fetchCards,
    OrderType,
    searchByAnswer,
    searchByQuestion,
    setCardPage,
    setCardPageCount,
    setCards,
    setPackId
} from '../../bll/reducers/cards-reducer';
import {TableCards} from './TableCards';
import {CardType} from '../../api/cards-api';
import {Link, useParams} from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import styles from '../Profile/Profile.module.css';
import {styleBtn} from '../../styles/commonMui';
import {Button} from '@mui/material';
import {controlModalWindowAC, ModalComponentType, setCurrentPackPropsAC} from "../../bll";
import {EMPTY_STRING} from "../../constants";


const CardsList = () => {
    const dispatch = useAppDispatch()
    const {id: packUrlId} = useParams()

    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const cardsCurrentPage = useAppSelector<number>(state => state.cards.page)
    const cardsPageCount = useAppSelector<number>(state => state.cards.pageCount)
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const cardsQuestion = useAppSelector<string>(state => state.cards.cardQuestion)
    const cardsAnswer = useAppSelector<string>(state => state.cards.cardAnswer)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const order = useAppSelector<OrderType>(state => state.cards.order)
    const cardsPackUserID = useAppSelector(state => state.cards.packUserId)

    //todo может потом перенести
    const authorizedUserId = useAppSelector(state => state.login.data._id)

    const searchByQuestionCallback = (question: string) => {
        dispatch(searchByQuestion(question))
    }

    const searchByAnswerCallback = (answer: string) => {
        dispatch(searchByAnswer(answer))
    }

    const backToPacksHandler = () => {
        dispatch(setCards([]))
        dispatch(searchByQuestion(''))
        dispatch(searchByAnswer(''))
    }

    const setCardsPageCallback = (page: number) => {
        dispatch(setCardPage(page + 1))
    }

    const setCardsPageCountCallback = (page: number) => {
        dispatch(setCardPageCount(page))
    }

    const openModalWindowHandle = (isOpen: boolean, component: ModalComponentType, packID: string, packName: string) => {
        dispatch(controlModalWindowAC(isOpen, component))
        dispatch(setCurrentPackPropsAC(packName, packID))
    }

    React.useEffect(() => {
        packUrlId && dispatch(setPackId(packUrlId))
    }, [])

    React.useEffect(() => {
         dispatch(fetchCards())
    }, [cardsAnswer, cardsQuestion, cardsCurrentPage, cardsPageCount, packUrlId, sortCards, order])

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

                    {cardsPackUserID === authorizedUserId &&
                        <div>
                            <Button
                                sx={[styleBtn, {
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    margin: '0 0 14px 0',
                                    padding: '8px 16px 4px',
                                    color: '#2c2b3f',
                                    height: 'auto'
                                }]}
                                variant={'contained'}
                                onClick={() => openModalWindowHandle(true, "ADD-NEW-CARD" , packUrlId as string, EMPTY_STRING)}
                            >
                                Add new Card
                            </Button>
                        </div>
                    }

                    <TableCards cards={cards}
                                order={order}
                                sortCards={sortCards}
                                packUserId={cardsPackUserID}
                                authorizedUserId={authorizedUserId}/>
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