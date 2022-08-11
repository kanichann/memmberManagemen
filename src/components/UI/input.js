
const Input = (props) => {
    return (
        <div className=" mb-4">
            <label htmlFor={props.name}>{props.labelName}</label>
            <input onChange={(e) => { props.handler(e) }} type={props.type} value={props.val} className='w-full block border border-neutral-500 rounded-sm bg-slate-50 p-1' id={props.name} name={props.name} />
        </div>


    )
}

export default Input
