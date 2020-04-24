import React, { useState } from "react"
import Switch from "react-switch"
import { FormControl, Navbar, Nav, Form } from "react-bootstrap"
import { IconContext } from "react-icons"
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { Button, Dropdown } from "react-bootstrap"
import Select from "react-select"
import SearchBox from "./SearchBox"
import ReactTooltip from "react-tooltip";

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
        var url = '/api?type=' + type + '&cat=' + cat;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var jsonObj = JSON.parse(xhr.responseText);
            props.changeContent({ name: cat, body: jsonObj.results });
            props.onLoading(false);
        };
        xhr.open('GET', url, true);
        xhr.send();
        props.onLoading(true, '/');
        
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
        props.onLoading(false);
    }

    function SearchReq(q) {
        var query = q.label;
        if (props.switchst) {
            var type = 'guardian'
        } else {
            var type = 'nyt'
        }
        onSelected("query");
        var url = '/api?type=' + type + '&query=' + query;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () { RenderSearch(this); };
        xhr.onerror = function () { console.log('error happens') };
        xhr.open('GET', url, true);
        xhr.send();
        props.onLoading(true, '/search');
    }
    /******** bing search **********/

    const [inputValue, setInputValue] = useState();
    const handleInputChange = (newValue) => {setInputValue(newValue); return inputValue};



    /********** Init ************/
    function InitHome() {
        if (selected==='') {
            onSelected('home');
            tcSectionReq('nyt', 'home');
        }
    }
    return (
        <Navbar className="bg-grad navbar-dark" expand="lg">
        <ReactTooltip />
        {InitHome()}
            <SearchBox searchReq={SearchReq} inputValue={inputValue} handleInputChange={handleInputChange}/>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between"> 
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link href="" style={{margin:'0.5rem',padding:'0'}}>
                            <span onClick={SectionReq} className='navkey' style={!selected.localeCompare("home") ? { color: 'white' } : {}} >
                                Home
                            </span>
                        </Nav.Link>
                        <Nav.Link href="" style={{margin:'0.5rem',padding:'0'}}>
                            <span onClick={SectionReq} className='navkey' style={!selected.localeCompare("world") ? { color: 'white' } : {}}>
                                World
                            </span>
                        </Nav.Link>
                        <Nav.Link href="" style={{margin:'0.5rem',padding:'0'}}>
                            <span onClick={SectionReq} className='navkey' style={!selected.localeCompare("politics") ? { color: 'white' } : {}}>
                                Politics
                            </span>
                        </Nav.Link>
                        <Nav.Link href="" style={{margin:'0.5rem',padding:'0'}}>
                            <span onClick={SectionReq} className='navkey' style={!selected.localeCompare("business") ? { color: 'white' } : {}}>
                                Business
                        </span>
                        </Nav.Link>
                        <Nav.Link href="" style={{margin:'0.5rem',padding:'0'}}>
                            <span onClick={SectionReq} className='navkey' style={!selected.localeCompare("technology") ? { color: 'white' } : {}}>
                                Technology
                        </span>
                        </Nav.Link>
                        <Nav.Link href="" style={{margin:'0.5rem',padding:'0'}}>
                            <span onClick={SectionReq} className='navkey' style={!selected.localeCompare("sports") ? { color: 'white' } : {}}>
                                Sports
                        </span>
                        </Nav.Link>
                    </Nav>
                </Form>

                <Form inline>
                <Nav>
                    <Nav.Item style={{padding:'0'}}>
                    <span margin="16.25rem">
                        <Button data-tip="Bookmark" variant='link' onClick={() => { onSelected("favorites"); props.onLoading(false, '/favorites'); }}>
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
