
const TextInput = (props) => {
    return (
        <div className=" mb-4">
            <label htmlFor={props.name}>{props.labelName}</label>
            <textarea onChange={(e) => { props.handler(e) }} value={props.val} className='w-full block border border-neutral-600 p-1 h-40 bg-slate-50' id={props.name} name={props.name} />
        </div>


    )
}

export default TextInput
