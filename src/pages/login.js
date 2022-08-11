import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Box from '../components/UI/box';
import { UserContext } from '../context/user-context';
import { Link } from 'react-router-dom';
import Input from '../components/UI/input'

const Login = () => {
    const userCtx = useContext(UserContext)
    const navigate = useNavigate()
    async function loginHandler(event) {
        event.preventDefault();
        errHandler('');
        let data = new URLSearchParams();
        data.append("email", email);
        data.append("pass", pass);
        console.log('send');
        await axios({
            method: 'POST',
            url: "http://localhost:3002/login",
            data: data
        }).then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            userCtx.setToken(res.data.token);
            console.log(res.data.admin);
            if (res.data.admin === 1) {
                localStorage.setItem('admin', 1);
                userCtx.setAdmin(1);
                navigate('/admin')
            } else {
                navigate('/');
            }
        }).catch(err => { console.log(err); errHandler(err.response.data.msg) })

    }


    // メンバー内になければアドミン枠を検索しにいきそちらにあればアドミン画面へ遷移

    const [pass, passHandler] = useState('');
    const [email, emailHandler] = useState('');
    const [err, errHandler] = useState('');


    return (
        <div className='transition'>
            <div className=' w-80 mx-auto '>
                <Box>
                    <h1 className="ttl-1">ログイン</h1>
                    <form onSubmit={loginHandler} className='mb-2 gap-y-16'>
                        <Input nameid="mail" val={email} type="email" labelName="メールアドレス" handler={(e) => { emailHandler(e.target.value) }} />
                        {/* <div>
                            <label htmlFor="mail">E-Mail</label>
                            <input onChange={(e) => { console.log('change2'); emailHandler(e.target.value) }} type="email" value={email} className='w-full block border border-neutral-600 p-1' id='mail' name='mail' />
                        </div> */}
                        <Input nameid="pass" val={pass} type="password" labelName="パスワード" handler={(e) => { passHandler(e.target.value) }} />
                        {/* <div className='mb-4'>
                            <label htmlFor="pass">PASSWORD</label>
                            <input onChange={(e) => { console.log('change'); passHandler(e.target.value) }} type="password" value={pass} className='w-full block border border-neutral-600 p-1' id='pass' name='pass' />
                        </div> */}
                        {err && <p className="mt-6 text-red-400">{err}</p>}
                        <button className='btn mt-2'>ログイン</button>
                    </form>
                    <div className='text-right'>
                        <Link to={'/register'}>新規登録はこちら</Link>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Login