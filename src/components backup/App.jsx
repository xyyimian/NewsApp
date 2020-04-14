import React from "react";
import Home from "./Home";
import News from "./News";
import Search from "./Search";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path='/news' component={News} />
                <Route path='/search' component={Search} />
            </Switch>
        </main>
        // <MySpinners />
        // <div>
        //     <MyNavbar />
        //     <div>
        //         <MyCard />
        //         <MyCard />
        //         <MyCard />
        //     </div>
        // </div>
        // {/* <MyCard /> */}
        // <MyCard />
        // <h1>Helloworkd</h1>
    );
}

export default App;

