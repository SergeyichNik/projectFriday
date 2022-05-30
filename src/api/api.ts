import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type RegistrationParamsType = {
    email: string
    password: string
}

export const api = {
    getPing() {
        return instance.get("/ping?frontTime=1596635884283")
    },
    setNewPass() {
        return instance.post("/auth/set-new-password", {password: "new-password"})
    },
    registration(data: RegistrationParamsType) {
        return instance.post("/auth/register", data)
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
    }
}