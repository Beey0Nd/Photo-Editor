import burger from "../../icons/dots.png";
import leftRight from "../../icons/left-and-right.png"
import classes from "./Header.module.scss"
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import BasketContent from "../Modal/BasketContent";
import { Dispatch, SetStateAction } from "react";
import { IModal } from "../App/App";


interface Props {
    activeModal: IModal
    setActiveModal: Dispatch<SetStateAction<IModal>>
}

function Header({activeModal, setActiveModal}: Props) {

    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <h1>Мой проект</h1>
                        <p>Размер 400x280мм (В развороте)</p>
                    </li>
                    <li>
                        <button onClick={() => setActiveModal(
                            {
                                name: "header",
                                active: true
                            }
                        )}>В корзину</button>
                    </li>
                    <li>
                        <button><img src={burger} alt="Burger menu image" /></button>
                    </li>
                </ul>
            </nav>
            <div>
                <button>
                    <img src={leftRight} alt="Left and right button" />
                </button>
            </div>
            {activeModal.active && activeModal.name === "header" && createPortal(
                <Modal name="header" setActiveModal={setActiveModal}>
                    <BasketContent setActiveModal={setActiveModal}/>
                </Modal>, document.querySelector(".App") as Element
            )}
        </header>
    );
}

export default Header;