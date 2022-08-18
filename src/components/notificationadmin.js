
import react, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContext } from "../context/notification-context";
import Modal from './UI/modal';
import NotificationDetail from './notificationDetail';
const NotificationAdmin = (props) => {
    const NotificationCtx = useContext(NotificationContext);
    const [notificationdata, setNotificationdata] = useState("");
    return (
        <>
            <dl className='mb-4'>
                {NotificationCtx.data && NotificationCtx.data.map((val) => {
                    return <div key={val.date}><dt>{val.date}</dt>
                        <dd><button className=' underline text-blue-500 ' onClick={() => { setNotificationdata(val) }}>{val.title}</button></dd></div>
                })}

            </dl>
            <Modal show={notificationdata} delete={() => { setNotificationdata((val) => !val) }}>
                <NotificationDetail delete={() => { setNotificationdata((val) => !val) }} data={notificationdata} />
            </Modal>
            {/* {notificationdata && <NotificationDetail read={true} delete={() => { setNotificationdata(null) }} data={notificationdata} />} */}
        </>

    )
}

export default NotificationAdmin
