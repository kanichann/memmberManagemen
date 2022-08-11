import React, { useContext, useState, useReducer } from 'react';
import Input from './UI/input'
import Modal from './UI/modal'
import SelectInput from './UI/selectInput';
import TextInput from './UI/textInput';
import CheckInput from './UI/checkInput';
import axios from 'axios';
import { UserContext } from "../context/user-context";
import { CalenderContext } from '../context/calender-context';

const reducer = (state, action) => {

    switch (action.type) {
        case 'scheduleDetail':
            return { ...state, scheduleDetail: action.payload }
        case 'schedule':
            return { ...state, schedule: action.payload }
        case 'type':
            return { ...state, type: action.payload }
        case 'startTime':
            return { ...state, startTime: action.payload }
        case 'endTime':
            return { ...state, endTime: action.payload }
        case 'memberOpen':
            return { ...state, memberOpen: !state.memberOpen }
        case 'err':
            return { ...state, err: action.payload }

        default:
            return state
    }
}

const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const minutes = ["00", "15", "30", "45"]

const ScheduleDetailInsert = (props) => {

    const initialState = {
        schedule: props.schedule.schedule,
        scheduleDetail: props.schedule.schedule_detail,
        type: props.schedule.schedule_type,
        startTime: props.schedule.schedule_start,
        endTime: props.schedule.schedule_end,
        err: '',
        memberOpen: props.schedule.memberopen === 1 ? true : false
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const [change, setChange] = useState(false);
    const userCtx = useContext(UserContext);
    const calenderCtx = useContext(CalenderContext)
    const closeModal = (event) => {
        props.delete()
    }


    async function submitHandler(event) {
        event.preventDefault();
        dispatch({
            type: "err",
            payload: '',
        });
        let data = new URLSearchParams();
        let { schedule, scheduleDetail, type, startTime, endTime } = state;
        data.append("schedule", schedule);
        data.append("scheduleDetail", scheduleDetail);
        data.append("type", +type);
        data.append("startTime", startTime);
        data.append("endTime", endTime);
        data.append("date", +props.scheduleDataNum);
        data.append("id", +props.schedule.id);
        await axios({
            method: 'POST',
            url: "http://localhost:3002/schedule/update",
            headers:
                { Authorization: "Bearer " + userCtx.token },
            data: data
        }).then(res => {

            calenderCtx.setScheduleData(res.data);
            props.delete();
        }).catch(err => {
            console.log(err); dispatch({ type: 'err', payload: err.response.data.msg })
        })
    }


    // async function submitHandler(event) {
    //     event.preventDefault();
    //     dispatch({
    //         type: "err",
    //         payload: '',
    //     });
    //     let data = new URLSearchParams();
    //     let { schedule, scheduleDetail, type, startTime, endTime } = state;
    //     data.append("schedule", schedule);
    //     data.append("scheduleDetail", scheduleDetail);
    //     data.append("type", +type);
    //     data.append("startTime", startTime);
    //     data.append("endTime", endTime);
    //     data.append("date", +props.scheduleDataNum);
    //     await axios({
    //         method: 'POST',
    //         url: "http://localhost:3002/schedule/set",
    //         headers:
    //             { Authorization: "Bearer " + userCtx.token },
    //         data: data
    //     }).then(res => {
    //         console.log(res.data, 'schedule更新');
    //         calenderCtx.setScheduleData(res.data);
    //         props.delete();
    //     }).catch(err => {
    //         console.log(err); dispatch({ type: 'err', payload: err.response.data.msg })
    //     })
    // }
    console.log(userCtx.admin);
    console.log(userCtx.admin === 1, props.schedule.memberopen, 'takotkao')

    return (
            <dl className='p-16'>
                <dt>
                    {props.scheduleDate}
                </dt>
                {!change && <><dd>
                    <dl>
                        <dt>予定</dt>
                        <dd>{props.schedule.schedule}</dd>
                        <dt>タイプ</dt>
                        <dd>{props.schedule.schedule_type}</dd>
                        <dt>予定時間</dt>
                        <dd>{props.schedule.schedule_start}~{props.schedule.schedule_end}</dd>
                        <dt>予定詳細</dt>
                        <dd>{props.schedule.schedule_detail}</dd>
                        {userCtx.admin && (props.schedule.memberopen === 1) ? <dt>会員に共有しています</dt> : <dt>会員に共有していません</dt>}
                    </dl>
                </dd>

                    <button className='btn mt-2' onClick={() => { setChange(true) }}>修正</button></>
                }




                {change && <form onSubmit={submitHandler}>
                    {/* 予定名　予定詳細　タイプ　開始時間　終了時間 */}
                    <Input nameid="schedule" val={state.schedule} type="text" labelName="予定" handler={(e) => {

                        dispatch({
                            type: "schedule",
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
                            なし
                        </option>
                        <option value="1">
                            重要
                        </option>
                        <option value="2">
                            締切
                        </option>
                    </SelectInput>
                    <SelectInput nameid="startTime" val={state.startTime} labelName="開始時間" handler={(e) => {
                        dispatch({
                            type: "startTime",
                            payload: e.target.value
                        });
                    }}>
                        <option value="">-</option>
                        {hours.map((hour) => {
                            return minutes.map((minute) => {
                                return (<option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>)
                            })
                        })}


                    </SelectInput>
                    <SelectInput nameid="endTime" val={state.endTime} labelName="終了時間" handler={(e) => {
                        dispatch({
                            type: "endTime",
                            payload: e.target.value
                        });
                    }}>
                        <option value="">-</option>
                        {hours.map((hour) => {
                            return minutes.map((minute) => {
                                return (<option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>)
                            })
                        })}


                    </SelectInput>
                    <TextInput nameid="scheduleDetail" val={state.scheduleDetail} type="scheduleDetail" labelName="予定詳細" handler={(e) => {
                        dispatch({
                            type: "scheduleDetail",
                            payload: e.target.value
                        });
                    }} />
                    {userCtx.admin &&
                        <CheckInput name="memberOpen" val={state.memberOpen} handler={(e) => {
                            dispatch({
                                type: "memberOpen"
                            });
                        }}>member全体に公開する</CheckInput>
                    }
                    <button className='btn mt-2'>登録</button>
                    {state.err && <p className="mt-6 text-red-400">{state.err}</p>}

                    <button className='btn mt-2'>登録</button>
                    {state.err && <p className="mt-6 text-red-400">{state.err}</p>}
                </form>}

                {/* {state.err && <p className="mt-6 text-red-400">{state.err}</p>} */}


            </dl>
    )
}

export default ScheduleDetailInsert;


