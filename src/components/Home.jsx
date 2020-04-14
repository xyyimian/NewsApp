import React from "react";
import MyCard from "./MyCard";

function Home(props) {
    const guardianLogo = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png'
    const nytLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'
    return (
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
                image={info.image !== undefined ? info.image :
                  (props.switchst ? guardianLogo : nytLogo)}
                date={info.date}
              />
              
          )})
        }
      </div>
    );
}

export default Home;
