import { Dispatch, useEffect } from "react";
import classes from "./Modal.module.scss"
import { IModal } from "../App/App";

interface Props {
    setActiveModal: Dispatch<React.SetStateAction<IModal>>,
    name: string,
    children: React.ReactNode
}

function Modal({ setActiveModal, name, children }: Props) {
    useEffect(() => {
        const body = document.querySelector("body") as HTMLBodyElement

        body.style.position = "fixed"

        return () => {
            body.style.position = "static" 
        }
    }, [])

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