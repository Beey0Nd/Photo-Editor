import { ChangeEvent, Dispatch, SetStateAction, useContext, useRef } from "react";
import FilterPhoto from "./FilterPhoto";
import classes from "./FilterPhotos.module.scss"
import { ChosenPhotosState, StatePhoto } from "./Filter";
import { StateMode } from "./Filter"
import { v4 } from "uuid"
import { ExpandedContext, StateImages } from "../App/App";


interface Props {
    mode: StateMode,
    photos: StatePhoto[],
    setPhotos: Dispatch<SetStateAction<StatePhoto[]>>,
    setImages: Dispatch<SetStateAction<StateImages>>,
    chosenPhotos: ChosenPhotosState,
    setChosenPhotos: Dispatch<SetStateAction<ChosenPhotosState>>,
    activeButton: string,
    activePage: number
}

function FilterPhotos({
    mode,
    photos,
    setPhotos,
    setImages,
    chosenPhotos,
    setChosenPhotos,
    activeButton,
    activePage
}: Props) {

    const { expanded } = useContext(ExpandedContext)

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current!.click();
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotos(prev => [...prev, {
                src: URL.createObjectURL(e.target.files![0]),
                alt: "Abstract picture",
                id: prev.length,
                type: activeButton
            }])
        }
    };

    return (
        <div className={`${classes.filterPhotos} ${expanded ? classes.expanded : ""}`}>
            <ul>
                {photos.map(photo => {
                    if (activeButton === photo.type) return (
                        <FilterPhoto
                            activePage={activePage}
                            mode={mode}
                            chosenPhotos={chosenPhotos}
                            setChosenPhotos={setChosenPhotos}
                            activeButton={activeButton}
                            setImages={setImages}
                            id={photo.id}
                            key={v4()}
                            src={photo.src}
                            alt={photo.alt}
                        />
                    )
                }
                )}
                <li>
                    <button onClick={handleClick}>Добавить фотографию</button>
                </li>
                <input onChange={handleFileChange} ref={inputRef} type="file" />
            </ul>
        </div>
    );
}

export default FilterPhotos;