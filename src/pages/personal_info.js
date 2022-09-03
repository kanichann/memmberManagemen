import React, { useContext, useEffect, useState } from "react";
import Box from "../components/UI/box";
import axios from 'axios'
import Calender from "../components/calender";
import { UserContext } from "../context/user-context";
import CalenderProvider from '../context/calender-context'
import Loading from "../components/UI/loading";
import Notification from "../components/notification";
import Button from "../components/UI/button";
const PersonalInfo = () => {
    const userCtx = useContext(UserContext);
    return (
        <article className=" gap-4 grid grid-cols-4">
            <div className="col-span-full">
                <Box>
                    <h1 className="ttl-1">個人情報の変更</h1>

                    <ul>

                        <li><Button className="btn_list" to='/personarl_info/info_list_address'>

                            住所
                        </Button>
                        </li>
                        <li>
                            <Button className="btn_list" to='/personarl_info/info_list_email'>
                                Email
                            </Button>
                        </li>

                    </ul>


                </Box>
            </div>

        </article>
    )
}

export default PersonalInfo