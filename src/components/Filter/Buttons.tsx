import Button from "./Button";

interface Props {
    activeButton: string,
    setActiveButton: (button: string) => void
}

function Buttons({ activeButton, setActiveButton }: Props) {
    return (
        <nav>
            <ul>
                {["Галерея", "Шаблоны", "Фон"].map(button => (
                    <Button
                        key={button}
                        activeButton={activeButton}
                        setActiveButton={setActiveButton}>
                        {button}
                    </Button>
                ))}
            </ul>
        </nav>
    );
}

export default Buttons;