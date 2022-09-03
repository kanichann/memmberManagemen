import React, { useContext } from "react";
import Box from "../../components/UI/box";
import Calender from "../../components/calender";
import { UserContext } from "../../context/user-context";
import CalenderProvider from '../../context/calender-context'
import Loading from "../../components/UI/loading";
import Notification from "../../components/notification";
import Button from "../../components/UI/button";
import useReqestClient from '../../hooks/requset-hook'

// このへんやる
// const inputReducer = (state, action) => {

//     switch (action.type) {
//         case 'change':
//             let formIsValid = true;
//             for (const inputId in state.inputs) {
//                 if (inputId === action.inputId) {
//                     formIsValid = formIsValid && action.isValid
//                 }
//                 else {
//                     formIsValid = formIsValid && state.inputs[inputId].isValid
//                 }
//             }
//             return {
//                 ...state,
//                 inputs: {
//                     ...state.inputs,
//                     [action.inputId]: { value: action.val, isValid: action.isValid },
//                 },
//                 isValid: formIsValid
//             };
//         case 'err':
//             return {
//                 ...state,
//                 err: action.val
//             }
//         default:
//             return state;
//     }
// }
const ChangeProfile = () => {
    // const [userState, dispatch] = useReducer(inputReducer,
    //     {
    //         inputs: {
    //             pass: {
    //                 value: '',
    //                 isValid: false
    //             },
    //             email: {
    //                 value: '',
    //                 isValid: false
    //             }

    //         },
    //         err: '',
    //         isValid: false
    //     }
    // )
    const userCtx = useContext(UserContext);

    if (!userCtx.name) {
        return <Loading />
    }
    return (
        <article className=" gap-4 grid grid-cols-4">
            <div className="col-span-full">
                <Box>
                    <h1 className="ttl-1">個人情報の変更</h1>
                    <form>
                        {/* <Input name="birth" validate={[VALIDATOR_REQUIRE()]} type="date" labelName="生年月日" handler={inputHandler} />
                        <Input name="address" validate={[VALIDATOR_REQUIRE()]} type="date" labelName="生年月日" handler={inputHandler} /> */}
                        <dt>住所</dt>
                        <dd></dd>
                        <dt>
                            メールアドレス
                        </dt>
                        <dd></dd>
                    </form>
                    <p className="mt-8 text-right"><Button to="/change_profile">会員情報を変更する</Button></p>
                </Box>
            </div>

        </article>

    )
}

export default ChangeProfile