import { ChangeEvent, Dispatch, useRef } from "react";
import FilterPhoto from "./FilterPhoto";
import classes from "./FilterPhotos.module.scss"
import { ChosenPhotosState, StatePhoto } from "./Filter";
import { StateMode } from "./Filter"
import { v4 } from "uuid"


interface Props {
    mode: StateMode,
    photos: StatePhoto[], 
    setPhotos: Dispatch<React.SetStateAction<StatePhoto[]>>,
    chosenPhotos: ChosenPhotosState,
    setChosenPhotos: Dispatch<React.SetStateAction<ChosenPhotosState>>
}

function FilterPhotos({
    mode, 
    photos, 
    setPhotos,
    chosenPhotos, 
    setChosenPhotos
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current!.click();
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotos(prev => [...prev, {
                src: URL.createObjectURL(e.target.files![0]),
                alt: "Abstract picture",
                id: prev.length
            }])
        }
    };

    return (
        <div className={classes.filterPhotos}>
            <ul>
                {photos.map(photo => (
                    <FilterPhoto
                        mode={mode}
                        chosenPhotos={chosenPhotos}
                        setChosenPhotos={setChosenPhotos}
                        id={photo.id}
                        key={v4()}
                        src={photo.src}
                        alt={photo.alt}
                    />
                ))}
                <li>
                    <button onClick={handleClick}>Добавить фотографию</button>
                </li>
                <input onChange={handleFileChange} ref={inputRef} type="file" />
            </ul>
        </div>
    );
}

export default FilterPhotos;