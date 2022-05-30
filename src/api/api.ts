import axios from "axios";
import {LoginResponseType} from "../bll/reducers/login-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const api = {
    getPing() {
        return instance.get("/ping?frontTime=1596635884283")
    },
    setNewPass() {
        return instance.post(
            "/auth/set-new-password",
            {
                password: "new-password",

            })
    },
    registration(email: string, password: string) {
        return instance.post(
            "/auth/register",
            {email, password}
        )
    },
    recoveryPass() {
        return instance.post(
            "/auth/forgot",
            {
                email: "gipis67316@nifect.com", // кому восстанавливать пароль
                from: "test-front-admin <gipis67316@nifect.com>",
                // можно указать разработчика фронта)
                message: `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/#/set-new-password/$token$'>
                    link</a>
                    </div>` // хтмп-письмо, вместо $token$ бэк вставит токен

            }
        )
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>('/auth/login', {email, password, rememberMe})
    }
}
