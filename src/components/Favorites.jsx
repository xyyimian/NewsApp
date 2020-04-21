import React, { useState } from "react";
import {BmCard} from "./MyCard";

function Favorites(props) {
  const [cardNum, setCardNum] = useState(props.BmContent.length);
  function changeCardNum(newValue) {
    setCardNum(newValue);
  }
  function decCardNum(){
    setCardNum(prev=>prev-1);
  }
    return (
      <div>
        {cardNum !== 0 ? 
        <div className='indicator' >Favorites</div> :
        <p className='no-save-ind' style={{textAlign:'center',fontSize:'1.5rem'}}>You have no saved articles</p>
        }
            {props.BmContent.map((info, index) => {
              return (
                <BmCard
                  onLoading={props.onLoading}
                  switchst={info.switchst}
                  changeContent={props.changeContent}
                  BmContent={props.BmContent}
                  removeBmContent={props.removeBmContent}
                  decCardNum={decCardNum}
                  key={index}
                  id={info.id}
                  url={info.url}
                  title={info.title}
                  section={info.section}
                  image={info.image}
                  date={info.date}
                />
            )})}
          </div>
      
    );
}

export default Favorites;
