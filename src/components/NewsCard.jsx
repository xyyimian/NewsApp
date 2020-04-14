import React, { useState } from "react"
import { Card, Button, Collapse } from "react-bootstrap";
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton,
    FacebookIcon, TwitterIcon, EmailIcon
} from "react-share";
import { IconContext } from "react-icons"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip";

function NewsCard(props) {
    const hashtag = "CSCI_571_NewsApp"
    const [open, setOpen] = useState(false);
    const [isSaved, setSaved] = useState((props.BmContent.findIndex(news => news.id === props.id) !== -1) ? true : false);
    function notify(test,title) {
        toast(test + title, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
    }
    const handleClick = () => {
        setSaved(prev => {
            if (prev) {
                notify("Removing - ",props.title);
                props.removeBmContent(props.id)
            }
            else {
                notify("Saving ",props.title);
                props.addBmContent({
                    id: props.id,
                    switchst: props.switchst,
                    title: props.title,
                    date: props.date,
                    image: props.image,
                    description: props.description,
                    url: props.url,
                    section: props.section
                })
            }
            return !prev;
        });
    }
    return (
        <div>
            <ToastContainer />
            <ReactTooltip />
            <Card className='shadow p-3 mb-5 bg-white rounded news-card'>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    <span>{props.date.substring(0,10)}</span>
                    <span style={{ float: 'right' }}>
                        <FacebookShareButton data-tip='Facebook' url={props.url} quote={hashtag} children="">
                            <FacebookIcon size={25} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton data-tip='Twitter' url={props.url} hashtags={[hashtag]} children="">
                            <TwitterIcon size={25} round={true} />
                        </TwitterShareButton>
                        <EmailShareButton data-tip='Email' subject={'#' + hashtag} url={props.url}>
                            <EmailIcon size={25} round={true} />
                        </EmailShareButton>
                    </span>

                    <span margin="100px">
                        <Button data-tip='Bookmark' variant='link' onClick={() => { handleClick() }}>
                            <IconContext.Provider value={{ color: "red", className: "bookmark-icon" }}>
                                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                            </IconContext.Provider>
                        </Button>
                    </span>

                </Card.Text>
                <Card.Img src={props.image} />
                <Card.Body>
                    <div>{props.description}</div>
                    <Button
                        variant={'link'}
                        style={{ float: 'right' }}
                        onClick={() => { setOpen(!open) }}
                        ariaControls="collapse-text"
                        ariaExpanded={open}
                    >
                        <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                            {open ? <FaAngleUp /> : <FaAngleDown />}
                        </IconContext.Provider>
                    </Button>
                    <Collapse in={open}>
                        <div id='collapse-text'>
                            Here are collapsed text;
                    </div>
                    </Collapse>
                </Card.Body>
            </Card>
        </div>
    );
}

export default NewsCard;