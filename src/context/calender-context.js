import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
// import { useNavigate } from 'react-router';
// import Box from '../components/UI/box';
import { UserContext } from './user-context';
// import { Link } from 'react-router-dom';
// import Input from '../components/UI/input'


export const CalenderContext = createContext({
    date: [],
    dateUpdate: () => { }
});


const CalenderProvider = (props) => {
    const { token } = useContext(UserContext);

    const [scheduleData, setScheduleData] = useState('');
    useEffect(() => {
        if (token) {
            console.log('useContext', "Bearer " + token)
            axios.get("http://localhost:3002/schedule",
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
                // setName(res.data.name);
                console.log('hello');
                console.log(res);
                setScheduleData(res.data);
            }).catch((err) => {
                console.log('fetchErr', err);
                // setError(err);
                // localStorage.removeItem('token');
                // setToken(null);
            })

        }
    }, [token])
    function dateUpdate(updateSchedule) {
        setScheduleData(updateSchedule)
    }


    console.log(scheduleData, 'scheudledatadetail')
    const CtxValue = { date: scheduleData, setScheduleData: dateUpdate }
    return (
        <CalenderContext.Provider value={CtxValue}>
            {props.children}
        </CalenderContext.Provider>
    )
}

export default CalenderProvider