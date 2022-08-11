
const SelectInput = (props) => {
    return (
        <div className=" mb-4">
            <label htmlFor={props.name}>{props.labelName}</label>
            {/* <input onChange={(e) => { props.handler(e) }} type="" value={props.val} className='w-full block border border-neutral-500 rounded-sm bg-slate-50 p-1' id={props.name} name={props.name} /> */}
            <select onChange={(e) => { props.handler(e) }} value={props.val} className='w-full block border border-neutral-500 rounded-sm bg-slate-50 p-1' id={props.nameid} name={props.nameid}  >
                {props.children}
            </select>
        </div>
    )
}

export default SelectInput
