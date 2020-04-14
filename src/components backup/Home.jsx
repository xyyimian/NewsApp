import React from "react";
import MyNavbar from "./MyNavbar";
import MyCard from "./MyCard";
import MySpinners from "./MySpinners";


function Home() {
    return (
        // <MySpinners />
        <div>
            <MyNavbar />
            <div>
                <MyCard />
                <MyCard />
                <MyCard />
            </div>
        </div>
        // {/* <MyCard /> */}
        // <MyCard />
    );
}

export default Home;