import React, { useState } from "react";
import Home from "./Home";
import News from "./News";
import Search from "./Search";
import Favorites from "./Favorites";
import { Redirect } from "react-router-dom"

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MyNavbar from "./MyNavbar";
import MySpinners from "./MySpinners";


function App(props) {
  const [path, setPath] = useState("")
  const renderRedirect = () => {
    if (path !== '') {
      return <Redirect to={path} />
    }
  }
  const setRedirect = (newPath) => {
    setPath(newPath);
  }

  const [switchst, setswitchst] = useState(false);
  //false => NYT
  //true => guardian
  function handleSwitch() {
      setswitchst(prev=>!prev);
  }

  const [content, setContent] = useState({name: "section", body: []})
  function changeContent(newContent){
    setContent(newContent);
  }

  const cache = localStorage.getItem("bookmark");
  const [BmContent, setBmContent] = useState(cache?JSON.parse(cache):[]);
  function changeBmContent(newContent){
    localStorage.setItem("bookmark", JSON.stringify(newContent));
    setBmContent(newContent);
  }
  function addBmContent(newBookmark){
    var newContent;
    setBmContent(prevContent=>{
      newContent = [...prevContent,newBookmark];
      return newContent;
    });
    localStorage.setItem("bookmark", JSON.stringify(newContent));
  }
  function removeBmContent(id){
    setBmContent(prevContent=>{
      let ind = prevContent.findIndex(bm => bm.id === id);
      if(ind === -1){
        window.alert("ERROR: BOOKMARK NOT FOUND");
        localStorage.setItem("bookmark", JSON.stringify(prevContent));
        return prevContent;
      }
      prevContent.splice(ind, 1);
      localStorage.setItem("bookmark", JSON.stringify(prevContent));
      return prevContent;
    })
    
  }  

  const [loading, setLoading] = useState(false);
  function onLoading(newState,newRoute){
    setLoading(newState);
    if(newRoute !== undefined) setRedirect(newRoute);
  }

  

    return (
      <Router>
      {renderRedirect()}
      <div>
        <MyNavbar switchst={switchst} onSwitch={handleSwitch} content={content} changeContent={changeContent} onLoading={onLoading} path={path}/> 
        {loading ? <MySpinners /> :
        <Switch>
            <Route path='/news'>
              <News content={content} BmContent={BmContent} addBmContent={addBmContent} removeBmContent={removeBmContent}/>
            </Route>
            <Route path='/search'>
              <Search switchst={switchst} content={content} changeContent={changeContent} onLoading={onLoading}/>
            </Route>
            <Route path="/favorites">
              <Favorites switchst={switchst} content={content} changeContent={changeContent} BmContent={BmContent} 
                        removeBmContent={removeBmContent} onLoading={onLoading}/>
            </Route>
            <Route path="/">
              <Home switchst={switchst} content={content} changeContent={changeContent} onLoading={onLoading}/>
            </Route>
            
        </Switch>
        }
        </div>
      </Router>
    );
}

export default App;
