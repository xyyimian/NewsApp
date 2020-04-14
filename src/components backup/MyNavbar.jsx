import React, { useState } from "react"
import Mybookmark from "./Mybookmark"
import Switch from "react-switch"
import { FormControl, Navbar, Nav, Form, Card } from "react-bootstrap"

function CreateCard(info){
    return (
        <MyCard 
        key={info.id}
        title={info.title}
        description={info.description}
        section={info.section}
        image={info.image}
        date={info.date}
        />
    )
}

function MyNavbar() {
    const [switchst, setswitchst] = useState(false)
    //false => NYT
    //true => guardian
    

    function handleSwitch() {
        setswitchst(!switchst);
    }

    function MyRender(xhr){
        var jsonObj = JSON.parse(xhr.responseText)
        console.log(jsonObj)

        
        
        if(jsonObj.type === 'guardian'){
            if(jsonObj.func === 'cat'){
                // title = jsonObj.response.results;
            }else if(jsonObj.func === 'query'){
    
            }
        }
        else if(jsonObj.type === 'nyt'){
            if(jsonObj.func === 'cat'){
    
            }
            else if(jsobObj.func === 'query'){
    
            }
        }
            
    }

    function DoSearch(event){
        var isSchViaCat;
        var type;
        if(switchst){
            type = 'guardian'
        }else{
            type = 'nyt'
        }
        if(event.keyCode === 13){
            event.preventDefault();
            var query = event.target.value;
            isSchViaCat = false;
        }
        else{
            var cat = event.target.innerHTML.toLowerCase();
            isSchViaCat = true;
        }
        var url = 'http://127.0.0.1:5000/api?type=' + type + '&';
        if(isSchViaCat)
            url += 'cat=' + cat;
        else
            url += 'query=' + query;
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){MyRender(this)};
        xhr.open('GET', url, true);
        xhr.send();
    }



    return (
        <Navbar className="bg-grad" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Form inline>
                    <FormControl type="text" placeholder="Enter keyword .." onKeyUp={DoSearch}/>
                    <Nav>
                        <Nav.Link onClick={DoSearch} href="#Home"><span className='navkey'>Home</span></Nav.Link>
                        <Nav.Link onClick={DoSearch} href="#World"><span className='navkey'>World</span></Nav.Link>
                        <Nav.Link onClick={DoSearch} href="#Politics"><span className='navkey'>Politics</span></Nav.Link>
                        <Nav.Link onClick={DoSearch} href="#Business"><span className='navkey'>Business</span></Nav.Link>
                        <Nav.Link onClick={DoSearch} href="#Technology"><span className='navkey'>Technology</span></Nav.Link>
                        <Nav.Link onClick={DoSearch} href="#Sports"><span className='navkey'>Sports</span></Nav.Link>
                    </Nav>
                </Form>
                <Form inline>
                    <Mybookmark />
                    <Navbar.Text>NYTimes</Navbar.Text>
                    <Switch checked={false} onChange={handleSwitch} value={switchst} draggable={false} checkedIcon={false} uncheckedIcon={false} />
                    <Navbar.Text>Guardian</Navbar.Text>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;