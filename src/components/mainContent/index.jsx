import React, { useState, useEffect } from "react";
import ImgItem from "../imgItem";

const MainContent = ({ formData }) => {
    const [imgList, setImgList] = useState([]);

    const download3 = async (url) => {
        let response = await fetch(url.uri);
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            let myBlob = await response.blob();
            let objectURL = await URL.createObjectURL(myBlob);
            await setImgList([...imgList, objectURL]);
        }
    };
    const download2 = async (formData) => {
        for (let i in formData) {
            await download3(formData[i]);
        }
    };

    useEffect(() => {
        download2(formData);
    }, [formData]);

    const imgMaper = imgList.map((item, index) => {
        return <ImgItem src={item} key={index} if={index} />;
    });

    return (
        <div className={"main__content"} id="main__content">
            {imgList[0] !== undefined ? imgMaper : null}
        </div>
    );
};

export default MainContent;
