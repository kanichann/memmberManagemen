import React from 'react';
import Header from './header';
import Footer from './footer';
const Layout = (props) => {

    return (
        <React.Fragment>
            <Header />
            <main className='mb-4 px-4 w-full flex-1 min-h-max'>
                {props.children}
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Layout;