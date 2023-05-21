import { Dispatch } from "react"
import clear from "../../icons/close.png"
import garbage from "../../icons/garbage.png"
import expand from "../../icons/spread.png"
import classes from "./RemoveSection.module.scss"
import { ChosenPhotosState, StateMode, StatePhoto } from "./Filter"

interface Props {
    mode: StateMode,
    setMode: Dispatch<React.SetStateAction<StateMode>>,
    photos: StatePhoto[], 
    setPhotos: Dispatch<React.SetStateAction<StatePhoto[]>>,
    chosenPhotos: ChosenPhotosState,
    setChosenPhotos: Dispatch<React.SetStateAction<ChosenPhotosState>>
}

function RemoveSection({
    mode, 
    setMode, 
    photos, 
    setPhotos,
    chosenPhotos, 
    setChosenPhotos}: Props) {
    const handleClear = () => {
        setPhotos(photos => photos.filter(photo => !chosenPhotos.find(chosenPhoto => chosenPhoto.id === photo.id)))
        setChosenPhotos([])
        setMode("read")
    }

    const handleChoose = () => {
        if(mode === "change") setChosenPhotos([])
        setMode(mode === "read" ? "change" : "read")
    }

    return (
        <div className={classes.remove}>
            <button 
            disabled={mode === "read" ? true : false}
            onClick={handleClear}>
                <img src={clear} alt="Clear button" />
                <p>Очистить</p>
            </button>
            <button onClick={handleChoose}>
                <img src={garbage} alt="Garbage button" />
                <p>Выбрать</p>
            </button>
            <button>
                <img src={expand} alt="Expand button" />
                <p>Развернуть</p>
            </button>
        </div>
    );
}

export default RemoveSection;