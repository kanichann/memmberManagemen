import React from 'react';

const Box = (props) => {

    return (
        <div className='shadow-sm h-full bg-white rounded-md p-6'>
            {props.children}
        </div>
    )
}

export default Box