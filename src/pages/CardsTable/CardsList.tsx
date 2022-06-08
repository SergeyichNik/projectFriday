import React from 'react';
import styles from "../Profile/Profile.module.css";
import SearchField from "../../components/common/SearchField/SearchField";
import {TablePack} from "../PackTable/TablePack";
import {Pagination} from "../../components/common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../bll/store/store";
import {fetchCards, searchByAnswer, searchByQuestion, setPage, setPageCount} from "../../bll/reducers/cards-reducer";
import {TableCards} from "./TableCards";
import {CardType} from "../../api/cards-api";

const CardsList = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const cardsPage = useAppSelector<number>(state => state.cards.page)
    const cardsPageCount = useAppSelector<number>(state => state.cards.pageCount)
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const sortBy = useAppSelector(state => state.cards.sortCards)
    const setCardsPageCallback = (page: number) => dispatch(setPage(page))
    const setCardsPageCountCallback = (page: number) => dispatch(setPageCount(page))
    const cardsPackId = useAppSelector(state => state.cards.cardsPackId)

    React.useEffect(() => {
        dispatch(fetchCards())
    }, [cardsPage, cardsPageCount, cardsTotalCount, cardsPackId])

    const searchByQuestionCallback = (question: string) => {
        dispatch(searchByQuestion(question))
    }
    const searchByAnswerCallback = (answer: string) => {
        dispatch(searchByAnswer(answer))
    }

    return (
        <div style={{margin: '30px auto', minWidth: '850px'}}>
            <div className={styles.profileContainer}>
                <div className={styles.content}>
                    <div className={styles.cardsSearchBars}>
                        <div>
                            Search by question
                    <SearchField searchCallback={searchByQuestionCallback}/>
                    </div>
                        <div>
                            Search by answer
                    <SearchField searchCallback={searchByAnswerCallback}/>
                        </div>
                    </div>
                    <TableCards cards={cards}/>
                    <Pagination page={cardsPage}
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