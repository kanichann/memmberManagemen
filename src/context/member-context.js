import React, { createContext, useEffect } from "react";
import { useReducer } from "react";
import useReqestClient from '../hooks/requset-hook';


export const MemberInfomationContext = createContext({
    memberInfomation: null,
    setMemberInfomation: () => { },
    memberSort: () => { },
});



const memberReducer = (state, action) => {
    switch (action.type) {
        case 'memberInfomation':

            console.log({
                ...state,
                memberInfomation: action.val
            }, 'action');
            return {
                ...state,
                memberInfomation: action.val
            }
        default:
            return state;
    }
}


const MemberInfomationProvider = (props) => {
    const [memberInfomationState, dispatch] = useReducer(memberReducer, {
        memberInfomation: null,
        err: '',
        end: '',
        loading: '',
        isValid: false
    })
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();
    useEffect(() => {
        console.log('fetch')
        requestHandler('GET', "http://localhost:3002/all_member_info")
            .then(res => {
                console.log(res);

                dispatch({ type: 'memberInfomation', val: res });
            }).then(() => {

            })
    }, [])



    const setMemberInfomation = () => { };
    const memberSort = () => { };

    const CtxValue = { memberInfomation: memberInfomationState.memberInfomation, setMemberInfomation, memberSort };

    return (
        <MemberInfomationContext.Provider value={CtxValue}>
            {!memberInfomationState.memberInfomation && <RequestLoading />}
            {memberInfomationState.memberInfomation && props.children}
        </MemberInfomationContext.Provider>
    )
}

export default MemberInfomationProvider