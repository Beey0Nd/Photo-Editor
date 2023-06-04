import { Dispatch, SetStateAction, useContext } from "react";
import { ChosenPhotosState } from "./Filter";
import classes from "./FilterPhotos.module.scss"
import { DragContext, StateImages } from "../App/App";

interface Props {
    src: string,
    alt: string,
    id: number,
    mode: string,
    activeButton: string,
    chosenPhotos: ChosenPhotosState,
    setChosenPhotos: Dispatch<SetStateAction<ChosenPhotosState>>,
    setImages: Dispatch<SetStateAction<StateImages>>,
    activePage: number
}

function FilterPhoto({
    src,
    alt,
    id,
    mode,
    chosenPhotos,
    setChosenPhotos,
    setImages,
    activeButton,
    activePage
}: Props) {
    const { dragSrc, setDragSrc } = useContext(DragContext)

    const handleClick = () => {
        if (mode === "change") {
            if (chosenPhotos.some(photo => photo.id === id)) {
                setChosenPhotos(chosenPhotos.filter(photo => photo.id !== id))
            } else {
                setChosenPhotos((prev: ChosenPhotosState) => [...prev, { id }])
            }
        } else {
            if (activeButton === "Галерея") {
                const newImage = {
                    src,
                    grayscale: false,
                    rotation: 0,
                    crop: {
                        right: "",
                        left: "",
                        top: "",
                        bottom: ""
                    }
                }
                setImages(prev => [...prev.slice(0, activePage), newImage, ...prev.slice(activePage, prev.length)])
            }
        }
    }

    function handleDragStart(src: string) {
        if (!dragSrc) setDragSrc(src)
    }

    return (
        <li
            // onTouchStart={() => handleDragStart(src)}
            onDragStart={() => handleDragStart(src)}
            className={chosenPhotos.some(photo => photo.id === id) ? classes.chosen : ""}
            onClick={handleClick}>
            <img
                draggable
                src={src} alt={alt} />
        </li>
    );
}

export default FilterPhoto;