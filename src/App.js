
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
import ChangeProfile from './pages/personal_info/change_profile'
import UserProvider, { UserContext } from './context/user-context';
import Register from './pages/register';
// import memberSummary from './pages/memberSmummary';
import { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import InfoChangeEmail from './pages/personal_info/info_change_email'
import InfoListEmail from './pages/personal_info/info_list_email'
import InfoChangeAddress from './pages/personal_info/info_change_address'
import InfoListAddress from './pages/personal_info/info_list_address'
import MemberInfo from './pages/member_info';
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


            {userCtx.token && userCtx.admin !== null && (<>

              <Route path='/notificationSubmit' element={<NotificationSubmit />} />
              <Route path='/notificationAll' element={<NotificationAll />} />
              <Route path='/notificationAll' element={<NotificationAll />} />
              <Route path='/personarl_info/info_change_email/' element={<InfoChangeEmail />} />
              <Route path='/personarl_info/info_change_email/:userEmail' element={<InfoChangeEmail />} />
              <Route path='/personarl_info/info_list_email' element={<InfoListEmail />} />
              <Route path='/personarl_info/info_change_address' element={<InfoChangeAddress />} />
              <Route path='/personarl_info/info_change_address/:userAddress' element={<InfoChangeAddress />} />
              <Route path='/personarl_info/info_list_address' element={<InfoListAddress />} />

            </>
            )
            }
            {userCtx.token && userCtx.admin !== null && !userCtx.admin && (<>
              <Route path='/' element={<Member />} />
              <Route path='/personal_info' element={<PersonalInfo />} />
              <Route path='/change_profile' element={<ChangeProfile />} />
              <Route path='*' element={<Navigate to="/" />} />
            </>
            )
            }
            {userCtx.token && userCtx.admin !== null && userCtx.admin && (<>
              <Route path='/admin' element={<Admin />} />
              <Route path='/MemberInfo/' element={<MemberInfo />} />
              {/* <Route path='/memberSummary' element={<MemberSummary />} /> */}
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
