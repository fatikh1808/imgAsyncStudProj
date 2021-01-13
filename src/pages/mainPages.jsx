import React, { useState } from "react";

import LeftBar from "../components/leftBar";
import Rightbar from "../components/rightBar";
import MainContent from "../components/mainContent";

import "./mainPages.scss";

const MainPage = () => {
    const [loaders, setLoaders] = useState([])
    const [deleteItem, setDeleteItem] = useState({})

    return (
        <main className={"Main__Page"}>
            <LeftBar />
            <MainContent
                loaders={loaders}
                setDelete={setDeleteItem}
            />
            <Rightbar
                setLoaders={setLoaders}
                deleteItem={deleteItem}
            />
        </main>
    );
};

export default MainPage;
