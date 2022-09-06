
import { useEffect } from 'react';
import { useReducer } from 'react';
import { validate } from '../../util/validate';

const reducer = (state, action) => {

    switch (action.type) {
        case 'change':
            let isvalid = true;
            let errMessage = '';
            if (action.validaters) {
                let validateResult = validate(action.val, action.validaters);
                isvalid = validateResult.isvalid;
                errMessage = validateResult.errMessage;
            };
            return {
                ...state,
                value: action.val,
                isValid: isvalid,
                errmessage: errMessage
            }
        case 'touch':
            return {
                ...state,
                touch: true
            };

        case 'registrationChange':
            return {
                ...state,
                value: action.value,
            };
        default:
            return { ...state };
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(reducer,
        {
            value: '',
            isValid: false,
            touch: false,
            errmessage: ''
        })
    useEffect(() => {
        props.handler(props.name, inputState.value, inputState.isValid)
    }, [inputState.value, inputState.isValid])

    useEffect(() => {
        if (props.val) {
            dispatch({
                type: 'registrationChange',
                value: props.val
            })
        }
    }, [])

    const errmessage = <>{inputState.errmessage && !inputState.isValid && inputState.touch && <p>{inputState.errmessage}</p>}</>

    if (props.type === "file") {
        return <div className=" mb-4">
            <label className="block  text-gray-900 " htmlFor="file_input">{props.labelName}</label>
            <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none " id="file_input" type="file" onBlur={() => dispatch({ type: 'touch' })} onChange={(e) => dispatch({ type: 'change', nameId: props.name, val: e.currentTarget.files[0], validaters: props.validate, })}
            />
            {errmessage}
        </div>

    }
    if (props.type === "check") {
        return (
            <div className="flex items-center mb-4">
                <input id={props.name} type="checkbox" onChange={(e) => dispatch({ type: 'change', nameId: props.name, val: !props.val, validaters: props.validate, })} value={inputState.value} className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 scale-150 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor={props.name} className="ml-4 text-gray-900">{props.labelName}</label>
            </div>


        )
    }
    if (props.type === "textarea") {
        return (
            <div className=" mb-4">
                <label htmlFor={props.name}>{props.labelName}</label>
                <textarea onBlur={() => dispatch({ type: 'touch' })} onChange={(e) => dispatch({ type: 'change', nameId: props.name, val: e.target.value, validaters: props.validate, })} value={inputState.value} className='w-full block border border-neutral-600 p-1 h-40 bg-slate-50' id={props.name} name={props.name} />
                {errmessage}
            </div>

        )
    }
    if (props.type === "select") {
        return (
            <div className=" mb-4">
                <label htmlFor={props.name}>{props.labelName}</label>

                <select onBlur={() => dispatch({ type: 'touch' })} onChange={(e) => dispatch({ type: 'change', nameId: props.name, val: e.target.value, validaters: props.validate, })} value={inputState.value} className='w-full block border border-neutral-500 rounded-sm bg-slate-50 p-1' id={props.name} name={props.name}  >
                    {props.children}
                </select>
                {errmessage}
            </div>
        )
    }
    return (
        <div className="mb-4">
            <label htmlFor={props.name}>{props.labelName}</label>
            <input onBlur={() => dispatch({ type: 'touch' })} onChange={(e) => dispatch({ type: 'change', nameId: props.name, val: e.target.value, validaters: props.validate, })} type={props.type} value={inputState.value} className='w-full block border border-neutral-500 rounded-sm bg-slate-50 p-1' id={props.name} name={props.name} />
            {errmessage}
        </div>


    )
}


export default Input;