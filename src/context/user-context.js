import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Modal from "../components/UI/modal";


export const UserContext = createContext({
    name: '',
    SetName: () => { },
    token: '',
    getToken: () => { },
    login: () => { },
    loggedIn: '',
    logout: () => { },
    setAdmin: () => { },
    admin: null

});

let logoutTimer;

const UserProvider = (props) => {
    const [name, setName] = useState('');
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [err, setError] = useState();
    const [expireTime, setExpireTime] = useState(localStorage.getItem('time'));
    const [expireTimeModal, setExpireTimeModal] = useState(false);
    useEffect(() => {
        console.log(expireTime > new Date().getTime());
        console.log(expireTime, new Date().getTime(), 'takotaktkkotoakaokaotkotkok');
        if (token && expireTime > new Date().getTime()) {
            axios.get("http://localhost:3002/memberinfo",
                {
                    headers:
                        { Authorization: "Bearer " + token },
                }
            ).then((res) => {

                setName(res.data.name);
                setAdmin(res.data.admin === 1 ? true : false);
                const timer = expireTime - new Date().getTime();
                console.log(timer);
                logoutTimer = setTimeout(logout, timer)
            }).catch((err) => {
                console.log('fetchErr', err);
                setError(err);
                localStorage.removeItem('token');
                setToken(null);
            })

        }
        if (token && expireTime < new Date().getTime()) {
            logout();
            setExpireTimeModal(true);

        }
    }, [token])

    async function login(loginRes) {
        const time = new Date().getTime() + 1000 * 60 * 60
        localStorage.setItem('token', loginRes.token);
        localStorage.setItem('time', time);
        setExpireTime(time)
        setToken(loginRes.token);
        if (loginRes.admin === 1) {
            localStorage.setItem('admin', 1);
            setAdmin(1);
        }
        console.log(loginRes, loginRes.admin);
        return loginRes.admin
    }
    function logout() {
        console.log("logoutFunction!!")
        localStorage.removeItem('token');
        localStorage.removeItem('time');
        setToken(null);
        setAdmin(null);
        setExpireTimeModal(null);
    }

    const CtxValue = { name, token, setToken: setToken, logout: logout, err, admin, login, setAdmin: setAdmin };

    return (
        <UserContext.Provider value={CtxValue}>
            <Modal show={expireTimeModal} delete={() => { setExpireTimeModal(() => false) }}>
                ??????????????????????????????????????????
                ???????????????????????????????????????
            </Modal>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider