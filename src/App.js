
import './lib/css/tailwind.css';
import './lib/css/animation.css';
import './app.scss';
import { useLocation } from 'react-router';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from './components/layout/layout';
import Member from './pages/member';
import Login from './pages/login';
import Admin from './pages/admin';
import NotificationSubmit from './pages/notificationSubmit';
import NotificationAll from './pages/notificationAll';
import PersonalInfo from './pages/personal_info'
import ChangeProfile from './pages/change_profile'
import UserProvider, { UserContext } from './context/user-context';
import Register from './pages/register';
import { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// import { animated, useTransition, config } from 'react-spring';



function App() {
  const location = useLocation()
  const userCtx = useContext(UserContext);
  const timeout = { enter: 1000, exit: 1000 };
  // const transitions = useTransition(location, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },

  //   delay: 0,
  //   config: { tension: 100, friction: 30 }
  // })



  return (



    <Layout>

      <TransitionGroup comoponent={null}>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={400}
        >

          <Routes location={location}>
            {!userCtx.token && (
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route path='*' element={<Navigate to="/login" />} />
              </>
            )
            }


            {userCtx.token && (<>

              <Route path='/notificationSubmit' element={<NotificationSubmit />} />
              <Route path='/notificationAll' element={<NotificationAll />} />

            </>
            )
            }
            {userCtx.token && !userCtx.admin && (<>
              <Route path='/' element={<Member />} />
              <Route path='/personal_info' element={<PersonalInfo />} />
              <Route path='/change_profile' element={<ChangeProfile />} />
              <Route path='*' element={<Navigate to="/" />} />
            </>
            )
            }
            {userCtx.token && userCtx.admin && (<>
              <Route path='/admin' element={<Admin />} />
              <Route path='*' element={<Navigate to="/admin" />} />
            </>
            )
            }
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Layout>

  );
}

export default App;
