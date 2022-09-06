import React, { useContext, useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Box from '../components/UI/box';
import { UserContext } from '../context/user-context';
import { Link } from 'react-router-dom';
import Input from '../components/UI/input'
import Button from '../components/UI/button'
import { VALIDATOR_REQUIRE } from '../util/validate';
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
        case 'err':
            return {
                ...state,
                err: action.val
            }
        default:
            return state;
    }
}
const Login = () => {
    const [LoginState, dispatch] = useReducer(inputReducer,
        {
            inputs: {
                pass: {
                    value: '',
                    isValid: false
                },
                email: {
                    value: '',
                    isValid: false
                }

            },
            err: '',
            isValid: false
        }
    )
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();
    const inputHandler = useCallback((inputId, val, isValid) => {
        return dispatch({ inputId: inputId, type: 'change', val: val, isValid: isValid })
    }, [])


    const userCtx = useContext(UserContext)
    const navigate = useNavigate()
    async function loginHandler(event) {
        event.preventDefault();
        let data = new URLSearchParams();
        data.append("email", LoginState.inputs.email.value);
        data.append("pass", LoginState.inputs.pass.value);
        await requestHandler('POST', "http://localhost:3002/login", data)
            .then(res => {

                return userCtx.login(res);
            }).then(res => {
                console.log(res);
                if (res === 1) {
                    console.log("resres", res === 1);
                    navigate('/admin')
                } else {
                    navigate('/');
                }
            }).catch(err => { console.log(err); })

    }
    return (
        <div className='transition'>
            <div className=' w-80 mx-auto '>
                <Box>
                    <h1 className="ttl-1">ログイン</h1>
                    <form onSubmit={loginHandler} className='mb-2 gap-y-16'>
                        <Input name="email" validate={[VALIDATOR_REQUIRE()]} type="email" labelName="メールアドレス" handler={inputHandler} />

                        <Input name="pass" validate={[VALIDATOR_REQUIRE()]} type="password" labelName="パスワード" handler={inputHandler} />

                        <RequestErr />
                        <Button style="mb-4" type="submit">ログイン</Button>
                    </form>
                    <RequestLoading />
                    <div className='text-right'>
                        <Link to={'/register'}>新規登録はこちら</Link>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Login