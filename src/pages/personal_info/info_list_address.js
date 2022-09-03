import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { useReducer } from "react";
import { useContext } from "react";
import Box from "../../components/UI/box";
import Input from "../../components/UI/input";
import useReqestClient from '../../hooks/requset-hook'
import { VALIDATOR_REQUIRE } from '../../util/validate';
import { UserContext } from '../../context/user-context';
import Button from "../../components/UI/button";
import { useEffect } from "react";
import { useState } from "react";


const InfoListAddress = () => {
    const userCtx = useContext(UserContext)
    const [addressList, setAddressList] = useState([]);
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();

    useEffect(() => {
        requestHandler('GET', "http://localhost:3002/get_address", null, {
            Authorization: "Bearer " + userCtx.token
        }).then(res => {
            console.log(res)
            setAddressList(res);
        }).catch(err => { console.log(err); })
    }, [])
    const changeHandler = (selectedAddress) => {

        let data = new URLSearchParams();
        data.append("addressId", selectedAddress);
        console.log(selectedAddress);
        requestHandler('POST', "http://localhost:3002/change_address", data, {
            Authorization: "Bearer " + userCtx.token
        }).then((res) => {
            setAddressList(res);
        })
    }

    if (!addressList) {
        return <RequestLoading />
    }
    return <>

        <Box>
            <ul className="">
                {addressList.map((address) => <li onClick={() => {
                    changeHandler(address.address_id)
                }} key={address.address}><Button className={`btn_list ${address.selected === '1' && "btn_list_check"}`} >{address.address}</Button></li>)}
                <li ><Button className="btn_list" to="/personarl_info/info_change_address/">住所を追加する</Button></li>

            </ul>

        </Box>
    </>


}

export default InfoListAddress