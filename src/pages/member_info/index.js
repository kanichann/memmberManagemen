import React, { useContext, useEffect, useState } from "react";
import Box from "../../components/UI/box";
import Button from "../../components/UI/button";
import { MemberInfomationContext } from "../../context/member-context";
import Table from "../../components/UI/table";
const MemberInfo = () => {
    const MemberInfoCtx = useContext(MemberInfomationContext);
    return (
        <article className=" gap-4 grid grid-cols-4">
            <div className="col-span-full">
                <Box>
                    <h1 className="ttl-1">会員情報</h1>

                    {MemberInfoCtx.memberInfomation && <>
                        <Table titles={MemberInfoCtx.memberInfomation.titles} data={MemberInfoCtx.memberInfomation.data} />
                        <Button href='http://localhost:3002/get_member_csv'>会員情報ダウンロード</Button>

                    </>

                    }
                </Box>
            </div>

        </article>
    )
}

export default MemberInfo