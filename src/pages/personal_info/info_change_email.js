import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useReducer } from "react";
import { useContext } from "react";
import Box from "../../components/UI/box";
import Input from "../../components/UI/input";
import useReqestClient from '../../hooks/requset-hook'
import { VALIDATOR_REQUIRE } from '../../util/validate';
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
const InfoChangeEmail = () => {
    const userCtx = useContext(UserContext)
    const userEmail = useParams().userEmail;
    const navigate = useNavigate();
    // const userCtx = useContext(UserContext)
    const [inputState, dispatch] = useReducer(inputReducer, {
        inputs: {
            email: {
                value: '',
                isValid: false
            }

        },
        isValid: false
    })
    const inputHandler = useCallback((inputId, val, isValid) => {
        return dispatch({ inputId: inputId, type: 'change', val: val, isValid: isValid })
    }, [])
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();

    const submitHandler = async (event) => {
        event.preventDefault();
        let data = new URLSearchParams();
        data.append("email", inputState.inputs.email.value);
        await requestHandler('POST', "http://localhost:3002/change_email", data, {
            Authorization: "Bearer " + userCtx.token
        }).then(() => {
            console.log('resres');
            navigate('/personarl_info/info_list_email')

        }).catch(err => { console.log(err); })
    }

    return <>
        <Box>

            <form onSubmit={submitHandler} >
                <Input name="email" validate={[VALIDATOR_REQUIRE()]} val={userEmail || ''}
                    type="email" labelName="メールアドレス" handler={inputHandler} />
                <Button type="submit" >変更</Button>
            </form>
        </Box>
    </>


}

export default InfoChangeEmail