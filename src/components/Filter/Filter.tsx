import { useState } from "react";
import Buttons from "./Buttons";
import RemoveSection from "./RemoveSection";
import FilterPhotos from "./FilterPhotos";
import classes from "./Filter.module.scss"
import abstract4 from "../../images/abstract4.jpg"
import abstract5 from "../../images/abstract5.jpg"

export interface ChosenPhoto {
    id: number
}

export type ChosenPhotosState = ChosenPhoto[]

export type StateMode = "read" | "change";

export interface StatePhoto {
    src: string,
    alt: string,
    id: number
}

function Filter() {
    const [mode, setMode] = useState<StateMode>("read")
    const [activeButton, setActiveButton] = useState("Галерея");
    const [chosenPhotos, setChosenPhotos] = useState<ChosenPhotosState>([]);
    const [photos, setPhotos] = useState<StatePhoto[]>([
        { src: abstract4, alt: "Abstract picture", id: 0 },
        { src: abstract5, alt: "Abstract picture", id: 1 },
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
                photos={photos}
                setPhotos={setPhotos}
                chosenPhotos={chosenPhotos}
                setChosenPhotos={setChosenPhotos}
            />
            <FilterPhotos
                mode={mode}
                photos={photos}
                setPhotos={setPhotos}
                chosenPhotos={chosenPhotos}
                setChosenPhotos={setChosenPhotos}
            />
        </section>
    );
}

export default Filter;