import React from "react"
import { IoMdShare } from "react-icons/io"
import Popup from "reactjs-popup"
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton,
    FacebookIcon, TwitterIcon, EmailIcon
} from "react-share";


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
                    <div className='content' style={{fontSize:'1rem',width:'370px'}}>{props.title}</div>
                    <hr />
                    <div className='header' style={{fontSize:'1rem',textAlign:'center'}}>Share via</div>
                    <div>
                        <div style={{padding:'0 40px', display:'inline'}}>
                        <FacebookShareButton url={props.url} quote={hashtag} children="">
                            <FacebookIcon size={50} round={true} />
                        </FacebookShareButton>
                        </div>
                        <div style={{padding: '0 40px', display:'inline' }}>
                        <TwitterShareButton url={props.url} hashtags={[hashtag]} children="">
                            <TwitterIcon size={50} round={true} />
                        </TwitterShareButton>
                        </div>
                        <div style={{padding: '0 40px', display:'inline' }}>
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