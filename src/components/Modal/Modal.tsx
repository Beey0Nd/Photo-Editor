import { Dispatch } from "react";
import classes from "./Modal.module.scss"
import close from "../../icons/close.png"

interface Props {
    setActiveModal: Dispatch<React.SetStateAction<boolean>>
}

function Modal({ setActiveModal }: Props) {
    const handleClick = () => setActiveModal(false)

    return (
        <div className={classes.modal} onClick={handleClick}>
            <div
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={classes.close}
                    onClick={handleClick}>
                    <img src={close} alt="Close button" />
                </button>
                <p>
                    Продукт успешно добавлен в корзину
                </p>
                <button
                    className={classes.garbage}
                    onClick={handleClick}>
                    Перейти в корзину
                </button>
            </div>
        </div>
    );
}

export default Modal;