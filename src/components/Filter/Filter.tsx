import { Dispatch, SetStateAction, useState } from "react";
import Buttons from "./Buttons";
import RemoveSection from "./RemoveSection";
import FilterPhotos from "./FilterPhotos";
import classes from "./Filter.module.scss"
import abstract4 from "../../images/abstract4.jpg"
import abstract5 from "../../images/abstract5.jpg"
import { StatePages } from "../App/App";

export interface ChosenPhoto {
    id: number
}
export type ChosenPhotosState = ChosenPhoto[]
export type StateMode = "read" | "change";
export interface StatePhoto {
    src: string,
    alt: string,
    id: number,
    type: string
}
interface Props {
    setPages: Dispatch<SetStateAction<StatePages>>,
    activePage: number
}


function Filter({ activePage, setPages }: Props) {
    const [mode, setMode] = useState<StateMode>("read")
    const [activeButton, setActiveButton] = useState("Галерея");
    const [chosenPhotos, setChosenPhotos] = useState<ChosenPhotosState>([]);
    const [photos, setPhotos] = useState<StatePhoto[]>([
        { src: abstract4, alt: "Abstract picture", id: 0, type: "Галерея" },
        { src: abstract5, alt: "Abstract picture", id: 1, type: "Шаблоны" },
        { src: abstract5, alt: "Abstract picture", id: 2, type: "Фон" },
    ]);

    return (
        <section className={classes.filter}>
            <Buttons
                setActiveButton={setActiveButton}
                activeButton={activeButton}
            />
            <RemoveSection
                mode={mode}
                setMode={setMode}
                setPages={setPages}
                setChosenPhotos={setChosenPhotos}
            />
            <FilterPhotos
                activePage={activePage}
                mode={mode}
                photos={photos}
                setPhotos={setPhotos}
                setPages={setPages}
                activeButton={activeButton}
                chosenPhotos={chosenPhotos}
                setChosenPhotos={setChosenPhotos}
            />
        </section>
    );
}

export default Filter;