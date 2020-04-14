import React from "react"
import { IoMdShare } from "react-icons/io"
import Popup from "reactjs-popup"
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton,
    FacebookIcon, TwitterIcon, EmailIcon
} from "react-share";


function ShareModel(props){
    console.log(props)
    const hashtag = "CSCI_571_NewsApp";


    const contentStyle = {
        maxWidth: '600px',
        width: '90%',
        height: '300px'
      };

    return(
        <Popup trigger={<button className='unstyled-but'><IoMdShare /></button>} modal contentStyle={contentStyle}> 
            {close => {return (
                <div className="mymodal">
                    <a className='close' onClick={close}>&times;</a>
                    <div className='content'>{props.title}</div>
                    <div className='header'>Share via</div>
                    <div>
                        <FacebookShareButton url={props.url} quote={hashtag} children="">
                            <FacebookIcon size={25} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={props.url} hashtags={[hashtag]} children="">
                            <TwitterIcon size={25} round={true} />
                        </TwitterShareButton>
                        <EmailShareButton subject={'#' + hashtag} url={props.url}>
                            <EmailIcon size={25} round={true} />
                        </EmailShareButton>                        
                    </div>
                </div>
            )}}
        </Popup>
    );
}

export default ShareModel;