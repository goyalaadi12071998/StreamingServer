import React from 'react';
import ReactDOM from 'react-dom';
import history from '../History';

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()}className="ui standard modal visible active">
                <div className="header">
                    <h1>{props.title}</h1>
                </div>
                <div className="content">
                    <h3><strong>{props.content}</strong></h3>
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}
 
export default Modal;