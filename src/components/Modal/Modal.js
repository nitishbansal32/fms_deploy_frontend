import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import styles from "./Modal.module.css";

const Modal = (props) => {
    const { modal, setModal, msg, setMsg } = useContext(UserContext);
    const modalButtonHandler = () => {
        setModal(false);
    };
    console.log(modal);
    return (
        <div className={styles.modal}>
            {modal && (
                <div>
                    <h1>{msg}</h1>
                    <button onClick={modalButtonHandler}>Okay</button>
                </div>
            )}
        </div>
    );
};

export default Modal;
