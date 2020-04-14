import React from "react"
import NewsCard from "./NewsCard"
import PageWithComments from "./MyCommentbox"


function News() {
    return (
        <div>
            <NewsCard />
            <div style={{margin: "2%"}}>
                <PageWithComments />
            </div>
        </div>
    );
}

export default News;