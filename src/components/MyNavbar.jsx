import React, { useState } from "react"
import Switch from "react-switch"
import { FormControl, Navbar, Nav, Form } from "react-bootstrap"
import { IconContext } from "react-icons"
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { Button, Dropdown } from "react-bootstrap"
import Select from "react-select"
import SearchBox from "./SearchBox"

function MyNavbar(props) {
    const [selected, setSelected] = useState('home');
    function onSelected(newSelected) {
        setSelected(newSelected);
    }
    /******************************/
    function handleSwitch() {
        tcSectionReq(props.switchst ? 'nyt' : 'guardian', selected);
        props.onSwitch();
    }
    /******************************/
    function RenderSection(xhr, cat) {
        var jsonObj = JSON.parse(xhr.responseText)
        props.changeContent({ name: cat, body: jsonObj.results })
        props.onLoading(false, '/');
    }
    function tcSectionReq(type, cat) {
        onSelected(cat);
        var url = 'http://127.0.0.1:5000/api?type=' + type + '&cat=' + cat;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () { RenderSection(this, cat) };
        xhr.open('GET', url, true);
        xhr.send();
        props.onLoading(true);
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
    /******************************/
    function RenderSearch(xhr) {
        var jsonObj = JSON.parse(xhr.responseText)
        props.changeContent({ name: 'search', body: jsonObj.results })
        props.onLoading(false, '/search');
    }

    function SearchReq(event) {
        event.preventDefault()
        var query = event.target.qvalue.value;
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
    /******************************/
    //bing search

    /************dropdown***********/



    /********** Init ************/
    const [init, setInit] = useState(true);
    function InitHome() {
        if (init) {
            setInit(false);
            tcSectionReq('nyt', 'home');
        }
    }
    return (
        <Navbar className="bg-grad" expand="lg">
        {InitHome()}
            <SearchBox />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between"> 
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={SectionReq} href="">
                            <span className='navkey' style={!selected.localeCompare("home") ? { color: 'white' } : {}} >
                                Home
                            </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href="">
                            <span className='navkey' style={!selected.localeCompare("world") ? { color: 'white' } : {}}>
                                World
                            </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href="">
                            <span className='navkey' style={!selected.localeCompare("politics") ? { color: 'white' } : {}}>
                                Politics
                            </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href="">
                            <span className='navkey' style={!selected.localeCompare("business") ? { color: 'white' } : {}}>
                                Business
                        </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href="">
                            <span className='navkey' style={!selected.localeCompare("technology") ? { color: 'white' } : {}}>
                                Technology
                        </span>
                        </Nav.Link>
                        <Nav.Link onClick={SectionReq} href="">
                            <span className='navkey' style={!selected.localeCompare("sports") ? { color: 'white' } : {}}>
                                Sports
                        </span>
                        </Nav.Link>
                    </Nav>
                </Form>

                <Form inline>
                    <span margin="100px">
                        <Button variant='link' onClick={() => { onSelected("favorites"); props.onLoading(false, '/favorites'); }}>
                            <IconContext.Provider value={{ color: "white", className: "bookmark-icon" }}>
                                {props.path === "/favorites" ? <FaBookmark /> : <FaRegBookmark />}
                            </IconContext.Provider>
                        </Button>
                    </span>
                    {props.path !== "/search" && props.path !== "/favorites" && props.path !== "/news" &&
                        <div>
                            <Navbar.Text style={{ color: '#ffffff', padding: '0 10px 0 0' }}>NYTimes</Navbar.Text>
                            <div style={{ display: 'inline-block' }}>
                                <div style={{ float: 'left', height: '50%', marginBottom: '-15px' }}>
                                    <Switch onColor={'#0387ee'} checked={props.switchst} onChange={handleSwitch} value={props.switchst} draggable={false} checkedIcon={false} uncheckedIcon={false} />
                                </div>
                            </div>
                            <Navbar.Text style={{ color: '#ffffff', padding: '0 10px 0 8px' }}>Guardian</Navbar.Text>
                        </div>
                    }
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;
