import { Dispatch, SetStateAction, useContext } from "react"
import clear from "../../icons/close.png"
import garbage from "../../icons/garbage.png"
import expand from "../../icons/spread.png"
import classes from "./RemoveSection.module.scss"
import { ChosenPhotosState, StateMode } from "./Filter"
import { ExpandedContext, State, StatePages } from "../App/App"

interface Props {
    mode: StateMode,
    setMode: Dispatch<React.SetStateAction<StateMode>>,
    setChosenPhotos: Dispatch<React.SetStateAction<ChosenPhotosState>>,
    setPages: Dispatch<SetStateAction<StatePages>>
}

function RemoveSection({
    mode,
    setMode,
    setChosenPhotos,
    setPages }: Props) {

    const { setExpanded } = useContext(ExpandedContext)

    const handleClear = () => {
        setPages([])
    }

    const handleChoose = () => {
        if (mode === "change") setChosenPhotos([])
        setMode(mode === "read" ? "change" : "read")
    }

    const handleExpand = () => {
        setExpanded((prev: State) => !prev)
    }

    return (
        <div className={classes.remove}>
            <button
                onClick={handleClear}>
                <img src={clear} alt="Clear button" />
                <p>Очистить</p>
            </button>
            <button onClick={handleChoose}>
                <img src={garbage} alt="Garbage button" />
                <p>Выбрать</p>
            </button>
            <button onClick={handleExpand}>
                <img src={expand} alt="Expand button" />
                <p>Развернуть</p>
            </button>
        </div>
    );
}

export default RemoveSection;