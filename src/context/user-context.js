import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";



export const UserContext = createContext({
    name: '',
    SetName: () => { },
    token: '',
    getToken: () => { },
    loggedIn: '',
    logout: () => { },
    setAdmin: () => { },
    admin: null
});

const UserProvider = (props) => {
    const [name, setName] = useState('');
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [err, setError] = useState();

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:3002/memberinfo",
                {
                    headers:
                        { Authorization: "Bearer " + token },
                }
                // axios.get("http://localhost:3002/memberinfo",
                //     {
                //         headers:
                //             { Authorization: "Bearer " + token },
                //     }
            ).then((res) => {

                setName(res.data.name);
                setAdmin(res.data.admin === 1 ? true : false);
            }).catch((err) => {
                console.log('fetchErr', err);
                setError(err);
                localStorage.removeItem('token');
                setToken(null);
            })

        }
    }, [token])
    // async function fetchName() {
    //     if (token) {
    //         const res = await axios({
    //             method: 'GET',
    //             url: "http://localhost:3002/memberinfo",
    //             headers: "bearer " + token,
    //         })
    //         setToken(localStorage.getItem('token'));
    //         setName(res.name);
    //     }
    // }

    async function getToken() {
        if (token) {
            const res = await axios({
                method: 'GET',
                url: "http://localhost:3002/memberinfo",
                headers: "bearer " + token,
            })
            setName(res.name);
            setAdmin(res.admin === 1 ? true : false);
        }
    }
    function logout() {
        localStorage.removeItem('token');
        setToken(null);
    }

    const CtxValue = { name: name, token: token, setToken: setToken, getToken: getToken, logout: logout, err: err, admin: admin, setAdmin: setAdmin };

    return (
        <UserContext.Provider value={CtxValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider