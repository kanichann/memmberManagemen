import React, { useContext } from "react";
import Box from "../../components/UI/box";
import { UserContext } from "../../context/user-context";
import Loading from "../../components/UI/loading";
import Button from "../../components/UI/button";

const ChangeProfile = () => {

    const userCtx = useContext(UserContext);

    if (!userCtx.name) {
        return <Loading />
    }
    return (
        <article className=" gap-4 grid grid-cols-4">
            <div className="col-span-full">
                <Box>
                    <h1 className="ttl-1">個人情報の変更</h1>
                    <form>
                        <dt>住所</dt>
                        <dd></dd>
                        <dt>
                            メールアドレス
                        </dt>
                        <dd></dd>
                    </form>
                    <p className="mt-8 text-right"><Button to="/change_profile">会員情報を変更する</Button></p>
                </Box>
            </div>

        </article>

    )
}

export default ChangeProfile