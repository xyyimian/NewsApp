import React, { useState } from "react"
import Switch from "react-switch"
import { FormControl, Navbar, Nav, Form } from "react-bootstrap"
import { IconContext } from "react-icons"
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { Button, Dropdown } from "react-bootstrap"
import Select from "react-select"
import SearchBox from "./SearchBox"
import {useLocation} from "react-router-dom";

function MyNavbar(props) {
    const [selected, setSelected] = useState('');
    function onSelected(newSelected) {
        setSelected(newSelected);
    }
    /******************************/
    function handleSwitch() {
        tcSectionReq(props.switchst ? 'nyt' : 'guardian', selected);
        props.onSwitch();
    }
    /******************************/
    function tcSectionReq(type, cat) {
        onSelected(cat);
        var url = 'http://127.0.0.1:5000/api?type=' + type + '&cat=' + cat;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () { 
            var jsonObj = JSON.parse(xhr.responseText);
            props.changeContent({ name: cat, body: jsonObj.results });
            props.onLoading(false);
        };
        xhr.open('GET', url, true);
        xhr.send();
        props.onLoading(true, '/?section='+cat+'&type='+type);
    }
    function SectionReq(event) {
        if (props.switchst) {
            var type = 'guardian'
        } else {
            var type = 'nyt'
        }
        var cat = event.target.innerHTML.toLowerCase();
        tcSectionReq(type, cat);
    }
    /*********bing search**********/
    function RenderSearch(xhr) {
        var jsonObj = JSON.parse(xhr.responseText)
        props.changeContent({ name: 'search', body: jsonObj.results })
        props.onLoading(false, '/search');
    }

    function SearchReq(q) {
        var query = q.label;
        if (props.switchst) {
            var type = 'guardian'
        } else {
            var type = 'nyt'
        }
        onSelected("query");
        var url = 'http://127.0.0.1:5000/api?type=' + type + '&query=' + query;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () { RenderSearch(this); };
        xhr.onerror = function () { console.log('error happens') };
        xhr.open('GET', url, true);
        xhr.send();
        props.onLoading(true);
    }

    /********** Init ************/
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let usequery = useQuery();
    console.log(usequery.get("section"));
    if ((selected!=null&&usequery.get("section")!=null&&selected.localeCompare(usequery.get("section")))||
        (!'guardian'.localeCompare(usequery.get("type"))&&!props.switchst)||
        (!'nyt'.localeCompare(usequery.get("type"))&&props.switchst)){
        if((!'guardian'.localeCompare(usequery.get("type"))&&!props.switchst)||
        (!'nyt'.localeCompare(usequery.get("type"))&&props.switchst)){
            props.onSwitch();
        }
        onSelected(usequery.get("section"));
        tcSectionReq(usequery.get("type"), usequery.get("section"));
    }
    return (
        <Navbar className="bg-grad" expand="lg">
            <SearchBox searchReq={SearchReq}/>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between"> 
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={SectionReq} href={"?section=home&type="+props.switchst?'guardian':'nyt'} style={{margin:'8px',padding:'0'}}>
                            <span className='navkey' style={selected&&(!selected.localeCompare("home")) ? { color: 'white' } : {}} >
                                Home
                            </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href={"?section=world&type="+props.switchst?'guardian':'nyt'} style={{margin:'8px',padding:'0'}}>
                            <span className='navkey' style={selected&&(!selected.localeCompare("world")) ? { color: 'white' } : {}}>
                                World
                            </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href={"?section=politics&type="+props.switchst?'guardian':'nyt'} style={{margin:'8px',padding:'0'}}>
                            <span className='navkey' style={selected&&(!selected.localeCompare("politics")) ? { color: 'white' } : {}}>
                                Politics
                            </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href={"?section=business&type="+props.switchst?'guardian':'nyt'} style={{margin:'8px',padding:'0'}}>
                            <span className='navkey' style={selected&&(!selected.localeCompare("business")) ? { color: 'white' } : {}}>
                                Business
                        </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href={"?section=technology&type="+props.switchst?'guardian':'nyt'} style={{margin:'8px',padding:'0'}}>
                            <span className='navkey' style={selected&&(!selected.localeCompare("technology")) ? { color: 'white' } : {}}>
                                Technology
                        </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href={"?section=sports&type="+props.switchst?'guardian':'nyt'} style={{margin:'8px',padding:'0'}}>
                            <span className='navkey' style={selected&&(!selected.localeCompare("sports")) ? { color: 'white' } : {}}>
                                Sports
                        </span>
                        </Nav.Link>
                    </Nav>
                </Form>

                <Form inline>
                <Nav>
                    <Nav.Item style={{padding:'0'}}>
                    <span margin="100px">
                        <Button variant='link' onClick={() => { onSelected("favorites"); props.onLoading(false, '/favorites'); }}>
                            <IconContext.Provider value={{ color: "white", className: "bookmark-icon" }}>
                                {props.path === "/favorites" ? <FaBookmark /> : <FaRegBookmark />}
                            </IconContext.Provider>
                        </Button>
                    </span>
                    </Nav.Item>
                    
                    {props.path !== "/search" && props.path !== "/favorites" && props.path.substring(0,5) !== "/news" &&
                        <Nav>
                            <Nav.Item style={{padding:'0',display: 'inline-block'}}>
                                <Navbar.Text style={{ color: '#ffffff', padding:'7px 2px 3px 8px' }}>NYTimes</Navbar.Text>
                            </Nav.Item>
                            <Nav.Item style={{padding:'0',display: 'inline-block'}}>
                                <div style={{ float: 'left', height: '50%', margin: '7px 2px 3px 8px'}}>
                                    <Switch onColor={'#0387ee'} checked={props.switchst} onChange={handleSwitch} value={props.switchst} draggable={false} checkedIcon={false} uncheckedIcon={false} />
                                </div>
                            </Nav.Item>
                            <Nav.Item style={{padding:'0',display: 'inline-block'}}>
                                <Navbar.Text style={{ color: '#ffffff', padding:'7px 2px 3px 8px' }}>Guardian</Navbar.Text>
                            </Nav.Item>
                        </Nav>
                    }
                    
                </Nav>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;
