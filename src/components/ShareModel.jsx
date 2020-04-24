import React from "react"
import { IoMdShare } from "react-icons/io"
import Popup from "reactjs-popup"
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton,
    FacebookIcon, TwitterIcon, EmailIcon
} from "react-share";
import { FaAutoprefixer } from "react-icons/fa";
// import { useMediaQuery } from 'react-responsive'

function ShareModel(props){
    const hashtag = "CSCI_571_NewsApp";
    // const isMobile = useMediaQuery({ query: '(max-device-width: 480px)' });

    const contentStyle = {
        maxWidth: '25rem',
        width: '80%',
        height: '10.125rem',
        padding: '0.625rem',
        borderRadius: '0.25rem',
        margin: '1.875rem auto'
      };

    return(
        <Popup trigger={<button className='unstyled-but'><IoMdShare /></button>} modal contentStyle={contentStyle}> 
            {close => {return (
                <div className="mymodal">
                    <a className='close' onClick={close}>&times;</a>
                    <div className='content truncateDescription2' style={{fontSize:'1rem',width:'23.125rem'}}>{props.title}</div>
                    <hr />
                    <div className='header' style={{fontSize:'1rem',textAlign:'center'}}>Share via</div>
                    <div>
                        <div style={{padding:'0 2.5rem', display:'inline'}}>
                        <FacebookShareButton url={props.url} quote={'#' + hashtag} children="">
                            <FacebookIcon size={'50'} round={true} />
                        </FacebookShareButton>
                        </div>
                        <div style={{padding: '0 2.5rem', display:'inline' }}>
                        <TwitterShareButton url={props.url} hashtags={[hashtag]} children="">
                            <TwitterIcon size={'50'} round={true} />
                        </TwitterShareButton>
                        </div>
                        <div style={{padding: '0 2.5rem', display:'inline' }}>
                        <EmailShareButton subject={'#' + hashtag} url={props.url}>
                            <EmailIcon size={'50'} round={true} />
                        </EmailShareButton>       
                        </div>           
                    </div>
                </div>
            )}}
        </Popup>
    );
}

export default ShareModel;