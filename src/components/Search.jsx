import React from "react"
import { SchCard } from "./MyCard";
import MySpinners from "./MySpinners";
function Search(props) {
    return (
      props.loading ? <MySpinners /> :
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
                  url={info.url}
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
