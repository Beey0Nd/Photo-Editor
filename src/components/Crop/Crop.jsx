import { useState, useRef, WheelEventHandler, MouseEvent, useEffect } from "react";
import 'cropperjs/dist/cropper.css';
import classes from "./Crop.module.scss";
import rotateLeft from "../../icons/rotate-left.png";
import rotateRight from "../../icons/rotate-right.png";
import grayscaleImage from "../../icons/greyscale.png";
import check from "../../icons/check.png"
import { usePinch } from "@use-gesture/react";
// interface Props {
//     src: string
// }

function Crop({ src, setImages, setActiveModal }) {
    const [isCropShowing, setIsCropShowing] = useState(false)
    const [scale, setScale] = useState(1)
    const [grayscale, setGrayscale] = useState(0)
    const [rotation, setRotation] = useState(0);
    const [cropSettings, setCropSettings] = useState() // Нужно, чтобы отрисовывать старую неизмененную картинку после скейла
    const [cropped, setCropped] = useState(false)
    const canvasRef = useRef(null)
    const imageSizeRef = useRef()
    const sectionRef = useRef(null)
    const imageRef = useRef(null)

    const imageClass = classes.image

    // const bind = usePinch(({ pinch }) => {
    //     if (pinch) {
    //         setScale(prev => Math.round((prev + 0.1) * 10) / 10)
    //     }
    // })

    useEffect(() => {
        setupCropperSize()

        const {
            ctx,
            canvas,
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight
        } = getUpdatedCropSettings();

        setCropSettings({
            ctx,
            canvas,
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight
        })

        setIsCropShowing(true)
    }, [])

    useEffect(() => {
        console.log(rotation);
            updateCropperSizeOnRotation()
            // ctx.translate(canvasWidth / 2, canvasHeight / 2);
            // ctx.rotate(Math.PI / 4); // поворот на 45 градусов
            // ctx.drawImage(image, -imageXCoord, -imageYCoord, image.width, image.height)

            // const dataURL = canvas.toDataURL('image/jpeg', 1.0);

            // console.log(dataURL);

            // setImages(prev => {
            //     return prev.map(item => {
            //         if(item.src === src) {
            //             return {
            //                 src: dataURL, 
            //                 rotation: 0,
            //                 grayscale: true,
            //                 crop: {right: "string", left: "string", top: "string", bottom: "string"}
            //             }
            //         } else {
            //             return item
            //         }
            //     })
            // })
    }, [rotation])


    function restoreDefaultCropState() {
        if (cropped) setCropped(false)
        if (grayscale) setGrayscale(0)

        const ctx = canvasRef.current.getContext("2d")

        ctx.clearRect(
            0, 0,
            canvasRef.current.width, canvasRef.current.height
        )
    }

    function draw(
        ctx, image,
        imageXCoord, imageYCoord,
        imageScaledWidth, imageScaledHeight,
        canvasWidth, canvasHeight
    ) {
        const canvas = canvasRef.current;

        ctx.save()
        if (rotation === 180) {
            ctx.scale(-1, -1)
            ctx.drawImage(
                image,
                imageXCoord, imageYCoord,
                imageScaledWidth, imageScaledHeight,
                -canvasWidth, -canvasHeight,
                canvasWidth, canvasHeight
            )
        } else if(rotation === 90) {
            ctx.translate(canvas.width, (-imageScaledWidth + imageScaledHeight));
            ctx.rotate(Math.PI/2);
            ctx.drawImage(
                image,
                0, 0,
                imageScaledWidth, imageScaledHeight,
                0, 0,
                canvas.width + imageScaledHeight, canvas.width 
            )
        } else if(rotation === 270) {
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(-90 * Math.PI / 180);
            ctx.drawImage(
                image, 
                0, 0, 
                image.width, image.height, 
                -canvas.height/2, -canvas.width/2, 
                canvas.height * 2, canvas.width);
        } else {
            ctx.drawImage(
                image,
                imageXCoord, imageYCoord,
                imageScaledWidth, imageScaledHeight,
                0, 0,
                canvasWidth, canvasHeight
            )
        }
        ctx.restore()
    }

    function handleWheel(e) {
        restoreDefaultCropState()

        const delta = e.deltaY;
        if (delta < 0) {
            setScale(prev => Math.round((prev + 0.1) * 10) / 10)
        } else {
            if (scale > 1) setScale(prev => Math.round((prev - 0.1) * 10) / 10)
        }
    }

    function updateCropperSizeOnRotation() {
        if (Math.abs(rotation * Math.PI / 180 % Math.PI) === 0) {
            canvasRef.current.style.maxWidth = "100%"
        } else {
            canvasRef.current.style.maxWidth = imageRef.current.height + "px"
        }
    }

    function setupCropperSize() {
        const canvas = canvasRef.current
        const image = imageRef.current

        imageSizeRef.current = {
            width: image.width, height: image.height
        }

        canvas.width = image.width;
        canvas.height = image.height;
    }

    function getUpdatedCropSettings() {
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
            ctx, canvas, image,
            aspectRatio,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight,
        }
    }

    function onGrayscale() {
        const {
            ctx,
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight
        } = getUpdatedCropSettings();

        ctx.save()

        if (grayscale) {
            ctx.filter = `grayscale(0)`
            draw(
                ctx, image,
                imageXCoord, imageYCoord,
                imageScaledWidth, imageScaledHeight,
                canvasWidth, canvasHeight
            )
            setGrayscale(0)
        } else {
            ctx.filter = `grayscale(1)`
            draw(
                ctx, image,
                imageXCoord, imageYCoord,
                imageScaledWidth, imageScaledHeight,
                canvasWidth, canvasHeight
            )
            setGrayscale(1)
        }

        ctx.restore()
    }

    function onCrop() {
        const {
            ctx,
            canvas,
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight,
        } = getUpdatedCropSettings();

        // ctx.globalAlpha = 0.5
        // ctx.rotate(90 * Math.PI / 180)
        // ctx.globalAlpha = 0.5
        // ctx.rotate(90 * Math.PI / 180)

        draw(ctx, image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight)

        setCropSettings({
            ctx,
            canvas,
            image,
            imageXCoord, imageYCoord,
            imageScaledWidth, imageScaledHeight,
            canvasWidth, canvasHeight
        })

        setCropped(true)
    }

    function onRotation(direction) {
        if (direction === "right") {
            setRotation(prev => {
                if (prev + 90 > 270) {
                    return 0
                } else {
                    return prev + 90
                }
            })
        } else {
            setRotation(prev => {
                if (prev - 90 < 0) {
                    return 270
                } else {
                    return prev - 90
                }
            })
        }
        restoreDefaultCropState()
    }

    const onSubmitChanges = () => {
        const imgSrc = canvasRef.current.toDataURL()

        setImages(prev => prev.map(item => {
            if (item.src === src) {
                return {
                    ...item,
                    src: imgSrc
                }
            }
            return item
        }))

        setCropped(true)
        setActiveModal({ name: "", active: false })
    }

    return (
        <div
            ref={sectionRef}
            onWheel={handleWheel}
            className={classes.crop}
        >
            <img
                style={{
                    visibility: cropped ? "hidden" : "visible",
                    transform: `scale(${scale}) rotateZ(${rotation}deg)`,
                }}
                ref={imageRef}
                className={imageClass}
                src={src}
                alt="alt"
            />
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
                        <button onClick={() => onRotation("left")}>
                            <img src={rotateLeft} alt="Rotate left image" />
                        </button>
                    </li>
                    <li>
                        <button
                            className={classes.cropButton}
                            onClick={onCrop}>Crop</button>
                    </li>
                    <li>
                        <button onClick={() => onRotation("right")}>
                            <img src={rotateRight} alt="Rotate Right image" />
                        </button>
                    </li>
                    <li>
                        <button
                            disabled={!cropped}
                            onClick={onGrayscale}>
                            <img src={grayscaleImage} alt="Grayscale filter button" />
                        </button>
                    </li>
                    <li>
                        <button onClick={onSubmitChanges}>
                            <img src={check} alt="Check mark button" />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Crop;