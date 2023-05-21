// import { ChangeEvent, useState } from "react";

interface Props {
    children: React.ReactNode
}

function Layout({ children }: Props) {
    // const [file, setFile] = useState<any>();

    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         console.log(URL.createObjectURL(e.target.files[0]))
    //         setFile(URL.createObjectURL(e.target.files[0]));
    //     }
    // };

    // console.log(file)
    return (
        <div className="layout">
            <div>
                {/* <input type="file" onChange={handleFileChange} />
                {file && <img src={file} alt="uploaded image" />} */}
                {children}
            </div>
        </div>
    );
}
export default Layout;