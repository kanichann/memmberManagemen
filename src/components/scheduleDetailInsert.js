import React, { useContext, useCallback, useReducer } from 'react';
import Input from './UI/input'
import Modal from './UI/modal'
import SelectInput from './UI/selectInput';
import TextInput from './UI/textInput';
import CheckInput from './UI/checkInput';
import useReqestClient from '../hooks/requset-hook'
import axios from 'axios';
import { UserContext } from "../context/user-context";
import { CalenderContext } from '../context/calender-context';


// const reducer = (state, action) => {

//     switch (action.type) {
//         case 'scheduleDetail':
//             return { ...state, scheduleDetail: action.value }
//         case 'schedule':
//             return { ...state, schedule: action.value }
//         case 'type':
//             return { ...state, type: action.value }
//         case 'startTime':
//             return { ...state, startTime: action.value }
//         case 'endTime':
//             return { ...state, endTime: action.value }
//         case 'memberOpen':
//             return { ...state, memberOpen: !state.memberOpen }
//         case 'err':
//             return { ...state, err: action.value }
//         default:
//             return state
//     }
// }
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
// const initialState = {
//     schedule: '',
//     scheduleDetail: '',
//     type: 0,
//     startTime: '',
//     endTime: '',
//     err: '',
//     memberOpen: false
// }

const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const minutes = ["00", "15", "30", "45"]

const ScheduleDetailInsert = (props) => {
    const userCtx = useContext(UserContext);
    const calenderCtx = useContext(CalenderContext)
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();
    // const [state, dispatch] = useReducer(reducer, initialState);




    const [ScheduleState, dispatch] = useReducer(inputReducer,
        {
            inputs: {
                schedule: {
                    value: '',
                    isValid: false
                },
                scheduleDetail: {
                    value: '',
                    isValid: false
                },
                type: {
                    value: '',
                    isValid: false
                },
                startTime: {
                    value: '',
                    isValid: false
                },
                endTime: {
                    value: '',
                    isValid: false
                },
                memberOpen: {
                    value: false,
                    isValid: true
                }

            },
            err: '',
            isValid: false
        }
    )

    const inputHandler = useCallback((inputId, val, isValid) => {

        return dispatch({ inputId: inputId, type: 'change', val: val, isValid: isValid })
    }, [])




    async function submitHandler(event) {
        event.preventDefault();
        dispatch({
            type: "err",
            value: '',
        });
        let data = new URLSearchParams();
        data.append("schedule", ScheduleState.inputs.schedule.value);
        data.append("scheduleDetail", ScheduleState.inputs.scheduleDetail.value);
        data.append("type", +ScheduleState.inputs.type.value);
        data.append("startTime", ScheduleState.inputs.startTime.value);
        data.append("endTime", ScheduleState.inputs.endTime.value);
        data.append("date", +props.scheduleDataNum);
        data.append("memberOpen", ScheduleState.inputs.memberOpen.value);
        await requestHandler(
            'POST',
            "http://localhost:3002/schedule/set",
            data,
            { Authorization: "Bearer " + userCtx.token },

        ).then(res => {
            calenderCtx.setScheduleData(res);
            props.delete();
        }).catch(err => {
            console.log(err);
        })
    }

    return (


        <dl className='p-16'>
            <dt>
                {props.scheduleDate}
            </dt>
            <dd>
                <form onSubmit={submitHandler}>
                    {/* 予定名　予定詳細　タイプ　開始時間　終了時間 */}
                    <Input name="schedule" type="text" labelName="予定" handler={inputHandler} />
                    <Input name="type" type="select" labelName="タイプ" handler={inputHandler}>
                        <option value="0">
                            なし
                        </option>
                        <option value="1">
                            重要
                        </option>
                        <option value="2">
                            締切
                        </option>
                    </Input>
                    <Input name="startTime" type="select" labelName="開始時間" handler={inputHandler}>
                        <option value="">-</option>
                        {hours.map((hour) => {
                            return minutes.map((minute) => {
                                return (<option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>)
                            })
                        })}


                    </Input>
                    <Input name="endTime" type="select" labelName="終了時間" handler={inputHandler}>
                        <option value="">-</option>
                        {hours.map((hour) => {
                            return minutes.map((minute) => {
                                return (<option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>)
                            })
                        })}


                    </Input>
                    <Input name="scheduleDetail" type="textarea" labelName="予定詳細" handler={inputHandler} />
                    {userCtx.admin &&
                        <Input name="memberOpen" type="check" val={ScheduleState.inputs.memberOpen.value} labelName="member全体に公開する" handler={inputHandler} />
                    }
                    <button className='btn mt-2'>登録</button>
                    <RequestLoading /> <RequestErr />

                </form>

            </dd>
        </dl>
    )
}

export default ScheduleDetailInsert;

