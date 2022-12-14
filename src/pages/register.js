import axios from 'axios';
import React, { useState, useContext, useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Box from '../components/UI/box';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import Input from '../components/UI/input';
import InputAddress from '../components/UI/input_address';
import useReqestClient from '../hooks/requset-hook'

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

const Register = () => {
    const userCtx = useContext(UserContext);
    let navigate = useNavigate()

    const [registerState, dispatch] = useReducer(inputReducer, {
        inputs: {
            name: {
                value: '',
                isValid: false,
            },
            pass: {
                value: '',
                isValid: false,
            },
            mail: {
                value: '',
                isValid: false,
            },
            birth: {
                value: '',
                isValid: false,
            },

        },
    })
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();
    const [address, addressHandler] = useState({});
    async function submitHandler(event) {
        event.preventDefault();
        // setErr('');
        let data = new URLSearchParams();
        data.append("name", registerState.inputs.name.value);
        data.append("pass", registerState.inputs.pass.value);
        data.append("email", registerState.inputs.mail.value);
        data.append("birth", registerState.inputs.birth.value)
        data.append("address", address.zipcode + address.address1 + address.address2 + address.address3);

        await requestHandler(
            'POST', "http://localhost:3002/register", data
        ).then((res) => {
            if (res) {
                console.log('??????', 'res', res)
                return userCtx.login(res)
            }
        }).then(admin => {
            console.log(admin)
            if (admin === 0) {
                navigate('/');
            }
            if (admin === 1) {
                navigate('/admin')
            }
        })
            .catch((err) => {
                console.log("???????????????????????????")
            }
            )
    }

    const inputHandler = useCallback((inputId, val, isValid) => {
        console.log(inputId);
        return dispatch({ inputId: inputId, type: 'change', val: val, isValid: isValid })
    }, [])
    return (
        <>
            <div className=' w-80 mx-auto '>
                <Box>
                    <h1 className="ttl-1">??????</h1>
                    <form onSubmit={submitHandler} action="" className='mb-8'>

                        <Input name="name" type="text" labelName="?????????" handler={inputHandler} />
                        <Input name="pass" type="password" labelName="???????????????" handler={inputHandler} />

                        <Input name="mail" type="email" labelName="?????????????????????" handler={inputHandler} />

                        <Input name="birth" type="date" labelName="????????????" handler={inputHandler} />

                        <InputAddress addressHandler={(e) => { addressHandler(e) }} />

                        <button className='btn'>????????????</button>

                        <RequestLoading />
                        <RequestErr />
                    </form>
                    <div className='text-right'>
                        <Link to={'/login'}>????????????????????????</Link>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default Register