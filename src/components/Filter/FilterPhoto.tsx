import { Dispatch, SetStateAction, useContext } from "react";
import { ChosenPhotosState } from "./Filter";
import classes from "./FilterPhotos.module.scss"
import { DragContext, StatePages } from "../App/App";

interface Props {
    src: string,
    alt: string,
    id: number,
    mode: string,
    activeButton: string,
    chosenPhotos: ChosenPhotosState,
    setChosenPhotos: Dispatch<SetStateAction<ChosenPhotosState>>,
    setPages: Dispatch<SetStateAction<StatePages>>
}

function FilterPhoto({
    src,
    alt,
    id,
    mode,
    chosenPhotos,
    setChosenPhotos,
    setPages,
    activeButton
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
                setPages(prev => [src, ...prev])
            }
        }
    }

    function handleDragStart(src: string) {
        if (!dragSrc) setDragSrc(src)
    }

    return (
        <li
            onDragStart={() => handleDragStart(src)}
            className={chosenPhotos.some(photo => photo.id === id) ? classes.chosen : ""}
            onClick={handleClick}>
            <img
                src={src} alt={alt} />
        </li>
    );
}

export default FilterPhoto;