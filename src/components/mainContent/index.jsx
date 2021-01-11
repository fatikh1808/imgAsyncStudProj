import React from "react";
import { Spin } from 'antd';

import ImgItem from "../imgItem";

const MainContent = ({ loaders }) => {
    
    let ArraySpin = Object.values(loaders)
    
    const loaderMap = ArraySpin.map((item, index) => (
            item.status === "done" ?
                <ImgItem src={item.imageURL} key={item.id} /> :
                <div key={index}>
                    <Spin />
                </div>
        ))
    
    return (
        <div className={"main__content"} id="main__content">
            {loaderMap}
        </div>
    );
};

export default MainContent;
