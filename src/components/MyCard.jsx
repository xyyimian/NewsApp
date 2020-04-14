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

function DetailReq(switchst, id, onLoading, callback, section) {
    var type = switchst ? 'guardian' : 'nyt'
    var url = 'http://127.0.0.1:5000/api?type=' + type + '&nid=' + id;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var jsonObj = JSON.parse(this.responseText)
        callback({ name: "news", body: jsonObj.results, id: id, switchst: switchst, section: section });
        onLoading(false, '/news');
    };
    xhr.open('GET', url, true);
    xhr.send();
    onLoading(true);
};



function MyCard(props) {
    return (
            <Card className='shadow p-3 mb-5 bg-white' style={{margin: '2% 1%', borderRadius: 8 }}>
                <div className='row'>
                    <div onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.changeContent, props.section) }}
                    className='col-lg-3'>
                        <Card.Img className='toplineImg' variant='' src={props.image} />
                    </div>
                    <div className='col-lg-9'>
                        <Card.Body>
                            <Card.Title>
                            <div className='ib' onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.changeContent, props.section) }}>
                                {props.title}
                            </div>                            
                            <ShareModel
                                title={props.title}
                                url={props.url}
                            />
                            </Card.Title>
                            <Card.Text className='truncateDescription'>
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
        <a onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.changeContent) }}>
            <div className='col-lg-3' style={{ display: 'inline-block' }}>
                <Card className='shadow p-3 mb-5 bg-white rounded'>
                    <Card.Title className='truncateTitle'>{props.title}}</Card.Title>
                    <Card.Img className='toplineImg' variant=''
                        src={props.image} />
                    <div>
                        <div className='NewsDate'>{props.date.substring(0,10)}</div>
                        <div className='NewsTag'>{props.section === undefined ? undefined : props.section.toUpperCase()}</div>
                    </div>
                </Card>
            </div>
        </a>
    );
}

function BmCard(props) {
    return (
        <div className='col-lg-3' style={{ display: 'inline-block' }}>
            <ToastContainer />
            <Card className='shadow p-3 mb-5 bg-white rounded' style={{margin: '2% 0'}}>
                <Card.Title >
                    <p className='truncateTitle' onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.changeContent, props.section) }}>{props.title}</p>
                    <FaTrash onClick={() => {notify("Removing ",props.title); props.removeBmContent(props.id); props.onLoading(false, '/favorites'); }} />
                </Card.Title>
                <Card.Img className='toplineImg' variant='' src={props.image} onClick={() => { DetailReq(props.switchst, props.id, props.onLoading, props.changeContent, props.section) }} />
                <div>
                    <div className='NewsDate'>{props.date.substring(0,10)}</div>
                    <div className={'NewsTag '+props.section+'Tag'}>{props.section === undefined ? undefined : props.section.toUpperCase()}</div>
                    <div className={'NewsTag '+(props.switchst ? 'guardian' : 'nytimes')+'Tag'}>{props.switchst ? 'GUARDIAN' : 'NYTIMES'}</div>
                </div>
            </Card>
        </div>);
}

export default MyCard;
export { SchCard, BmCard };