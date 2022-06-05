import styles from './Profile.module.css'

import React from 'react';
import Button from '@mui/material/Button';
import {logOut} from '../../bll/reducers/app-reducer';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../bll/store/store';
import {EditProfile} from './EditProfile/EditProfile';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {fetchCardsPack} from '../../bll/reducers/pack-reducer';
import {TablePack} from '../PackTable/TablePack';


const Profile = () => {
    const dispatch = useAppDispatch()

    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const avatar = useAppSelector<string | undefined>(state => state.login.data.avatar)
    const name = useAppSelector<string>(state => state.login.data.name)

    const [editMode, setEditMode] = React.useState(false)

    const onClickChangeEditModeHandler = () => {
        setEditMode(!editMode)
    }

    const onClickLogOutHandler = () => {
        dispatch(logOut())
    }

    const getpar = () => {
        dispatch(fetchCardsPack())
    }

    if (!isAuth) return <Navigate to={'/login'}/>

    return (
        <>
            {!editMode
                ? <div className={styles.profileContainer}>
                    <div className={styles.sidebar}>

                        <ProfileInfo avatar={avatar}
                                     name={name}
                                     editMode={editMode}
                                     onClickChangeEditModeHandler={onClickChangeEditModeHandler}/>

                        <div style={{textAlign: 'center', margin: '10px 0'}}>
                            <Button variant={'contained'}
                                    onClick={onClickLogOutHandler}>
                                Log out
                            </Button>

                            <div onClick={getpar}>UP</div>
                        </div>

                        <div style={{background: '#ddd'}}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodieveniet exercitationem
                            molestias optio, recusandae voluptatibus. Amet doloribus perspiciatis tempore! Consequuntur
                            dolorem eligendi eum, nesciunt quidem repellendus repudiandae saepe vero. Et quibusdam quos
                            similique. Aliquam blanditiis, corporis debitis delectus ea, eos labore magnam odio
                            praesentium
                            quidem quod similique voluptatem, voluptates? Eaque.
                        </div>

                    </div>
                    <div className={styles.content}>
                        <TablePack />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
                        beatae fuga ipsum quo sint. Aspernatur eum eveniet, fugit perspiciatis quibusdam sequi velit.
                        Aperiam architecto asperiores consectetur consequatur consequuntur debitis distinctio dolorem
                        doloribus ducimus eligendi esse exercitationem id incidunt iure, maxime nesciunt odit placeat
                        qui
                        quisquam quos, recusandae rerum sed soluta tempora tenetur ut vel! Ab alias animi aspernatur,
                        corporis debitis dolor eaque esse eum facilis fuga ipsam iusto magni maiores molestias natus
                        nihil
                        numquam odit officia porro quas tenetur vitae voluptates voluptatibus! Commodi culpa cum
                        deserunt
                        doloribus ea eos et excepturi exercitationem, harum illo minima obcaecati quod ratione
                        recusandae,
                        repellat reprehenderit tempora temporibus unde. Consequuntur enim error eveniet nihil quis
                        ratione
                        reprehenderit. Consequuntur cumque eveniet laudantium, nemo pariatur quia veritatis. A aliquid
                        animi
                        cum, eaque eveniet excepturi illo iure maiores minus necessitatibus pariatur qui, vel? Ad,
                        aperiam
                        aut blanditiis corporis dolor, fugiat hic minima nobis obcaecati odio reiciendis voluptate. Ab
                        ad
                        architecto asperiores assumenda atque aut autem corporis delectus doloribus ea eos, facilis
                        fugit
                        illo ipsum labore natus necessitatibus nostrum obcaecati pariatur quisquam ratione repudiandae
                        sapiente sequi similique soluta ut voluptas voluptate? Dignissimos, eos est expedita facere illo
                        iste molestiae molestias nesciunt placeat quibusdam sunt, suscipit tempora unde velit voluptate!
                        Ab,
                        accusamus alias commodi cupiditate delectus eius fuga, minima nam nesciunt quidem quos totam.
                        Dicta
                        dolorum earum enim et explicabo in magnam molestias porro reprehenderit, similique suscipit
                        totam?
                        Deleniti ea earum est libero nisi perferendis quod suscipit voluptatem. Consectetur cumque ea
                        eos
                        facilis, in ipsam quasi recusandae. Accusamus commodi, perferendis?250
                    </div>
                </div>

                : <EditProfile avatar={avatar}
                               name={name}
                               editMode={editMode}
                               onClickChangeEditModeHandler={onClickChangeEditModeHandler}
                />}
        </>
    );
};

export default Profile;