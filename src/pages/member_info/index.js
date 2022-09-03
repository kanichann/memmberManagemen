import React, { useContext, useEffect, useState } from "react";
import Box from "../../components/UI/box";
import Button from "../../components/UI/button";
import { UserContext } from "../../context/user-context";
import useReqestClient from '../../hooks/requset-hook';
import Table from "../../components/UI/table";
const MemberInfo = () => {
    const userCtx = useContext(UserContext);
    const { requestHandler, RequestLoading, RequestErr } = useReqestClient();
    const [memberState, setMemberState] = useState('');

    useEffect(() => {
        requestHandler('GET', "http://localhost:3002/all_member_info")
            .then(res => {
                console.log(res);
                setMemberState(res);
            })
    }, [])

    return (
        <article className=" gap-4 grid grid-cols-4">
            <div className="col-span-full">
                <Box>
                    <h1 className="ttl-1">会員情報</h1>

                    {!memberState && <RequestLoading />}
                    {memberState && <>
                        <Table titles={memberState.titles} data={memberState.data} />
                        <Button href='http://localhost:3002/get_member_csv'>会員情報ダウンロード</Button></>

                    }


                </Box>
            </div>

        </article>
    )
}

export default MemberInfo