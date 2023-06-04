import { useState, useContext } from "react";
import Buttons from "./Buttons";
import RemoveSection from "./RemoveSection";
import FilterPhotos from "./FilterPhotos";
import classes from "./Filter.module.scss"
import abstract4 from "../../images/abstract4.jpg"
import abstract5 from "../../images/abstract5.jpg"
import { AppContext } from "../App/App";


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

function Filter() {
    const { activePage, setActivePage, setImages } = useContext(AppContext)
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
                setImages={setImages}
                setChosenPhotos={setChosenPhotos}
                setActivePage={setActivePage}
            />
            <FilterPhotos
                activePage={activePage}
                mode={mode}
                photos={photos}
                setPhotos={setPhotos}
                setImages={setImages}
                activeButton={activeButton}
                chosenPhotos={chosenPhotos}
                setChosenPhotos={setChosenPhotos}
            />
        </section>
    );
}

export default Filter;