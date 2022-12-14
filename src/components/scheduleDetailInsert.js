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

const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const minutes = ["00", "15", "30", "45"]

const ScheduleDetailInsert = (props) => {
    const userCtx = useContext(UserContext);
    const calenderCtx = useContext(CalenderContext)
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();
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
                    {/* ?????????????????????????????????????????????????????????????????? */}
                    <Input name="schedule" type="text" labelName="??????" handler={inputHandler} />
                    <Input name="type" type="select" labelName="?????????" handler={inputHandler}>
                        <option value="0">
                            ??????
                        </option>
                        <option value="1">
                            ??????
                        </option>
                        <option value="2">
                            ??????
                        </option>
                    </Input>
                    <Input name="startTime" type="select" labelName="????????????" handler={inputHandler}>
                        <option value="">-</option>
                        {hours.map((hour) => {
                            return minutes.map((minute) => {
                                return (<option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>)
                            })
                        })}


                    </Input>
                    <Input name="endTime" type="select" labelName="????????????" handler={inputHandler}>
                        <option value="">-</option>
                        {hours.map((hour) => {
                            return minutes.map((minute) => {
                                return (<option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>)
                            })
                        })}
                    </Input>
                    <Input name="scheduleDetail" type="textarea" labelName="????????????" handler={inputHandler} />
                    {userCtx.admin &&
                        <Input name="memberOpen" type="check" val={ScheduleState.inputs.memberOpen.value} labelName="member?????????????????????" handler={inputHandler} />
                    }
                    <button className='btn mt-2'>??????</button>
                    <RequestLoading /> <RequestErr />

                </form>

            </dd>
        </dl>
    )
}

export default ScheduleDetailInsert;

