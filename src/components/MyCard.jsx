import React from "react";
import { Card } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShareModel from "./ShareModel"

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
            <Card className='shadow p-3 mb-5 bg-white' style={{margin: '2% 1%', borderRadius: 8 }}>
                <div className='row'>
                    <div onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.section) }}
                    className='col-lg-3'>
                        <Card.Img className='toplineImg' variant='' src={props.image} />
                    </div>
                    <div className='col-lg-9'>
                        <Card.Body>
                            <Card.Title>
                            <div className='ib' onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.section) }}>
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
                        src={props.image} />
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
            <Card className='shadow p-3 mb-5 bg-white rounded' style={{margin: '2% 0'}}>
                <Card.Title >
                    <p style={{display: 'inline'}} onClick={() => { DetailReq(props.switchst, props.id, props.onLoading,props.section) }}>
                        {props.title.length>42 ? props.title.substring(0,40)+'...' : props.title}
                    </p>
                    <ShareModel title={props.title} url={props.url} />
                    <FaTrash onClick={() => {notify("Removing ",props.title); props.removeBmContent(props.id); props.onLoading(false, '/favorites'); }} />
                </Card.Title>
                <Card.Img className='toplineImg' variant='' src={props.image} onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.section) }} />
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