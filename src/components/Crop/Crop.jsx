import { useState, useRef, WheelEventHandler, MouseEvent, useEffect } from "react";
import 'cropperjs/dist/cropper.css';
import classes from "./Crop.module.scss";
import rotateLeft from "../../icons/rotate-left.png";
import rotateRight from "../../icons/rotate-right.png";
import grayscaleImage from "../../icons/greyscale.png";
// interface Props {
//     src: string
// }

function Crop({ src }) {
    const [isCropShowing, setIsCropShowing] = useState(false)
    const [scale, setScale] = useState(1);
    const [cropSettings, setCropSettings] = useState(undefined)
    const [grayscale, setGrayscale] = useState(0);
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef(null)
    const sectionRef = useRef(null)
    const imageRef = useRef(null)

    const imageClass = classes.image

    useEffect(() => {
        setupCropper()

        const {
            ctx, image, 
            imageXCoord, imageYCoord, 
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight,
        } = getUpdatedCropSettingsWithNewScale()

        setCropSettings({
            ctx, image, 
            imageXCoord, imageYCoord, 
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight,
        })

        setIsCropShowing(true)
    }, [])

    useEffect(() => {
        if(cropSettings) {

            const { 
                ctx,
                image,
                imageXCoord, imageYCoord,
                imageScaledWidth, imageScaledHeight,
                canvasWidth, canvasHeight
            } = cropSettings;
    
            ctx.filter = `grayscale(${grayscale})`
            ctx.drawImage(
                image,
                imageXCoord, imageYCoord,
                imageScaledWidth, imageScaledHeight,
                0, 0,
                canvasWidth, canvasHeight
            )
        }
    }, [grayscale])

    function handleWheel(e) {
        const delta = e.deltaY;
        if (delta < 0) {
            setScale(prev => Math.round((prev + 0.1) * 10) / 10)
        } else {
            if (scale > 1) setScale(prev => Math.round((prev - 0.1) * 10) / 10)
        }
    }

    function setupCropper() {
        const canvas = canvasRef.current
        const image = imageRef.current

        canvas.width = image.width;
        canvas.height = image.height;
    }

    function getUpdatedCropSettingsWithNewScale() {
        const canvas = canvasRef.current
        const image = imageRef.current

        const ctx = canvas.getContext('2d');
        const canvasWidth = ctx.canvas.width
        const canvasHeight = ctx.canvas.height

        const imageInitialWidth = image.naturalWidth
        const imageInitialHeight = image.naturalHeight
        const aspectRatio = imageInitialWidth / imageInitialHeight

        const imageScaledWidth = Math.round(imageInitialWidth / scale)
        const imageScaledHeight = Math.round(imageScaledWidth / aspectRatio)

        const imageXCoord = (imageInitialWidth - imageScaledWidth) / 2
        const imageYCoord = (imageInitialHeight - imageScaledHeight) / 2

        return {
            ctx, image, 
            imageXCoord, imageYCoord, 
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight,
        }
    }

    function onGrayscale() {
        if(grayscale) {
            setGrayscale(0)
        } else {
            setGrayscale(1)
        }
    }

    function onCrop() {
        const {
            ctx,
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight,
        } = getUpdatedCropSettingsWithNewScale();

        setCropSettings(prev => ({...prev,
            ctx,
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight
        }))
        
        // ctx.globalAlpha = 0.5
        ctx.drawImage(
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            0, 0,
            canvasWidth, canvasHeight
        )
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function onRotate(direction) {
        if(direction === "right") {
            setRotation(prev => prev + 90)
        } else {
            setRotation(prev => prev - 90)
        }
    }

    return (
        <div
            ref={sectionRef}
            onWheel={handleWheel}
            className={classes.crop}>
            <img
                style={{
                    transform: `scale(${scale})`,
                }}
                ref={imageRef}
                className={imageClass}
                src={src}
                alt="alt" />
            <canvas
                ref={canvasRef}
                className={classes.cropper}
                style={{
                    visibility: isCropShowing ? "visible" : "hidden",
                    zIndex: "5"
                }} />
            <nav className={classes.navigation}>
                <ul>
                    <li>
                        <button onClick={() => onRotate("left")}>
                            <img src={rotateLeft} alt="Rotate left image" />
                        </button>
                    </li>
                    <li>
                        <button
                            className={classes.cropButton}
                            onClick={onCrop}>Crop</button>
                    </li>
                    <li>
                        <button onClick={() => onRotate("right")}>
                            <img src={rotateRight} alt="Rotate Right image" />
                        </button>
                    </li>
                    <li>
                        <button onClick={onGrayscale}>
                            <img src={grayscaleImage} alt="Grayscale filter button" />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Crop;