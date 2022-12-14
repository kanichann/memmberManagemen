import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from './user-context';
export const CalenderContext = createContext({
    date: [],
    dateUpdate: () => { }
});
const CalenderProvider = (props) => {
    const { token } = useContext(UserContext);

    const [scheduleData, setScheduleData] = useState('');
    useEffect(() => {
        if (token) {
            axios.get("http://localhost:3002/schedule",
                {
                    headers:
                        { Authorization: "Bearer " + token },
                }

            ).then((res) => {
                console.log('hello');
                console.log(res);
                setScheduleData(res.data);
            }).catch((err) => {
                console.log('fetchErr', err);
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