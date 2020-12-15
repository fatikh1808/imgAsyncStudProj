import React, { useState } from "react";

import get from "lodash/get";

import LeftBar from "../components/leftBar";
import Rightbar from "../components/rightBar";
import MainContent from "../components/mainContent";

import "./mainPages.scss";

const MainPage = () => {
    const [formDatas, setFormDatas] = useState([]);

    const getFormData = (formData) => {
        setFormDatas(get(formData, "uriArr", []));
    };

    return (
        <main className={"Main__Page"}>
            <LeftBar />
            <MainContent formData={formDatas} />
            <Rightbar getFormData={getFormData} />
        </main>
    );
};

export default MainPage;
