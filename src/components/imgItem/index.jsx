import React from "react";

function ImgItem({ src, id, deleteOnClick }) {

    return (
        <img height="200" src={src} key={id} alt="" onClick={() => deleteOnClick(id)}/>
    );
}

export default ImgItem;
