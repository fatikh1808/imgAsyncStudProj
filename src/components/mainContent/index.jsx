import React, { useState, useEffect } from "react";
import ImgItem from "../imgItem";

const MainContent = ({ formData }) => {
    const [imgList, setImgList] = useState([]);

    const downloadImg = async (url) => {
        if (typeof url !== "string") {
            let response = await fetch(url.uri);
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                let myBlob = await response.blob();
                let objectURL = await URL.createObjectURL(myBlob);
                await setImgList([...imgList, objectURL]);
            }
        } else {
            await setImgList([...imgList, url]);
        }
    };

    const downloadAsync = async (formData) => {
        for (let i in formData) {
            await downloadImg(formData[i]);
        }
    };

    useEffect(() => {
        downloadAsync(formData);
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
