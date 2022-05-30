import axios from "axios";

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
    recoveryPassword(email: string) {
        return instance.post(
            "/auth/forgot",
            {
                email, // кому восстанавливать пароль
                from: "test-front-admin <gipis67316@nifect.com>",
                // можно указать разработчика фронта)
                message: `<div style="background-color: #f7f7f7; padding: 15px">
                    Follow  
                    <a href='http://localhost:3000/#/set-new-password/$token$'
                    style="font-weight: bold; color: #1a73e8;">
                    this link</a> to recover your password
                    </div>` // хтмп-письмо, вместо $token$ бэк вставит токен

            }
        )
    }
}

