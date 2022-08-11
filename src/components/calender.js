import React, { useState } from "react";
import CalendarCell from "./calenderCell";
import style from './calender.module.scss'
const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();



const Calender = () => {
    // const [count, setCount] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())
    // let year = new Date().getFullYear();
    // let month = new Date().getMonth();

    let startDayOfWeek = new Date(year, month, 1).getDay();
    let endDate = new Date(year, month + 1, 0).getDate();
    let lastMonthEndDate = new Date(year, month, 0).getDate();
    let row = Math.ceil((startDayOfWeek + endDate) / week.length);;
    // console.log(startDayOfWeek, 'startDayOfWeek')
    // console.log(endDate, 'endDate ')
    // console.log(lastMonthEndDate, 'lastMonthEndDate')
    // console.log(row, 'row');

    let showDate = new Date(today.getFullYear(), today.getMonth(), 1);
    console.log(showDate);
    // calendar作成

    function prevMonth() {
        if (month === 0) {
            setMonth(11);
            setYear(val => val - 1);
        } else {
            setMonth(val => val - 1)
        }
    }
    function nextMonth() {
        if (month === 11) {
            setMonth(0);
            setYear(val => val + 1);
        } else {
            setMonth(val => val + 1)
        }
    }



    return (
        <>
            <h2 className="ttl-2">{year}年{month + 1}月</h2>
            <div className=" flex gap-8 mb-4">
                <button className={style.button} onClick={() => prevMonth()}>‹</button>
                <button className={style.button} onClick={() => nextMonth()}>›</button>
            </div>

            <table className={style.schedule}>
                <tbody>
                    <tr>
                        {(() => {
                            let weektitle = [];
                            for (let i = 0; i < week.length; i++) {
                                weektitle.push(<th key={week[i]} > {week[i]} </th>);
                            }
                            return weektitle;
                        })()}
                    </tr>

                    {(() => {
                        let schedule = []
                        let count = 0;
                        for (let i = 0; i < row; i++) {
                            let scheduleData = [];

                            for (let j = 0; j < week.length; j++) {
                                if (i === 0 && j < startDayOfWeek) {
                                    // 1行目で1日まで先月の日付を設定
                                    scheduleData.push(<td key={lastMonthEndDate - startDayOfWeek + j + 1} className={style.diff}> {lastMonthEndDate - startDayOfWeek + j + 1} </td>)
                                } else if (count >= endDate) {
                                    // 最終行で最終日以降、翌月の日付を設定
                                    count++;
                                    scheduleData.push(<td key={(count - endDate)} className={style.diff}>{(count - endDate)}</td>)
                                } else {
                                    // 当月の日付を曜日に照らし合わせて設定
                                    count++;
                                    if (year === today.getFullYear()
                                        && month === (today.getMonth())
                                        && count === today.getDate()) {
                                        scheduleData.push(<CalendarCell key={`${year}年${month + 1}月${count}`} scheduleDate={`${year}年${month + 1}月${count}日（${week[j % 7]}）`} scheduleDataNum={year + '' + month + 1 + '' + count} date={count} highLight={true} className=' bg-amber-300' ></CalendarCell>);
                                    } else {
                                        scheduleData.push(<CalendarCell key={`${year}年${month + 1}月${count}`} scheduleDate={`${year}年${month}月${count}日（${week[j % 7]}）`} date={count} scheduleDataNum={year + '' + month + 1 + '' + count} ></CalendarCell>);
                                    }
                                }
                            }


                            schedule.push(<tr key={i}>{scheduleData}</tr>);
                        }
                        return schedule;
                    }
                    )()}
                </tbody>
            </table>
        </>
    )


}

export default Calender;