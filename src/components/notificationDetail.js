import react, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContext } from "../context/notification-context";
import Modal from './UI/modal';
import CheckInput from './UI/checkInput';
import { UserContext } from '../context/user-context';
import axios from 'axios';
const NotificationDetail = (props) => {
    const NotificationCtx = useContext(NotificationContext);
    const userCtx = useContext(UserContext);
    const closeModal = () => {
        props.delete();
    }


    const confirmHandler = async (notificationId) => {
        let data = new URLSearchParams();
        data.append("id", notificationId);
        await axios({
            method: 'post',
            url: "http://localhost:3002/notification/read",
            headers:
                { Authorization: "Bearer " + userCtx.token },
            data: data
        }).then(res => {
            props.delete();
            NotificationCtx.setdata((arr) => {
                return arr.filter(val => {

                    return val.id !== notificationId
                })
            });

        }).catch(err => {
            console.log(err);
        })
        closeModal();
    }
    return (
        <Modal closeModal={closeModal}>
            <p>{props.data.date}</p>
            <dl>

                <dt>{props.type === 0 ? "お知らせ" : props.type === 1 ? "重要情報" : "大会情報"}</dt>
                <dd>
                    <p>{props.data.title}</p>
                    <p>{props.data.contents}</p>
                    {props.data.pdffile && <p><a href={`http://localhost:3002/lib/${props.data.pdffile}`} target="_blank">{props.data.pdfname ? props.data.pdfname : '詳細資料'}</a></p>}
                    {props.read &&
                        <button className='btn' onClick={() => { confirmHandler(props.data.id) }}>確認しました</button>
                    }
                </dd>
            </dl>
        </Modal>

    )
}

export default NotificationDetail
