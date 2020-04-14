import React, { useState } from "react"
import Switch from "react-switch"
import { FormControl, Navbar, Nav, Form } from "react-bootstrap"
import { IconContext } from "react-icons"
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { Button, Dropdown } from "react-bootstrap"
import InputGroup from 'react-bootstrap/InputGroup'
import Select from "react-select"

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
    const bing_key = '4d04d04e40264f9a8ea2c88fa1fbedee'

    function bingAutosuggest(query){
        console.log(query)
        var endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/Suggestions";
        var request = new XMLHttpRequest();
        try {
            request.open('GET', endpoint + "?q=" + encodeURIComponent(query));
        } catch (error) {
            console.log(error);
            return false;
        }
        request.setRequestHeader("Ocp-Apim-Subscription-Key", bing_key);
        request.addEventListener('load', function() {
            if(this.status == 200){
                renderSearchResults(JSON.parse(this.responseText));
            }
            else{
                console.log(this.status)
                console.log(this.statusText)
            }
        })
        request.send();
        return false;
    }    
    function renderSearchResults(results) {
        
        setSchOpt(results.suggestionGroups[0].searchSuggestions.map((e, index) => {return {label: e.displayText, value: index}} ))
        console.log(searchOptions);
    }
    const [searchOptions, setSchOpt] = useState([ { label: 'No Match', value: 1 }])

    /************dropdown***********/
    const loadOptions = (inputValue) => {
        bingAutosuggest(inputValue);
    }

    const [query, setQuery] = useState("");

    const handleSchQuery = (newValue, callback) => {
        const inputValue = newValue.replace(/\W/g, "");
        bingAutosuggest(inputValue);
        return inputValue;
    };




    /******************************/

    return (
        <Navbar className="bg-grad" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Form inline onKeyUp={(e) => bingAutosuggest(e.target.value)} onSubmit={SearchReq}>
{/*                     
                    <Dropdown name='dropdown'>
                        <InputGroup>
                        <FormControl type="text" placeholder="Enter keyword .." name='qvalue' style={{borderTopWidth:'2px',borderBottomWidth:'2px',borderColor:'white'}}/>
                        <InputGroup.Append style={{backgroundColor:'white',paddingTop:'5px',color:'#cccccc'}}>|</InputGroup.Append>
                        <InputGroup.Append>
                        <Dropdown.Toggle id='dropdown-split-basic' style={{backgroundColor:'white',border:'0px',color:'#cccccc'}}/>
                        <Dropdown.Menu>
                            {searchOptions.map((info, index) => {
                                return(
                                    <Dropdown.Item key={index}>{info}</Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                        
                        </InputGroup.Append>
                        </InputGroup>
                    </Dropdown> */}


                    <Select 
                        onInputChange={handleSchQuery}
                        placeholder={'Enter Keyword..'} 
                        options={searchOptions}/>
                    <Nav>
                        <Nav.Link onClick={SectionReq} href="">
                            <span className={'navkey'+!selected.localeCompare("home") && 'sel-navkey'} >
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
                        <Button variant='link' onClick={() => {onSelected("favorites"); props.onLoading(false, '/favorites'); }}>
                            <IconContext.Provider value={{ color: "white", className: "bookmark-icon" }}>
                                {props.path === "/favorites" ? <FaBookmark /> : <FaRegBookmark />}
                            </IconContext.Provider>
                        </Button>
                    </span>
                    {props.path !== "/search" && props.path !== "/favorites" && props.path !== "/news" &&
                        <div>
                            <Navbar.Text style={{color:'#ffffff',padding:'0 10px 0 0'}}>NYTimes</Navbar.Text>
                            <div style={{display: 'inline-block'}}>
                                <div style={{float: 'left',height: '50%',marginBottom: '-15px'}}>
                                    <Switch onColor={'#0387ee'} checked={props.switchst} onChange={handleSwitch} value={props.switchst} draggable={false} checkedIcon={false} uncheckedIcon={false} />
                                </div>
                            </div>
                                <Navbar.Text style={{color:'#ffffff',padding:'0 10px 0 8px'}}>Guardian</Navbar.Text>
                            </div>
                    }
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;