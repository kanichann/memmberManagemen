
const CheckInput = (props) => {
    return (
        <div className="flex items-center mb-4">
            <input id={props.name} type="checkbox" onChange={() => { props.handler() }} value={props.val} className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 scale-150 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor={props.name} className="ml-4 text-gray-900">{props.children}</label>
        </div>


    )
}

export default CheckInput
