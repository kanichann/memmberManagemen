import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Box from '../components/UI/box';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import Input from '../components/UI/input';
import InputAddress from '../components/UI/input_address';
const Register = () => {
    let userCtx = useContext(UserContext)
    let navigate = useNavigate()
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [err, setErr] = useState('');
    const [address, addressHandler] = useState({});
    async function submitHandler(event) {
        event.preventDefault();
        setErr('');
        // setErr('');
        let data = new URLSearchParams();
        data.append("name", name);
        data.append("pass", pass);
        data.append("email", email);
        data.append("birth",birth)
        data.append("address", address.zipcode + address.address1 + address.address2 + address.address3);
        
        const res = await axios({
            method: 'POST',
            url: "http://localhost:3002/register",
            data: data
        }).catch((err) => { setErr(true); })
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
        if (!res.data) {
            setErr(true)
        }

    }



    return (
        <>
            <div className=' w-80 mx-auto '>
                <Box>
                    <h1 className="ttl-1">登録</h1>
                    <form onSubmit={submitHandler} action="" className='mb-8'>

                        <Input nameid="name" val={name} type="text" labelName="お名前" handler={(e) => { setName(e.target.value) }} />
                        <Input nameid="pass" val={pass} type="password" labelName="パスワード" handler={(e) => { setPass(e.target.value) }} />

                        <Input nameid="mail" val={email} type="email" labelName="メールアドレス" handler={(e) => { setEmail(e.target.value) }} />

                        <Input nameid="birth" val={birth} type="date" labelName="生年月日" handler={(e) => { setBirth(e.target.value) }} />

                        <InputAddress addressHandler={(e) => { addressHandler(e) }} />

                        <button className='btn'>新規登録</button>
                        {err && <p>登録に失敗しました</p>}
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