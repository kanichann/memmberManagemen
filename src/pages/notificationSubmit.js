
import React, { useContext, useReducer, useCallback } from "react";
import Box from "../components/UI/box";
import { UserContext } from "../context/user-context";
import Loading from "../components/UI/loading";
import Input from '../components/UI/input'
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
        case 'loading':
            return {
                ...state,
                lading: action.val
            }
        case 'end':
            return {
                ...state,
                end: action.val
            }
        default:
            return state;
    }

}



const NotificationSubmit = () => {
    const userCtx = useContext(UserContext);
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();
    const [noatificationState, dispatch] = useReducer(inputReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false,
            },
            contents: {
                value: '',
                isValid: false,
            },
            type: {
                value: '',
                isValid: false,
            },
            pdf: {
                value: '',
                isValid: false,
            },
            pdfname: {
                value: '',
                isValid: false,
            },

        },
        err: '',
        end: '',
        loading: '',
        isValid: false
    })

    const inputHandler = useCallback((inputId, val, isValid) => {
        console.log(inputId);
        return dispatch({ inputId: inputId, type: 'change', val: val, isValid: isValid })
    }, [])



    async function submitHandler(event) {
        event.preventDefault();
        dispatch({
            type: "err",
            val: '',
        });
        dispatch({
            type: 'loading',
            val: true
        })
        const data = new FormData()

        data.append("title", noatificationState.inputs.title.value);
        data.append("contents", noatificationState.inputs.contents.value);
        data.append("type", +noatificationState.inputs.type.value);
        data.append("file", noatificationState.inputs.pdf.value);
        data.append("pdfname", noatificationState.inputs.pdfname.value);


        await requestHandler('POST', 'http://localhost:3002/notification/set', data, {
            Authorization: "Bearer " + userCtx.token,
            'content-type': 'multipart/form-data',
        }
        ).then(res => {
            console.log(res, 'schedule更新');
            dispatch({ type: 'end', val: true })
        }).catch(err => {
            console.log(err);

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
                        <Input name="title" type="text" labelName="件名" handler={inputHandler} />
                        <Input type="select" name="type" labelName="タイプ" handler={inputHandler}>
                            <option value="0">
                                お知らせ
                            </option>
                            <option value="1">
                                重要
                            </option>
                            <option value="2">
                                大会情報
                            </option>
                        </Input>
                        <Input type="textarea" name="contents" labelName="内容" handler={inputHandler} />
                        <Input labelName="PDFアップロード" type="file" name="pdf" handler={inputHandler} />
                        <Input name="pdfname" type="text" labelName="PDFのタイトル" handler={inputHandler} />


                        <button className='btn mt-2'>送信</button>
                        <RequestLoading />
                        <RequestErr />
                        {noatificationState.end && <p>通知を送信いたしました。</p>}


                    </form>
                </Box>
            </div>

        </article>
    )
}

export default NotificationSubmit