import React from "react"
import BounceLoader from "react-spinners/BounceLoader"
import { css } from "@emotion/core";

function MySpinners() {

    const loading = true;

    const override = css`
        display: block;
        margin: 12.5rem auto;
    `;
    return (
        <div>
            <BounceLoader css={override} color={"#123abc"} loading={loading}/>
            <div>Loading</div>
        </div>
    );
}

export default MySpinners;