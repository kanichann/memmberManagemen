import React, { useContext, useState } from 'react';
import { CalenderContext } from '../context/calender-context';
const CalendarCell = (props) => {
    const calenderCtx = useContext(CalenderContext)


    const scheduleBox_glay = "block text-left w-full shadow-sm text-xs border border-gray-200 bg-gray-50 overflow-hidden px-1"
    const scheduleBox_red = "block text-left w-full shadow-sm text-xs border border-gray-200 bg-red-100 overflow-hidden px-1"
    const scheduleBox_green = "block text-left w-full shadow-sm text-xs border border-gray-200 bg-green-100 overflow-hidden px-1"

    return (
        <>
            <td className={props.highLight && "bg-amber-300"}>
                <div className='h-full w-full block'>
                    <div>
                        {props.date}
                    </div>
                    <a onClick={() => { props.setDetailInsertShow((val) => !val) }} className='cursor-pointer flex justify-between gap-x-0.5 p-1 bg-slate-100 shadow'>
                        <p className='text-xs'>スケジュール登録</p>
                        <div className=' relative shadow border bg-white border-gray-200 rounded-full w-4 h-4'>
                            <span className='absolute block bg-yellow-500 w-3 h-0.5 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 '></span>
                            <span className='absolute block bg-yellow-500 w-3 h-0.5 top-1/2 left-1/2 rotate-90 -translate-y-1/2 -translate-x-1/2 '></span>
                        </div>
                    </a>
                    <div>
                        {calenderCtx.date.length !== 0 && calenderCtx.date.map((day) => {

                            if (day.schedule_date === +props.scheduleDataNum) {
                                return <button className="" onClick={() => props.setDetailShow(day)} className={day.schedule_type === 1 ? scheduleBox_red : day.schedule_type === 2 ? scheduleBox_green : scheduleBox_glay}>{day.schedule}</button>
                            }
                        })}
                    </div>
                    {props.highLight && <div>today</div>}
                </div>
                {props.children}
            </td>
        </>
    )
}

export default CalendarCell;