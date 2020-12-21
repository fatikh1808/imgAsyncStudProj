import React, { useState } from "react";

import LeftBar from "../components/leftBar";
import Rightbar from "../components/rightBar";
import MainContent from "../components/mainContent";

import "./mainPages.scss";

const MainPage = () => {
    const [formDatas, setFormDatas] = useState([]);

    const getDropZone = (dropedItem) => {
        setFormDatas(dropedItem, true);
    };
    return (
        <main className={"Main__Page"}>
            <LeftBar />
            <MainContent formData={formDatas} />
            <Rightbar getDropZone={getDropZone} />
        </main>
    );
};

export default MainPage;
