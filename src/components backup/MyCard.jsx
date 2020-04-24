import React from "react";
import { Card } from "react-bootstrap";

function MyCard(props) {
    return (
        <Card className='shadow p-3 mb-5 bg-white rounded' style={{ width: '100%', marginTop: '2%' }}>
            <div className='row'>
                <div className='col-lg-3'>
                    <Card.Img className='toplineImg' variant='' src={props.image} />
                </div>
                <div className='col-lg-9'>
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text>
                            {props.description}
                        </Card.Text>
                        <div>
                            <div className='NewsDate'>{props.date}</div>
                            <div className='NewsTag'>{props.section}</div>
                        </div>
                    </Card.Body>
                </div>
            </div>
        </Card>
    );
}

function SchCard(props) {
    return (
        <div className='col-lg-3' style={{display: 'inline-block'}}>
            <Card className='shadow p-3 mb-5 bg-white rounded'>
                <Card.Title className='truncate'>{props.title}}</Card.Title>
                <Card.Img className='toplineImg' variant='' 
                    src={props.image} />
                    <div>
                        <div className='NewsDate'>{props.date}</div>
                        <div className='NewsTag'>{props.section}</div>
                    </div>   
            </Card>
        </div>
    );
}

export default MyCard;
export {SchCard};