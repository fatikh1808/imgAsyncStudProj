import React, { useState } from "react";

import LeftBar from "../components/leftBar";
import Rightbar from "../components/rightBar";
import MainContent from "../components/mainContent";

import "./mainPages.scss";

const MainPage = () => {
    const [loaders, setLoaders] = useState([])
    const [deleteTime, setDeleteTime] = useState({})

    return (
        <main className={"Main__Page"}>
            <LeftBar />
            <MainContent
                loaders={loaders}
                setDelete={setDeleteTime}
            />
            <Rightbar
                setLoaders={setLoaders}
                deleteTime={deleteTime}
                setDeleteTime={setDeleteTime}
            />
        </main>
    );
};

export default MainPage;
