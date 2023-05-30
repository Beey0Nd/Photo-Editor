import { Dispatch, SetStateAction, useContext, useState } from "react";
import leftArrow from "../../icons/left-arrow.png"
import rightArrow from "../../icons/right-arrow.png"
import classes from "./Slider.module.scss"
import { v4 } from "uuid";

import { DragContext, ExpandedContext, IModal, StateImages } from "../App/App";
import Modal from "../Modal/Modal";
import ImageContent from "../Modal/ImageContent";
import { createPortal } from "react-dom";

interface Props {
    images: StateImages
    setImages: Dispatch<SetStateAction<StateImages>>
    activePage: number,
    setActivePage: Dispatch<SetStateAction<number>>,
    activeModal: IModal,
    setActiveModal: Dispatch<SetStateAction<IModal>>
}

function Slider({ images, setImages, activePage, setActivePage, activeModal, setActiveModal }: Props) {
    const { expanded } = useContext(ExpandedContext)
    const { dragSrc, setDragSrc } = useContext(DragContext)

    if (expanded) return null


    function handleArrow(direction: string) {

        let newState = 0

        if (direction === "left") {
            if (activePage - 1 < 0) {
                newState = images.length - 1;
            } else {
                newState = activePage - 1;
            }
        }
        if (direction === "right") {
            if (activePage + 1 > images.length - 1) {
                newState = 0;
            } else {
                newState = activePage + 1;
            }
        }
        setActivePage(newState)
    }

    function handleDrop(e: React.DragEvent<HTMLUListElement>) {
        e.preventDefault();
        const target = e.target as HTMLUListElement

        target.style.opacity = "1"

        const newImage = {
            src: dragSrc,
            grayscale: false,
            rotation: 0,
            crop: {left: "", right: "", top: "", bottom: ""}
        }

        setImages(prev => {
            return [...prev.slice(0, activePage), newImage, ...prev.slice(activePage, prev.length)]
        })
        setDragSrc("")
    }

    function handleDragOver(e: React.DragEvent<HTMLUListElement>) {
        e.preventDefault();
        const target = e.target as HTMLUListElement

        target.style.opacity = "0.7"
    }

    function handleDragLeave(e: React.DragEvent<HTMLUListElement>) {
        e.preventDefault();
        const target = e.target as HTMLUListElement

        target.style.opacity = "1"
    }

    function handleSlideClick() {
        setActiveModal({
            name: "slider",
            active: true
        })
    }

    return (
        <section className={classes.slider}>
            <div>
                <ul
                    onDragOver={(e) => handleDragOver(e)}
                    onDragLeave={(e) => handleDragLeave(e)}
                    onDrop={(e) => handleDrop(e)}
                    className="slider__drop"
                    style={{
                        left: `-${100 * (!images.length ? 0 : activePage)}%`
                    }}>
                    {images.map(image => (
                        <li onClick={handleSlideClick} key={v4()}>
                            <img src={image.src} alt="Slider image" />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {images.length ? (
                    <>
                        <button
                            onClick={() => handleArrow("left")}>
                            <img src={leftArrow} alt="Left arrow image" />
                        </button>
                        <p>Страница {activePage + 1}</p>
                        <button
                            onClick={() => handleArrow("right")}>
                            <img src={rightArrow} alt="Right arrow image" />
                        </button>
                    </>
                ) : null
                }
            </div>
            {(activeModal && activeModal.name === "slider") && createPortal(
                <Modal name="slider" setActiveModal={setActiveModal}>
                    <ImageContent setActiveModal={setActiveModal} src={images[activePage].src} />
                </Modal>, document.querySelector(".App") as Element
            )}
        </section>
    );
}

export default Slider;