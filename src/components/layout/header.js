import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user-context";

const Header = () => {
    const userCtx = useContext(UserContext)
    return (
        <header className="shadow-sm flex mb-6 justify-between items-center bg-white px-6 py-4">
            <p className=" text-xl ">KaniManegement</p>
            <ul className=" flex gap-6">
                {userCtx.token && <>
                    <li>
                        <Link to={'/'}>プロフィール</Link></li>
                    <li>
                        <Link to={'/personal_info'}>個人情報設定</Link></li>
                    <li><p onClick={userCtx.logout}>ログアウト</p></li>
                </>}
            </ul>
        </header>
    )
}

export default Header