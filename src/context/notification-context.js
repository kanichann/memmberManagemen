import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from './user-context';
export const NotificationContext = createContext({
    data: [],
    setdata: () => { },
    dataAll: [],
    setdataAll: () => { },
    notRead: [],
    setnotRead: () => { }

});

const NotificationProvider = (props) => {
    const { token, admin } = useContext(UserContext);

    const [data, setdata] = useState([]);
    const [dataAll, setdataAll] = useState([]);
    const [notRead, setnotRead] = useState([]);


    useEffect(() => {
        if (token) {
            if (admin === "") return;
            const getUrl = admin ? "http://localhost:3002/notification/" : "http://localhost:3002/notification/read";
            console.log(admin, "admin", getUrl);
            axios.get(getUrl,
                {
                    headers:
                        { Authorization: "Bearer " + token },
                }

            ).then((res) => {
                setdata(res.data);

            }).catch((err) => {
                console.log('fetchErr', err);

            })

        }
    }, [admin])

    const getDataAll = () => {
        if (token) {
            axios.get("http://localhost:3002/notification/all",
                {
                    headers:
                        { Authorization: "Bearer " + token },
                }
            ).then((res) => {
                setdataAll(res.data);
                console.log("resres")
            }).catch((err) => {
                console.log('fetchErr', err);

            })
        }
    }
    const getDataNotRead = () => {
        if (token) {
            axios.get("http://localhost:3002/notification/notread",
                {
                    headers:
                        { Authorization: "Bearer " + token },
                }
            ).then((res) => {
                setnotRead(res.data);
                console.log("resres")
            }).catch((err) => {
                console.log('fetchErr', err);

            })
        }
    }

    const CtxValue = { data: data, setdata: setdata, dataAll: dataAll, setdataAll: getDataAll, notRead: notRead, setnotRead: getDataNotRead }
    return (
        <NotificationContext.Provider value={CtxValue}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider