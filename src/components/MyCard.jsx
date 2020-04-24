import React from "react";
import { Card } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import ShareModel from "./ShareModel"

const guardianLogo = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
const nytLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'

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

function DetailReq(switchst, id, onLoading, section) {
    var type = switchst ? 'guardian' : 'nyt';
    onLoading(true, '/news?id='+id+'&type='+type+'&section='+section);
};

function MyCard(props) {
    
    return (
            <Card className='shadow p-4 bg-white' style={{margin: '1.5rem 1rem 3rem', borderRadius: 8 }}>
                <div className='row'>
                    <div onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.section) }}
                    className='col-lg-3'>
                        <Card.Img className='toplineImg' variant='' src={props.image !== undefined ? props.image :
                  (props.switchst ? guardianLogo : nytLogo)} />
                    </div>
                    <div className='col-lg-9'>
                        <Card.Body style={{padding:"0"}}>
                            <Card.Title>
                            <div className='il italic' onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.section) }}>
                                {props.title}
                            </div>
                            <ShareModel
                                title={props.title}
                                url={props.url}
                            />
                            </Card.Title>
                            <Card.Text className='truncateDescription' onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.section) }}>
                                {props.description}
                            </Card.Text>
                            <div>
                                <div className='NewsDate'>{props.date.substring(0,10)}</div>
                                <div className={'NewsTag '+props.section+'Tag'}>{props.section === undefined ? undefined : props.section.toUpperCase()}</div>
                            </div>
                        </Card.Body>
                    </div>
                </div>
            </Card>
    );
}

function SchCard(props) {
    return (
            <div className='col-lg-3' style={{ display: 'inline-block' }}>
                <Card className='shadow p-3 mb-5 bg-white rounded'>
                    <Card.Title>
                    <p style={{display: 'inline'}} onClick={() => { DetailReq(props.switchst, props.id, props.onLoading,props.section) }}>
                        {props.title.length>42 ? props.title.substring(0,40)+'...' : props.title}
                    </p>
                     <ShareModel title={props.title} url={props.url} />
                    </Card.Title>
                    <Card.Img onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.section) }}
                        className='toplineImg' variant=''
                        src={props.image !== undefined ? props.image : (props.switchst ? guardianLogo : nytLogo)} />
                    <div>
                        <div className='NewsDate'>{props.date.substring(0,10)}</div>
                        <div className={'NewsTag '+props.section+'Tag'}>{props.section === undefined ? undefined : props.section.toUpperCase()}</div>
                    </div>
                </Card>
            </div>
    );
}

function BmCard(props) {
    return (
        <div className='col-lg-3' style={{ display: 'inline-block' }}>
            <ToastContainer />
            <Card className='shadow p-3 mb-5 bg-white rounded' style={{margin: '1.5rem 0'}}>
                <Card.Title >
                    <p style={{display: 'inline'}} onClick={() => { DetailReq(props.switchst, props.id, props.onLoading,props.section) }}>
                        {props.title.length>42 ? props.title.substring(0,40)+'...' : props.title}
                    </p>
                    <ShareModel title={props.title} url={props.url} />
                    <FaTrash onClick={(e) => {notify("Removing ",props.title); 
                        props.decCardNum();
                        props.removeBmContent(props.id);}} />
                </Card.Title>
                <Card.Img className='toplineImg' variant='' src={props.image !== undefined ? props.image : (props.switchst ? guardianLogo : nytLogo)} onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.section) }} />
                <div>
                    <div className='NewsDate'>{props.date.substring(0,10)}</div>
                    <div className={'NewsTag '+(props.switchst ? 'guardian' : 'nytimes')+'Tag'} >{props.switchst ? 'GUARDIAN' : 'NYTIMES'}</div>
                    <div className={'NewsTag '+props.section+'Tag'} >{props.section === undefined ? undefined : props.section.toUpperCase()}</div>
                </div>
            </Card>
        </div>);
}

export default MyCard;
export { SchCard, BmCard };