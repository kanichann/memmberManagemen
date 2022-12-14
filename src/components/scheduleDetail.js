import React, { useContext, useState, useReducer, useCallback } from 'react';
import Input from './UI/input'
import { UserContext } from "../context/user-context";
import { CalenderContext } from '../context/calender-context';
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


const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const minutes = ["00", "15", "30", "45"]

const ScheduleDetailInsert = (props) => {




    const [ScheduleState, dispatch] = useReducer(inputReducer,
        {
            inputs: {
                schedule: {
                    value: props.schedule.schedule,
                    isValid: false
                },
                scheduleDetail: {
                    value: props.schedule.schedule_detail,
                    isValid: false
                },
                type: {
                    value: props.schedule.schedule_type,
                    isValid: false
                },
                startTime: {
                    value: props.schedule.schedule_start,
                    isValid: false
                },
                endTime: {
                    value: props.schedule.schedule_end,
                    isValid: false,
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
    console.log(props, 'proprpro', ScheduleState)
    const inputHandler = useCallback((inputId, val, isValid) => {
        console.log(val);
        return dispatch({ inputId: inputId, type: 'change', val: val, isValid: isValid })
    }, [])
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();


    const [change, setChange] = useState(false);
    const userCtx = useContext(UserContext);
    const calenderCtx = useContext(CalenderContext)

    async function submitHandler(event) {
        event.preventDefault();

        let data = new URLSearchParams();

        data.append("schedule", ScheduleState.inputs.schedule.value);
        data.append("scheduleDetail", ScheduleState.inputs.scheduleDetail.value);
        data.append("type", +ScheduleState.inputs.type.value);
        data.append("startTime", ScheduleState.inputs.startTime.value);
        data.append("endTime", ScheduleState.inputs.endTime.value);
        data.append("date", +props.scheduleDataNum);
        data.append("memberOpen", ScheduleState.inputs.memberOpen.value);
        data.append("id", +props.schedule.id);
        await requestHandler('POST', "http://localhost:3002/schedule/update", data,
            { Authorization: "Bearer " + userCtx.token }).then(res => {

                calenderCtx.setScheduleData(res);
                props.delete();
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <dl className='p-16'>
            <dt>
                {props.scheduleDate}
            </dt>
            {!change && <><dd>
                <dl>
                    <dt>??????</dt>
                    <dd>{props.schedule.schedule}</dd>
                    <dt>?????????</dt>
                    <dd>{props.schedule.schedule_type}</dd>
                    <dt>????????????</dt>
                    <dd>{props.schedule.schedule_start}~{props.schedule.schedule_end}</dd>
                    <dt>????????????</dt>
                    <dd>{props.schedule.schedule_detail}</dd>
                    {userCtx.admin && (props.schedule.memberopen === 1) ? <dt>??????????????????????????????</dt> : <dt>?????????????????????????????????</dt>}
                </dl>
            </dd>

                <button className='btn mt-2' onClick={() => { setChange(true) }}>??????</button></>
            }




            {change && <form onSubmit={submitHandler}>
                {/* ?????????????????????????????????????????????????????????????????? */}
                <Input name="schedule" val={ScheduleState.inputs.schedule.value} type="text" labelName="??????" handler={inputHandler} />
                <Input type="select" name="type" val={ScheduleState.inputs.type.value} labelName="?????????" handler={inputHandler}>
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
                <Input type="select" name="startTime" val={ScheduleState.inputs.startTime.value} labelName="????????????" handler={inputHandler}>
                    <option value="">-</option>
                    {hours.map((hour) => {
                        return minutes.map((minute) => {
                            return (<option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>)
                        })
                    })}


                </Input>
                <Input type="select" name="endTime" val={ScheduleState.inputs.endTime.value} labelName="????????????" handler={inputHandler}>
                    <option value="">-</option>
                    {hours.map((hour) => {
                        return minutes.map((minute) => {
                            return (<option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>{`${hour}:${minute}`}</option>)
                        })
                    })}


                </Input>
                <Input type="textarea" name="scheduleDetail" val={ScheduleState.inputs.scheduleDetail.value} labelName="????????????" handler={inputHandler} />
                {userCtx.admin &&
                    <Input type="check" name="memberOpen" val={ScheduleState.inputs.memberOpen.value} handler={inputHandler} labelName="????????????????????????" />
                }
                <button className='btn mt-2'>??????</button>
                {ScheduleState.err && <p className="mt-6 text-red-400">{ScheduleState.err}</p>}


            </form>}

            {/* {state.err && <p className="mt-6 text-red-400">{state.err}</p>} */}


        </dl>
    )
}

export default ScheduleDetailInsert;


