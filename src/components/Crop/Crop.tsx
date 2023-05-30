import { useEffect, useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import 'cropperjs/dist/cropper.css';

interface Props {
    src: string
}

function Crop({src}: Props) {
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    // let context: CanvasRenderingContext2D;
    // const [image, setImage] = useState<string | ArrayBuffer | null>('');
    const cropperRef = useRef<ReactCropperElement>(null);

    // const onCrop = () => {
    //     const cropper = cropperRef.current?.cropper;
    //     console.log(cropper!.getCroppedCanvas().toDataURL());
    // };

    
    useEffect(() => {
        // context = canvasRef.current!.getContext("2d") as CanvasRenderingContext2D;
    }, [])

    // function drawImage() {
    //     const image = new Image()
    //     image.src = src;
    //     image.onload = () => context.drawImage(image, 0, 0, 900, 900)
    // }

    return (
        <>
            <Cropper
                src={src}
                style={{ height: 400, width: "100%" }}
                // Cropper.js options
                initialAspectRatio={16 / 9}
                guides={false}
                ref={cropperRef}
            />
        </>
        // <canvas ref={canvasRef} style={{height: "100%", width: "100%"}}/> 
    );
}

export default Crop;