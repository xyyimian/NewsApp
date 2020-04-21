import React, { useState } from "react"
import NewsCard from "./NewsCard"
import PageWithComments from "./MyCommentbox"
import {useLocation} from "react-router-dom";
import MySpinners from "./MySpinners";


function News(props) {
    const [content, setContent] = useState({ body: []})
    function changeContent(newContent){
        setContent(newContent);
    }

    function DetailReq(id, type, section) {
        var switchst = type=='guardian'? true : false;
        var url = '/api?type=' + type + '&nid=' + id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var jsonObj = JSON.parse(this.responseText)
            changeContent({ body: jsonObj.results, id: id, switchst: switchst, section: section });
        };
        xhr.open('GET', url, true);
        xhr.send();
    };

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    if(content.body[0] == undefined || content.id!=query.get("id"))
        DetailReq(query.get("id"),query.get("type"),query.get("section"));
    return (
        content.body[0]==undefined ? <MySpinners /> :
            <div>
                <NewsCard
                    BmContent = {props.BmContent}
                    addBmContent={props.addBmContent}
                    removeBmContent={props.removeBmContent}
                    id = {content.id}
                    switchst = {content.switchst}
                    title={content.body[0].title}
                    date={content.body[0].date}
                    image={content.body[0].image}
                    description={content.body[0].description}
                    url={content.body[0].url}
                    section={content.body[0].section?content.body[0].section:content.section}
                />
                <div style={{ margin: "2%" }}>
                    <PageWithComments id={content.id}/>
                </div>
            </div>
    );
}

export default News;