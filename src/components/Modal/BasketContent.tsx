import { Dispatch } from "react";
import close from "../../icons/close.png"

import classes from "./Modal.module.scss"
import { IModal } from "../App/App";

interface Props {
    setActiveModal: Dispatch<React.SetStateAction<IModal>>
}

function BasketContent({ setActiveModal }: Props) {
    const handleClick = () => setActiveModal({
        name: "",
        active: false
    })

    return (
        <>
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
        </>
    );
}

export default BasketContent;