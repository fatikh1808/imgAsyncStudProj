import React from "react";

function ImgItem({ src, id, key, deleteOnClick }) {

    return (
        <img height="200" src={src} key={key} alt="" onClick={() => deleteOnClick(id)}/>
    );
}

export default ImgItem;
