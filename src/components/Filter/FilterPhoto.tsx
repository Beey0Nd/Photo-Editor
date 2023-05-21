import { Dispatch } from "react";
import { ChosenPhotosState } from "./Filter";
import classes from "./FilterPhotos.module.scss"
interface Props {
    src: string,
    alt: string,
    id: number,
    mode: string,
    chosenPhotos: ChosenPhotosState,
    setChosenPhotos: Dispatch<React.SetStateAction<ChosenPhotosState>>
}

function FilterPhoto({src, alt, id, mode, chosenPhotos, setChosenPhotos}: Props) {
    const handleClick = () => {
        if(mode === "change") {
            if (chosenPhotos.some(photo => photo.id === id)) {
                setChosenPhotos(chosenPhotos.filter(photo => photo.id !== id))
            } else {
                setChosenPhotos((prev: ChosenPhotosState) => [...prev, {id}])
            }
        }
    }
    
    return (
        <li 
        className={chosenPhotos.some(photo => photo.id === id) ? classes.chosen : ""}
        onClick={handleClick}>
            <img src={src} alt={alt} />
        </li>
    );
}

export default FilterPhoto;