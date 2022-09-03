import React from "react";
const Table = (props) => {

    return (
        <table className=" mb-8">
            <thead>
                <tr>
                    {props.titles.map(title => {
                        return <th key={title} className=" py-2 px-4 bg-gray-100 font-normal border">{title}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.map(arry => {
                    const td = Object.keys(arry).map((val) => {
                        return <td key={arry.email + val} className=" py-2 px-4 border">{arry[val]}</td>
                    })
                    return <tr key={arry.email} >{td}</tr>
                })}
            </tbody>
        </table>
    )
}

export default Table