import react, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContext } from "../context/notification-context";
import Modal from './UI/modal';
import NotificationDetail from './notificationDetail';
const Notification = (props) => {
    const NotificationCtx = useContext(NotificationContext);
    const [notificationdata, setNotificationdata] = useState("");
    return (
        <>
            <dl className='mb-4 max-h-40 overflow-y-auto'>
                {NotificationCtx.data && NotificationCtx.data.map((val) => {
                    return <div key={val.date}><dt>{val.date}</dt>
                        <dd><button className='underline text-blue-500' onClick={() => { setNotificationdata(val) }}>{val.title}</button></dd></div>
                })}

            </dl>
            <Modal show={notificationdata} delete={() => { setNotificationdata((val) => !val) }}>
                <NotificationDetail read={true} delete={() => { setNotificationdata((val) => !val) }} data={notificationdata} />
            </Modal>
        </>

    )
}

export default Notification
