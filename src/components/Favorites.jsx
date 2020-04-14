import React from "react";
import {BmCard} from "./MyCard";

function Favorites(props) {
    console.log(props.BmContent);
    return (
      <div>
      <div className='indicator'>Favorites</div>
        {props.BmContent.length === 0 ?
          <p>You have no saved articles</p>
          :
          props.BmContent.map((info, index) => {
            return (
              <BmCard
                onLoading={props.onLoading}
                switchst={info.switchst}
                changeContent={props.changeContent}
                removeBmContent={props.removeBmContent}
                key={index}
                id={info.id}
                title={info.title}
                section={info.section}
                image={info.image}
                date={info.date}
              />
          )})
        }
      </div>
    );
}

export default Favorites;
