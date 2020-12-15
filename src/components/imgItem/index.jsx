import React from "react";

function ImgItem({ src }) {
    return (
        <span>
            <img height="200" src={src} alt="" />
        </span>
    );
}

export default ImgItem;
