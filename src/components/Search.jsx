import React from "react"
import { SchCard } from "./MyCard";
function Search(props) {
    return (
        <div>
            <div className='indicator'>Results</div>
            <div>
              {props.content.body.map((info, index) => {
                return (
                  <SchCard
                  onLoading={props.onLoading}
                  switchst={props.switchst}
                  changeContent={props.changeContent}
                  id={info.id}
                  key={index}
                  title={info.title}
                  section={info.section}
                  image={info.image}
                  date={info.date}
                  />
                );
              })
              
              }
            </div>
        </div>
    );
}

export default Search;
