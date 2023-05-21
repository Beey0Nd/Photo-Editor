import burger from "../../icons/dots.png";
import leftRight from "../../icons/left-and-right.png"
import classes from "./Header.module.scss"

function Header() {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <h1>Мой проект</h1>
                        <p>Размер 400x280мм (В развороте)</p>
                    </li>
                    <li>
                        <button>В корзину</button>
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
        </header>
    );  
}

export default Header;