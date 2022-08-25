import { useReducer, useCallback } from 'react';
import axios from 'axios';
import Loading from '../components/UI/loading';

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
    const [requestState, dispatch] = useReducer(requestReducer, {
        err: '',
        loading: false,
        res: {},
    })

    const requestHandler = useCallback(async (method = 'GET', URL, data, headers = {}) => {
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
            console.log(res.data);
            response = res.data
            // dispatch({ type: 'res', value: res.data });
        }
        ).catch((err) => {
            console.log(err, 'errrrrrr');
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
        console.log(requestState.err)
        return requestState.err && <p className="mt-6 text-red-400">{requestState.err}</p>
    }


    return { requestHandler, clearErr, RequestLoading: RequestLoading, RequestErr: RequestErr }

}

export default useReqestClient