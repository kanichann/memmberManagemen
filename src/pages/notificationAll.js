import react, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { NotificationContext } from "../context/notification-context";
import Modal from '../components/UI/modal';
import Box from '../components/UI/box';
import NotificationDetail from '../components/notificationDetail';
import Loading from '../components/UI/loading';
import Notification from '../components/notification';
import { UserContext } from '../context/user-context';
const NotificationAll = (props) => {
    const userCtx = useContext(UserContext);
    const NotificationCtx = useContext(NotificationContext);
    const [notificationdata, setNotificationdata] = useState("");


    useEffect(() => {
        NotificationCtx.setnotRead();
    }, [])
    if (!NotificationCtx.notRead) {
        return <Loading />
    }
    return (

        <article className=" gap-4 grid grid-cols-4">
            {userCtx.admin !== null && !userCtx.admin &&
                <div className="col-span-full">
                    <Box>
                        <h1 className='ttl-1'>未読一覧</h1>
                        <Notification />
                    </Box>
                </div>
            }
            <div className="col-span-full">
                <Box>
                    <h1 className='ttl-1'>通知一覧</h1>
                    <dl className='mb-4'>
                        {NotificationCtx.notRead && NotificationCtx.notRead.map((val) => {
                            return <><dt>{val.date}</dt>
                                <dd><button className=' underline text-blue-500 ' onClick={() => { setNotificationdata(val) }}>{val.title}</button></dd></>
                        })}

                    </dl>
                    <Modal show={notificationdata} delete={() => { setNotificationdata((val) => !val) }}>
                        <NotificationDetail delete={() => { setNotificationdata((val) => !val) }} data={notificationdata} />
                    </Modal>
                </Box>
            </div>
        </article>


    )
}

export default NotificationAll
