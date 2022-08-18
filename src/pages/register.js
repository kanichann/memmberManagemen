import axios from 'axios';
import React, { useState, useContext, useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Box from '../components/UI/box';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import Input from '../components/UI/input';
import InputAddress from '../components/UI/input_address';

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
        case 'err':
            return {
                ...state,
                err: action.val
            }
        default:
            return state;
    }
}

const Register = () => {
    let userCtx = useContext(UserContext)
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
        err: '',
        isValid: false
    })
    // const [name, setName] = useState('');
    // const [pass, setPass] = useState('');
    // const [email, setEmail] = useState('');
    // const [birth, setBirth] = useState('');
    // const [err, setErr] = useState('');
    const [address, addressHandler] = useState({});
    async function submitHandler(event) {
        event.preventDefault();
        dispatch({ type: 'err', val: '' })
        // setErr('');
        let data = new URLSearchParams();
        data.append("name", registerState.inputs.name.value);
        data.append("pass", registerState.inputs.pass.value);
        data.append("email", registerState.inputs.mail.value);
        data.append("birth", registerState.inputs.birth.value)
        data.append("address", address.zipcode + address.address1 + address.address2 + address.address3);

        const res = await axios({
            method: 'POST',
            url: "http://localhost:3002/register",
            data: data
        }).catch((err) => { console.log(err.response.data.msg); dispatch({ type: 'err', val: err.response.data.msg || "登録に失敗しました" }); })
        // let resData = JSON.parse(res);
        // console.log(resData);
        if (res.data) {
            localStorage.setItem('token', res.data.token);
            await userCtx.setToken(res.data.token);
            console.log('成功')
            if (res.data.admin === 0) {
                navigate('/');
            }
            if (res.data.admin === 1) {
                navigate('/admin')
            }
        }
        // if (!res.data) {
        //     dispatch({ type: 'err', val: true })
        // }

    }

    const inputHandler = useCallback((inputId, val, isValid) => {
        console.log(inputId);
        return dispatch({ inputId: inputId, type: 'change', val: val, isValid: isValid })
    }, [])



    return (
        <>
            <div className=' w-80 mx-auto '>
                <Box>
                    <h1 className="ttl-1">登録</h1>
                    <form onSubmit={submitHandler} action="" className='mb-8'>

                        <Input name="name" type="text" labelName="お名前" handler={inputHandler} />
                        <Input name="pass" type="password" labelName="パスワード" handler={inputHandler} />

                        <Input name="mail" type="email" labelName="メールアドレス" handler={inputHandler} />

                        <Input name="birth" type="date" labelName="生年月日" handler={inputHandler} />

                        <InputAddress addressHandler={(e) => { addressHandler(e) }} />

                        <button className='btn'>新規登録</button>
                        {registerState.err && <p className=' text-red-600'>{registerState.err}</p>}
                    </form>
                    <div className='text-right'>
                        <Link to={'/login'}>ログインはこちら</Link>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default Register