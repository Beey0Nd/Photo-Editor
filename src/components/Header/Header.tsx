import { useState } from "react";
import burger from "../../icons/dots.png";
import leftRight from "../../icons/left-and-right.png"
import classes from "./Header.module.scss"
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";

type State = boolean

function Header() {
    const [activeModal, setActiveModal] = useState<State>(false)

    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <h1>Мой проект</h1>
                        <p>Размер 400x280мм (В развороте)</p>
                    </li>
                    <li>
                        <button onClick={() => setActiveModal(true)}>В корзину</button>
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
            {activeModal && createPortal(
                <Modal setActiveModal={setActiveModal} />, document.querySelector(".App") as Element
            )}
        </header>
    );
}

export default Header;