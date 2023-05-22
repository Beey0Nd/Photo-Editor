import { Dispatch } from "react";
import classes from "./Modal.module.scss"
import { IModal } from "../App/App";

interface Props {
    setActiveModal: Dispatch<React.SetStateAction<IModal>>,
    name: string,
    children: React.ReactNode
}

function Modal({ setActiveModal, name, children }: Props) {
    const handleClick = () => setActiveModal({
        name: "",
        active: false
    })

    return (
        <div className={classes.modal} onClick={handleClick}>
            <div className={classes[name]}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;