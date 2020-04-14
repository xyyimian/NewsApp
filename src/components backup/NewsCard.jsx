import React, { useState } from "react"
import { Card, Button, Collapse } from "react-bootstrap";
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton,
    FacebookIcon, TwitterIcon, EmailIcon
} from "react-share";
import {IconContext} from "react-icons"
import {FaAngleDown, FaAngleUp} from "react-icons/fa"
import Mybookmark from "./Mybookmark"

function NewsCard(props) {
    const [open, setOpen] = useState(false);


    return (
        <Card className='shadow p-3 mb-5 bg-white rounded news-card'>
            <Card.Title>{props.title}}</Card.Title>
            <Card.Text>
                <span>{props.date}</span>
                <span style={{ float: 'right' }}>
                    <FacebookShareButton quote="" hashtag="">
                        <FacebookIcon size={25} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton title="" via="" related="">
                        <TwitterIcon size={25} round={true} />
                    </TwitterShareButton>
                    <EmailShareButton subject="" body="" separator="">
                        <EmailIcon size={25} round={true} />
                    </EmailShareButton>
                    <Mybookmark />
                </span>
            </Card.Text>
            <Card.Img src={props.image} />
            <Card.Body>
                <div>{props.description}</div>
                <Button 
                    variant={'link'}
                    style={{float: 'right'}}
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
    );
}

export default NewsCard;