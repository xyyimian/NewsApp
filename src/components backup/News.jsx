import React from "react"
import NewsCard from "./NewsCard"
import PageWithComments from "./MyCommentbox"


function News() {
    return (
        <div>
            <NewsCard />
            <div className='margin2percent'>
                <PageWithComments />
            </div>
        </div>
    );
}

export default News;