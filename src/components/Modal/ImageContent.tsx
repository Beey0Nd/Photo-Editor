import { Dispatch } from "react";
import close from "../../icons/close.png"
import { IModal, Image, StateImages } from "../App/App";
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
            <Crop setImages={setImages} src={src} /> 
            {/* <div className="">
                <button>
                    <img src="asd" alt="" />
                    <p>Повернуть влево</p>
                </button>
                <button>
                    <img src="asd" alt="" />
                    <p>Повернуть вправо</p>
                </button>
                <button>
                    <img src="asd" alt="" />
                    <p>Применить фильтр</p>
                </button>
                <button>
                    <img src="asd" alt="" />
                    <p>Кадрировать изображение</p>
                </button>
            </div> */}
        </>
    );
}

export default ImageContent;