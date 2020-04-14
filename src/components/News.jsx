import React from "react"
import NewsCard from "./NewsCard"
import PageWithComments from "./MyCommentbox"

function News(props) {
    return (
            <div>
                <NewsCard
                    BmContent = {props.BmContent}
                    addBmContent={props.addBmContent}
                    removeBmContent={props.removeBmContent}
                    id = {props.content.id}
                    switchst = {props.content.switchst}
                    title={props.content.body[0].title}
                    date={props.content.body[0].date}
                    image={props.content.body[0].image}
                    description={props.content.body[0].description}
                    url={props.content.body[0].url}
                    section={props.content.body[0].section?props.content.body[0].section:props.content.section}
                />
                <div style={{ margin: "2%" }}>
                    <PageWithComments id={props.content.id}/>
                </div>
            </div>
    );
}

export default News;