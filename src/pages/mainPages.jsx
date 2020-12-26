import React, { useState } from "react";

import LeftBar from "../components/leftBar";
import Rightbar from "../components/rightBar";
import MainContent from "../components/mainContent";

import "./mainPages.scss";

const MainPage = () => {
    const [formDatas, setFormDatas] = useState({
        key: '',
        images: [],
        process: 0,
        title: ''
    });
    const [numImages, setNumImages] = useState({})
    const [acceptedArray, setAcceptedArray] = useState([])
    const [reload, setReload] = useState(false)

    return (
        <main className={"Main__Page"}>
            <LeftBar />
            <MainContent
                formData={formDatas}
                numImages={numImages}
                setReload={setReload}
            />
            <Rightbar
                getDropZone={setFormDatas}
                setNum={setNumImages}
                acceptedArray={acceptedArray}
                setAcceptedArray={setAcceptedArray}
                reload={reload}
                setReload={setReload}
            />
        </main>
    );
};

export default MainPage;
