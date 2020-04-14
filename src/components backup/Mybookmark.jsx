import React, { useState } from "react";
import { IconContext } from "react-icons"
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { Button } from "react-bootstrap"

function Mybookmark(props) {
    const [isSaved, setSaved] = useState(false);
    const [favList, setFavList] = useState([]);
    const article = null;

    const handleClick = () => {

        if (isSaved) {
            // const index = favList.indexOf(article)
            // if(index > -1) {
            //     setFavList(favList.splice(index, 1));
            // }
        }
        else {
            // setFavList(...favList, article);
        }
        setSaved(!isSaved);
    }

    return (
        <span margin="100px">
            <Button variant='link' onClick={handleClick}>
                <IconContext.Provider value={{ color: "red", className: "bookmark-icon" }}>
                    {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                </IconContext.Provider>
            </Button>
        </span>
    );
}

export default Mybookmark;