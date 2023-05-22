import { useRef } from "react";
import classes from "./Filter.module.scss"

interface Props {
    activeButton: string,
    children: React.ReactNode,
    setActiveButton: (button: string) => void
}

function Button({ children, activeButton, setActiveButton }: Props) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        setActiveButton(buttonRef.current!.innerText)
    }

    return (
        <li>
            <button
                ref={buttonRef}
                onClick={handleClick}
                className={activeButton === children ? classes.button : classes.inactive}>
                {children}
            </button>
        </li>
    );
}

export default Button;