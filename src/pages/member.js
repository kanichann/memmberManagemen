import React, { useContext } from "react";
import Box from "../components/UI/box";
import Calender from "../components/calender";
import { UserContext } from "../context/user-context";
import CalenderProvider from '../context/calender-context'
import Loading from "../components/UI/loading";
import Notification from "../components/notification";
import { Link } from "react-router-dom";
const Member = () => {
    const userCtx = useContext(UserContext);

    if (!userCtx.name) {
        return <Loading />
    }
    return (
        <CalenderProvider>
            <article className=" gap-4 grid grid-cols-4">
                <div className="col-span-full">
                    <Box>
                        <h1 className="ttl-1">会員ページ</h1>
                        <p>{userCtx.name}様</p>
                    </Box>
                </div>
                <section className="col-start-1 col-end-3">

                    <Box>
                        <h2 className="ttl-2">未読のお知らせ</h2>
                        <Notification />
                        <Link to='/notificationAll' className="btn">通知一覧</Link>
                    </Box>
                </section>
                <section className="col-start-3 col-end-5">
                    <Box>
                        <h2 className="ttl-2">重要なおしらせ</h2>
                        <ul>
                            <li>2021/05/31　年会費のお支払いは〇〇まででございます</li>
                        </ul>
                    </Box>
                </section>
                <section className="col-span-full">
                    <Box>
                        <h2 className="ttl-2">スケジュール</h2>
                        <Calender />

                    </Box>
                </section>
            </article>

        </CalenderProvider>
    )
}

export default Member 