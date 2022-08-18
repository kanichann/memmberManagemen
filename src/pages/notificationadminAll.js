import react, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContext } from "../context/notification-context";
import Modal from '../components/UI/modal';
import Box from '../components/UI/box';
import NotificationDetail from '../components/notificationDetail';
import Loading from '../components/UI/loading';
const Notification = (props) => {
    const NotificationCtx = useContext(NotificationContext);
    const [notificationdata, setNotificationdata] = useState("");
    useEffect(() => {
        console.log('getAll');
        NotificationCtx.setdataAll();
    }, [])
    if (!NotificationCtx.dataAll) {
        return <Loading />
    }
    return (

        <article className=" gap-4 grid grid-cols-4">

            <div className="col-span-full">
                <Box>
                    <h1 className='ttl-1'>通知一覧</h1>
                    <dl className='mb-4'>
                        {NotificationCtx.dataAll && NotificationCtx.dataAll.map((val) => {
                            return <><dt>{val.date}</dt>
                                <dd><button className=' underline text-blue-500 ' onClick={() => { setNotificationdata(val) }}>{val.title}</button></dd></>
                        })}

                    </dl>
                    <Modal show={notificationdata} delete={() => { setNotificationdata((val) => !val) }}>
                        <NotificationDetail delete={() => { setNotificationdata((val) => !val) }} data={notificationdata} />
                    </Modal>
                    {/* {notificationdata && <NotificationDetail delete={() => { setNotificationdata(null) }} data={notificationdata} />} */}
                </Box>
            </div>
        </article>


    )
}

export default Notification
