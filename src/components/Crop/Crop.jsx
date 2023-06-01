import { useState, useRef, WheelEventHandler, MouseEvent, useEffect } from "react";
import 'cropperjs/dist/cropper.css';
import classes from "./Crop.module.scss";

// interface Props {
//     src: string
// }

function Crop({ src }) {
    const [isCropShowing, setIsCropShowing] = useState(false)
    const [scale, setScale] = useState(1);
    const canvasRef = useRef(null)
    const sectionRef = useRef(null)
    const imageRef = useRef(null)

    const imageClass = classes.image

    useEffect(() => {
        canvasRef.current.width = imageRef.current.width;
        canvasRef.current.height = imageRef.current.height;
        setIsCropShowing(true)
    }, [])

    function handleWheel(e) {
        const delta = e.deltaY;
        if (delta < 0) {
            setScale(prev => Math.round((prev + 0.1) * 10) / 10)
        } else {
            if (scale > 1) setScale(prev => Math.round((prev - 0.1) * 10) / 10)
        }

    }

    function onCrop() {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d');
        const canvasWidth = ctx.canvas.width
        const canvasHeight = ctx.canvas.height

        const image = imageRef.current

        const imageInitialWidth = image.naturalWidth
        const imageInitialHeight = image.naturalHeight
        const aspectRatio = imageInitialWidth / imageInitialHeight
        
        const imageScaledWidth = Math.round(imageInitialWidth / scale)
        const imageScaledHeight = Math.round(imageScaledWidth / aspectRatio)

        const imageXCoord = (imageInitialWidth - imageScaledWidth) / 2
        const imageYCoord = (imageInitialHeight - imageScaledHeight) / 2

        ctx.drawImage(
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            0, 0,
            canvasWidth, canvasHeight
        )

    }

    return (
        <div
            ref={sectionRef}
            onWheel={handleWheel}
            onTouc
            className={classes.crop}>
            <img
                style={{ transform: `scale(${scale})` }}
                ref={imageRef}
                className={imageClass}
                src={src}
                alt="alt" />
            <canvas
                ref={canvasRef}
                className={classes.cropper}
                style={{
                    display: isCropShowing ? "block" : "none",
                    zIndex: "5" }} />
            <button onClick={onCrop}>Crop</button>
        </div>
    )
}

export default Crop;