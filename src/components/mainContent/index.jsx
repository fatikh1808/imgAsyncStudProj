import React, { useState, useEffect } from "react";
import { Spin } from 'antd';
import get from 'lodash/get'

import ImgItem from "../imgItem";

const MainContent = ({ formData, numImages, setReload}) => {
    const [imgList, setImgList] = useState([]);
    function downloadAsync(formData) {       
        const r = formData.images.map(y => y.imageURL);
        setImgList([...imgList, ...r ]);
    }

    useEffect(() => {
        downloadAsync(formData);
    }, [formData]);
    
    const imgMaper = imgList.map((item, index) => {
        console.log("yooou bitchdds",imgList)
        return <ImgItem src={item} key={index} if={index} />;
    });

    let ArraySpin = Array(numImages.num).fill(1)

    const loaderMap = ArraySpin.map((item, index) => (
            <div key={index}>
                <Spin />
            </div>
        ))

    const reloadBtn = <button onClick={() => setReload(true)}>reload</button>
    
    return (
        <div className={"main__content"} id="main__content">
            {imgList[0] !== undefined ? imgMaper : null}
            {numImages.active ? loaderMap : null}
            {formData.key === 'download error' ? reloadBtn : null}
        </div>
    );
};

export default MainContent;
