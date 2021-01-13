import React from "react";
import { Spin } from 'antd';

import ImgItem from "../imgItem";

const MainContent = ({ loaders, setDelete }) => {

    let ArraySpin = Object.values(loaders);

    const deleteOnClick = (id) => {
        setDelete({ status: 'delete', id })
    }

    const loaderMap = ArraySpin.map((item, index) => {

        if (item.status === "done") {
            return <ImgItem
                        src={item.imageURL}
                        id={item.id}
                        key={index}
                        deleteOnClick={deleteOnClick}
                    />
        } else if (item.status === 'error') {
            return null
        } else {
            return <div key={index}>
                        <Spin />
                    </div>
        }
    })

    return (
        <div className={"main__content"} id="main__content">
                {loaderMap}
        </div>
    );
}

export default MainContent;
