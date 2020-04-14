import React from "react"
import { SchCard } from "./MyCard";
import MyNavbar from "./MyNavbar"

function Search() {
    return (
        <div>
            <MyNavbar />
            <div className='indicator'>Results</div>
            <SchCard />
            <SchCard />
            <SchCard />
            <SchCard />
            <SchCard />
            <SchCard />
            <SchCard />
            <SchCard />
        </div>
    );
}

export default Search;