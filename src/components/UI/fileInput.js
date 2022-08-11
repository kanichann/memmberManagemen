
const FileInput = (props) => {
    return (
        <div className=" mb-4">
            <label className="block  text-gray-900 " htmlFor="file_input">{props.labelName}</label>
            <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none " id="file_input" type="file" onChange={(e) => { props.handler(e.currentTarget.files[0]) }} />
        </div>


    )
}

export default FileInput
