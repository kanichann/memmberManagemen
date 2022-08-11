
import React, { useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import Box from "../components/UI/box";
import Calender from "../components/calender";
import { UserContext } from "../context/user-context";
import CalenderProvider from '../context/calender-context'
import Loading from "../components/UI/loading";
import Input from '../components/UI/input'
import Modal from '../components/UI/modal'
import SelectInput from '../components/UI/selectInput';
import TextInput from '../components/UI/textInput';
import FileInput from '../components/UI/fileInput';
import axios from 'axios';

const reducer = (state, action) => {

    switch (action.type) {
        case 'title':
            return { ...state, title: action.payload }
        case 'contents':
            return { ...state, contents: action.payload }
        case 'type':
            return { ...state, type: action.payload }
        case 'pdf':
            return { ...state, pdf: action.payload }
        case 'pdfname':
            return { ...state, pdfname: action.payload }
        case 'loading':
            return { ...state, loading: action.payload }
        case 'end':
            return { ...state, end: action.payload }
        case 'err':
            return { ...state, err: action.payload }
        default:
            return state
    }
}
const initialState = {
    title: '',
    contents: '',
    type: 0,
    pdf: '',
    pdfname: '',
    loading: false,
    end: '',
    err: '',
}

const NotificationSubmit = () => {
    const userCtx = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    async function submitHandler(event) {
        event.preventDefault();
        dispatch({
            type: "err",
            payload: '',
        });
        dispatch({
            type: 'loading',
            payload: true
        })
        const data = new FormData()
        console.log(data);
        let { title, contents, type, pdf, pdfname } = state;

        data.set("title", title);
        data.set("contents", contents);
        data.append("type", +type);
        data.append("file", pdf);
        data.append("pdfname", pdfname);


        await axios.post('http://localhost:3002/notification/set', data, {
            headers: {
                Authorization: "Bearer " + userCtx.token,
                'content-type': 'multipart/form-data',
            }
        }).then(res => {
            console.log(res.data, 'schedule更新');
            dispatch({
                type: 'loading',
                payload: false
            })
        }).catch(err => {
            console.log(err);
            dispatch({
                type: 'loading',
                payload: false
            })
            dispatch({
                type: 'err', payload: err.response.data.msg
            });

        })
    }

    if (!userCtx.name) {
        return <Loading />
    }
    return (
        <article className=" gap-4 grid grid-cols-4">
            <div className="col-span-full">
                <Box>
                    <h1 className="ttl-1">メッセージ送信</h1>
                    <form onSubmit={submitHandler} enctype="multipart/form-data">
                        {/* 予定名　予定詳細　タイプ　開始時間　終了時間 */}
                        <Input nameid="title" val={state.title} type="text" labelName="件名" handler={(e) => {
                            dispatch({
                                type: "title",
                                payload: e.target.value
                            });
                        }} />
                        <SelectInput nameid="type" val={state.type} labelName="タイプ" handler={(e) => {

                            dispatch({
                                type: "type",
                                payload: e.target.value
                            });
                        }}>
                            <option value="0">
                                お知らせ
                            </option>
                            <option value="1">
                                重要
                            </option>
                            <option value="2">
                                大会情報
                            </option>
                        </SelectInput>
                        <TextInput nameid="contents" val={state.contents} labelName="内容" handler={(e) => {
                            dispatch({
                                type: "contents",
                                payload: e.target.value
                            });
                        }} />
                        <FileInput labelName="PDFアップロード" nameid="pdf" handler={(e) => {
                            dispatch({
                                type: "pdf",
                                payload: e
                            });
                        }} />
                        <Input nameid="pdfname" val={state.pdfname} type="text" labelName="PDFのタイトル" handler={(e) => {
                            dispatch({
                                type: "pdfname",
                                payload: e.target.value
                            });
                        }} />


                        <button className='btn mt-2'>送信</button>
                        {state.loading && <Loading />}
                        {state.end && <p>通知を送信いたしました。</p>}
                        {state.err && <p className="mt-6 text-red-400">{state.err}</p>}

                    </form>
                </Box>
            </div>

        </article>
    )
}

export default NotificationSubmit