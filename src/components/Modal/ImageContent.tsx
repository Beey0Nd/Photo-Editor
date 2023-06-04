import { Dispatch } from "react";
import close from "../../icons/close.png"
import { IModal, StateImages } from "../App/App";
import Crop from "../Crop/Crop";
import classes from "./Modal.module.scss";

interface Props {
    src: string,
    setActiveModal: Dispatch<React.SetStateAction<IModal>>,
    setImages: Dispatch<React.SetStateAction<StateImages>>
}

function ImageContent({ src, setActiveModal, setImages }: Props) {
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
            <Crop setActiveModal={setActiveModal} setImages={setImages} src={src} />
        </>
    );
}

export default ImageContent;