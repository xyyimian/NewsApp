import React from "react";
import {BmCard} from "./MyCard";

function Favorites(props) {
    return (
      <div>
      <div className='indicator'>Favorites</div>
          <p className='no-save-ind'>You have no saved articles</p>
          {props.BmContent.map((info, index) => {
            return (
              <BmCard
                onLoading={props.onLoading}
                switchst={info.switchst}
                changeContent={props.changeContent}
                removeBmContent={props.removeBmContent}
                key={index}
                id={info.id}
                url={info.url}
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
