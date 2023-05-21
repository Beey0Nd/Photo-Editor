import { useState } from "react";
import leftArrow from "../../icons/left-arrow.png"
import rightArrow from "../../icons/right-arrow.png"
import classes from "./Slider.module.scss"

import abstract from "../../images/abstract.png"
import abstract2 from "../../images/abstract2.png"
import waves from "../../images/waves.png"

function Slider() {
    const [activePage, setActivePage] = useState(0);
    const [pages] = useState([
        abstract, abstract2, waves
    ]);

    function handleArrow(direction: string) {

        let newState = 0

        if(direction === "left") {
            if(activePage - 1 < 0) {
                newState = pages.length - 1;
            } else {
                newState = activePage - 1;
            }
        }
        if(direction === "right") {
            if(activePage + 1 > pages.length - 1) {
                newState = 0;
            } else {
                newState = activePage + 1;
            }
        }
        setActivePage(newState)
    }

    return (
        <section className={classes.slider}>
            <div>
                <ul style={{
                    left: `-${100 * activePage}%`
                }}>
                    {pages.map((page, i) => (
                        <li key={"page " + i}>
                            <img src={page} alt="Slider image" />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <button
                    onClick={() => handleArrow("left")}>
                    <img src={leftArrow} alt="Left arrow image" />
                </button>
                <p>Страница {activePage + 1}</p>
                <button
                    onClick={() => handleArrow("right")}>
                    <img src={rightArrow} alt="Right arrow image" />
                </button>
            </div>
        </section>
    );
}

export default Slider;