import React, { useContext,useEffect,useState } from "react";
import Box from "../components/UI/box";
import axios from 'axios'
import Calender from "../components/calender";
import { UserContext } from "../context/user-context";
import CalenderProvider from '../context/calender-context'
import Loading from "../components/UI/loading";
import Notification from "../components/notification";
import { Link } from "react-router-dom";
const PersonalInfo = () => {
    const userCtx = useContext(UserContext);
     useEffect(() => {
         setLoad(true);
            axios.get("http://localhost:3002/personal_info",
                {
                    headers:
                        { Authorization: "Bearer " + userCtx.token },
                }
                // axios.get("http://localhost:3002/memberinfo",
                //     {
                //         headers:
                //             { Authorization: "Bearer " + token },
                //     }
            ).then((res) => {
              setAddress(res.data.address);
              setBirth(res.data.birth);
            }).catch((err) => {
               //modalでこんてきすとをつくりとばす
               return 
            }).finally(
                setLoad(false)
            )

        
    }, [])
    
    const [address,setAddress] = useState('')
    const [birth,setBirth] = useState('')
    const [load,setLoad] = useState(true)
    

   
    return (
        <CalenderProvider>
            <article className=" gap-4 grid grid-cols-4">
                <div className="col-span-full">
                    <Box>
                        <h1 className="ttl-1">個人情報の変更</h1>
                        { (!userCtx.name || load) ? <Loading /> :<>
                        <p>{userCtx.name}様</p>
                        <dl>
                            <dt>生年月日</dt>
                            <dd>{birth}</dd>
                            <dt>住所</dt>
                            <dd>{address}</dd>
                            <dt>
                                {userCtx.email}
                            </dt>
                            <dd></dd>
                        </dl>
                        <p className="mt-8 text-right"><Link to="/change_profile" className=" btn">会員情報を変更する</Link></p>
</>
                        }
                    </Box>
                </div>

            </article>

        </CalenderProvider >
    )
}

export default PersonalInfo