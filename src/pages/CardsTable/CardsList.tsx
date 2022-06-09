import React from 'react';
import s from './CardsList.module.css';
import SearchField from "../../components/common/SearchField/SearchField";
import {Pagination} from "../../components/common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../bll/store/store";
import {fetchCards, searchByAnswer, searchByQuestion, setPage, setPageCount} from "../../bll/reducers/cards-reducer";
import {TableCards} from "./TableCards";
import {CardType} from "../../api/cards-api";
import {Grid, Paper} from "@mui/material";
import {Link} from "react-router-dom";

const CardsList = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector<CardType[]>(state => state.cards.cards)
    const cardsPage = useAppSelector<number>(state => state.cards.page)
    const cardsPageCount = useAppSelector<number>(state => state.cards.pageCount)
    const cardsTotalCount = useAppSelector<number>(state => state.cards.cardsTotalCount)
    const cardsQuestion = useAppSelector<string>(state => state.cards.cardQuestion)
    const cardsAnswer = useAppSelector<string>(state => state.cards.cardAnswer)
    const sortBy = useAppSelector(state => state.cards.sortCards)
    const setCardsPageCallback = (page: number) => dispatch(setPage(page))
    const setCardsPageCountCallback = (page: number) => dispatch(setPageCount(page))
    const cardsPackId = useAppSelector(state => state.cards.cardsPackId)

    React.useEffect(() => {
        dispatch(fetchCards())
    }, [cardsAnswer, cardsQuestion, cardsPage, cardsPageCount, cardsTotalCount, cardsPackId])

    const searchByQuestionCallback = (question: string) => {
        dispatch(searchByQuestion(question))
    }
    const searchByAnswerCallback = (answer: string) => {
        dispatch(searchByAnswer(answer))
    }

    const styleContainer = {
        background: '#F9F9FE',
        margin: '24px auto',
        padding: '30px'
    }

    return (
        <div>
            <Grid container justifyContent={'center'} style={{padding: '30px'}}>
                <Grid item justifyContent={'center'}>
                    <Paper elevation={3} sx={styleContainer}>
                        <div className={s.contentBlock}>
                            <div><Link className={s.backLink} to={'../pack-table'}>Back</Link></div>
                            <div className={s.cardsSearchBar}>
                                    <SearchField
                                        searchCallback={searchByQuestionCallback}
                                        placeholder={'Question'}
                                    />
                                    <SearchField
                                        searchCallback={searchByAnswerCallback}
                                        placeholder={'Answer'}
                                    />
                            </div>
                            <TableCards cards={cards}/>
                            <Pagination page={cardsPage}
                                        pageCount={cardsPageCount}
                                        cardsPacksTotalCount={cardsTotalCount}
                                        setPageCallback={setCardsPageCallback}
                                        setPageCountCallback={setCardsPageCountCallback}
                            />
                        </div>
                    </Paper>

                </Grid>
            </Grid>
        </div>
    );
};

export default CardsList;