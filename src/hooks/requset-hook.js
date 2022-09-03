import { useReducer, useCallback } from 'react';
import axios from 'axios';
import { UserContext } from "../context/user-context";
import Loading from '../components/UI/loading';
import { useContext } from 'react';

const requestReducer = (state, action) => {
    switch (action.type) {
        case 'err':
            return { ...state, err: action.value };
        case 'loading':
            return { ...state, loading: action.value };
        case 'res':
            return { ...state, res: action.value }
        default:
            return state;
    }

}

const useReqestClient = () => {
    const userCtx = useContext(UserContext);
    const [requestState, dispatch] = useReducer(requestReducer, {
        err: '',
        loading: false,
        res: {},
    })

    const requestHandler = useCallback(async (method = 'GET', URL, data, headers = {
        Authorization: "Bearer " + userCtx.token
    }) => {
        dispatch({ type: "loading", value: true })
        dispatch({ type: "err", value: null });
        console.log("submit")
        let response = false;
        await axios({
            method: method,
            url: URL,
            data: data,
            headers: headers
        }).then((res) => {
            dispatch({ type: "loading", value: false });
            console.log(res);
            response = res.data
            // dispatch({ type: 'res', value: res.data });
        }
        ).catch((err) => {
            dispatch({ type: "loading", value: false })
            dispatch({ type: "err", value: err.response.data.msg || "エラーが発生しました。" });
            throw err
        })
        return response;


    })
    const clearErr = () => {
        dispatch({ type: "err", value: '' });
    }
    const RequestLoading = () => requestState.loading && <Loading />;
    const RequestErr = () => {
        return requestState.err && <p className="mt-6 text-red-400">{requestState.err}</p>
    }


    return { requestHandler, clearErr, RequestLoading: RequestLoading, RequestErr: RequestErr }

}

export default useReqestClient