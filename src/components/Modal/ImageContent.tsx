import { Dispatch } from "react";
import close from "../../icons/close.png"
import { IModal } from "../App/App";

interface Props {
    src: string,
    setActiveModal: Dispatch<React.SetStateAction<IModal>>
}

function ImageContent({ src, setActiveModal }: Props) {
    const handleClick = () => setActiveModal({
        name: "",
        active: false
    })
    return (
        <>
            <button
                onClick={handleClick}>
                <img src={close} alt="Close button" />
            </button>
            <img src={src} alt={"Abstract image"} />
        </>
    );
}

export default ImageContent;