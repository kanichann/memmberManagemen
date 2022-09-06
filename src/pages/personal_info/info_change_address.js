import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import Box from "../../components/UI/box";
import InputAddress from "../../components/UI/input_address";
import useReqestClient from '../../hooks/requset-hook'
import { UserContext } from '../../context/user-context';
import Button from "../../components/UI/button";

const inputReducer = (state, action) => {

    switch (action.type) {
        case 'change':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                }
                else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.val, isValid: action.isValid },
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
}
const InfoChangeAddress = () => {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext)

    const [address, addressHandler] = useState({});
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();

    const submitHandler = async (event) => {
        event.preventDefault();
        let data = new URLSearchParams();
        console.log("address", address.zipcode + address.address1 + address.address2 + address.address3);
        data.append("address", address.zipcode + address.address1 + address.address2 + address.address3);
        await requestHandler('POST', "http://localhost:3002/add_address", data, {
            Authorization: "Bearer " + userCtx.token
        }).then(res => {
            console.log(res);
            navigate("/personarl_info/info_list_address");
        }).catch(err => { console.log(err); })
    }

    return <>
        <Box>

            <form onSubmit={submitHandler} >
                <InputAddress addressHandler={(e) => { addressHandler(e) }} />
                <Button type="submit" >変更</Button>
                <RequestLoading />
                <RequestErr />
            </form>
        </Box>
    </>


}

export default InfoChangeAddress