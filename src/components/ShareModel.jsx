import React from "react"
import { IoMdShare } from "react-icons/io"
import Popup from "reactjs-popup"
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton,
    FacebookIcon, TwitterIcon, EmailIcon
} from "react-share";
import { FaAutoprefixer } from "react-icons/fa";


function ShareModel(props){
    const hashtag = "CSCI_571_NewsApp";


    const contentStyle = {
        maxWidth: '412px',
        width: '90%',
        height: '162px',
        padding: '10px',
        borderRadius: '4px',
        margin: '30px auto'
      };

    return(
        <Popup trigger={<button className='unstyled-but'><IoMdShare /></button>} modal contentStyle={contentStyle}> 
            {close => {return (
                <div className="mymodal">
                    <a className='close' onClick={close}>&times;</a>
                    <div className='content truncateDescription2 ShMod-title'>{props.title}</div>
                    <hr />
                    <div className='header ShMod-via'>Share via</div>
                    <div>
                        <div className="ShMod-icon il">
                        <FacebookShareButton url={props.url} quote={'#' + hashtag} children="">
                            <FacebookIcon size={50} round={true} />
                        </FacebookShareButton>
                        </div>
                        <div className="ShMod-icon il">
                        <TwitterShareButton url={props.url} hashtags={[hashtag]} children="">
                            <TwitterIcon size={50} round={true} />
                        </TwitterShareButton>
                        </div>
                        <div className="ShMod-icon il">
                        <EmailShareButton subject={'#' + hashtag} url={props.url}>
                            <EmailIcon size={50} round={true} />
                        </EmailShareButton>       
                        </div>           
                    </div>
                </div>
            )}}
        </Popup>
    );
}

export default ShareModel;