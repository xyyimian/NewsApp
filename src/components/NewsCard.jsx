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

const guardianLogo = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
const nytLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

function NewsCard(props) {
    const hashtag = "CSCI_571_NewsApp"
    const [open, setOpen] = useState(false);
    const [isSaved, setSaved] = useState((props.BmContent.findIndex(news => news.id === props.id) !== -1) ? true : false);
    function notify(test,title) {
        toast(test + title, {
            position: "top-center",
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

    var stringArray = props.description.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    return (
        <div>
            <ToastContainer />
            <ReactTooltip />
            <Card className='shadow p-3 m-3 bg-white rounded news-card'>
                <Card.Title className='italic'>{props.title}</Card.Title>
                <Card.Text>
                    <span className='italic news-card-date'>{props.date.substring(0,10)}</span>
                    <span className="news-card-share">
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

                    <span className="news-card-bookmark">
                        <Button data-tip='Bookmark' className="pt-0" variant='link' onClick={() => { handleClick() }}>
                            <IconContext.Provider value={{ color: "red", className: "bookmark-icon" }}>
                                {isSaved ? <FaBookmark size="1.3rem"/> : <FaRegBookmark size="1.3rem"/>}
                            </IconContext.Provider>
                        </Button>
                    </span>

                </Card.Text>
                <Card.Img src={props.image !== undefined ? props.image : (props.switchst ? guardianLogo : nytLogo)} />
                <Card.Body>
                    <div>
                        {open?props.description:stringArray.slice(0,4).join(' ')}
                    </div>
                    {stringArray.length >4 &&
                    <Button
                        variant={'link'}
                        className="fr"
                        onClick={() => { setOpen(!open) }}
                        ariaControls="collapse-text"
                        ariaExpanded={open}
                    >
                        <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                            {open ? <FaAngleUp /> : <FaAngleDown />}
                        </IconContext.Provider>
                    </Button>
                    }
                </Card.Body>
            </Card>
        </div>
    );
}

export default NewsCard;