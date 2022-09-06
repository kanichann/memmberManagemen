import React from "react";
import { useContext } from "react";
import Box from "../../components/UI/box";
import useReqestClient from '../../hooks/requset-hook';
import { UserContext } from '../../context/user-context';
import Button from "../../components/UI/button";
import { useEffect } from "react";
import { useState } from "react";


const InfoListEmail = () => {
    const userCtx = useContext(UserContext)


    const [email, setEmail] = useState();
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();
    useEffect(() => {
        requestHandler('GET', "http://localhost:3002/get_email", null, {
            Authorization: "Bearer " + userCtx.token
        }).then(res => {
            console.log(res);
            setEmail(res.email);
        }).catch(err => { console.log(err); })
    }, [])


    if (!email) {
        return <RequestLoading />
    }
    return <>

        <Box>
            <p>メールアドレス:{email}</p>
            <ul >
                <li ><Button className="btn_list" to="/personarl_info/info_change_email/">メールアドレスを追加する</Button></li>
            </ul>
            <RequestErr />
            <RequestLoading />
        </Box>
    </>


}

export default InfoListEmail