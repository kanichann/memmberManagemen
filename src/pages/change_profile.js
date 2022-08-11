import React, { useContext } from "react";
import Box from "../components/UI/box";
import Calender from "../components/calender";
import { UserContext } from "../context/user-context";
import CalenderProvider from '../context/calender-context'
import Loading from "../components/UI/loading";
import Notification from "../components/notification";
import { Link } from "react-router-dom";
const ChangeProfile = () => {
    const userCtx = useContext(UserContext);

    if (!userCtx.name) {
        return <Loading />
    }
    return (
        <CalenderProvider>
            <article className=" gap-4 grid grid-cols-4">
                <div className="col-span-full">
                    <Box>
                        <h1 className="ttl-1">個人情報の変更</h1>
                        <p>{userCtx.name}様</p>
                        <dl>
                            <dt>生年月日</dt>
                            <dd></dd>
                            <dt>住所</dt>
                            <dd></dd>
                            <dt>
                                メールアドレス
                            </dt>
                            <dd></dd>
                        </dl>
                        <p className="mt-8 text-right"><Link to="/change_profile" className=" btn">会員情報を変更する</Link></p>
                    </Box>
                </div>

            </article>

        </CalenderProvider >
    )
}

export default ChangeProfile