import { CSSTransition } from 'react-transition-group'
const Modal = (props) => {
  return (<>
    <CSSTransition in={props.show ? true : false} unmountOnExit classNames="modal-fade"
      timeout={300}>

      <div onClick={props.delete} className='modal-bg rounded-sm fixed h-screen w-full z-10 right-0 top-0 bg-gray-900 bg-opacity-25'>
      </div>
    </CSSTransition>
    <CSSTransition in={props.show ? true : false} unmountOnExit classNames="modal-fade"
      timeout={200}>
      <div className='overflow-scroll p-8 h-4/5 w-3/4 bg-white right-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-20 shadow-xl'>
        <button onClick={props.delete} className='absolute top-8 right-8 rotate-45 shadow border bg-glay-100 border-gray-200 rounded-full w-10 h-10'>
          <span className='absolute block bg-yellow-500 w-6 h-1 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 '></span>
          <span className='absolute block bg-yellow-500 w-6 h-1 top-1/2 left-1/2 rotate-90 -translate-y-1/2 -translate-x-1/2 '></span>
        </button>
        {props.children}
      </div>
    </CSSTransition>

  </>
  )
}

export default Modal
