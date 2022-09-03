import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "../components/UI/box";
import Calender from "../components/calender";
import { UserContext } from "../context/user-context";
import CalenderProvider from '../context/calender-context'
import Loading from "../components/UI/loading";
import NotificationAdmin from '../components/notificationadmin'
import Button from "../components/UI/button";
const Admin = () => {
    const userCtx = useContext(UserContext);

    if (!userCtx.name) {
        <Loading />
    }
    return (
        <CalenderProvider>
            <article className=" gap-4 grid grid-cols-4">
                <div className="col-span-full">
                    <Box>
                        <h1 className="ttl-1">管理者ページ</h1>
                        <p>{userCtx.name}様</p>

                    </Box>
                </div>
                <section className="col-start-1 col-end-3">
                    <Box>
                        <h2 className="ttl-2">会員情報一覧</h2>
                        <Button to="/memberSummary">一覧を見る</Button>
                    </Box>
                </section>
                <section className="col-start-3 col-end-5">
                    <Box>
                        <h2 className="ttl-2">入会リクエスト通知</h2>
                        <ul>
                            <li>○○様</li>
                            <li>○○様</li>
                            <li>○○様</li>
                        </ul>
                    </Box>
                </section>
                <section className="col-start-1 col-end-3">
                    <Box>
                        <h2 className="ttl-2">会員通知</h2>
                        <Link to="/notificationSubmit" className="btn">会員に通知を送る</Link>

                    </Box>
                </section>
                <section className="col-start-3 col-end-5">
                    <Box>
                        <h2 className="ttl-2">お知らせ</h2>
                        <NotificationAdmin />
                        <Link to='/notificationAll' className="btn">一覧をみる</Link>
                    </Box>
                </section>
                <section className="col-span-full">
                    <Box>
                        <h2 className="ttl-2">スケジュール</h2>
                        <p><button>スケジュール登録</button></p>
                        <Calender />
                    </Box>
                </section>
            </article>

        </CalenderProvider>
    )
}

export default Admin