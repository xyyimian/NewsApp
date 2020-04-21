import React from "react";
import MyCard from "./MyCard";
import MySpinners from "./MySpinners";
function Home(props) {

    return (
      props.loading ? <MySpinners /> :
      <div>
        {props.content.body.map((info, index) => {
            return (
              <MyCard
                onLoading={props.onLoading}
                switchst={props.switchst}
                changeContent={props.changeContent}
                key={index}
                id={info.id}
                url={info.url}
                title={info.title}
                description={info.description}
                section={info.section}
                image={info.image}
                date={info.date}
              />
              
          )})
        }
      </div>
    );
}

export default Home;
