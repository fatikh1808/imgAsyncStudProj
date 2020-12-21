import React, { useState, useEffect } from "react";
import ImgItem from "../imgItem";

const MainContent = ({ formData }) => {
    const [imgList, setImgList] = useState([]);

    // const downloadAsync = async (formData) => {
    //     for (let i in formData) {
    //         console.log(formData[i])
    //         setImgList([...imgList, formData[i].imageURL]);
    //     }
    // };

    function downloadAsync(formData) {
        const r = formData.map(y => y.imageURL);
        setImgList([...imgList, ...r ]);
        console.log("done")
    }

    useEffect(() => {
        downloadAsync(formData);
    }, [formData]);
    console.log(formData)
    
    const imgMaper = imgList.map((item, index) => {
        console.log("yooou bitchdds",imgList)
        return <ImgItem src={item} key={index} if={index} />;
    });

    return (
        <div className={"main__content"} id="main__content">
            {imgList[0] !== undefined ? imgMaper : null}
        </div>
    );
};

export default MainContent;
