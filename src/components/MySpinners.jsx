import React from "react"
import BounceLoader from "react-spinners/BounceLoader"
import { css } from "@emotion/core";

function MySpinners() {

    const loading = true;

    const override = css`
        display: block;
        margin: 12.5‬rem auto;
    `;
    return (
        <div>
            <BounceLoader css={css`position: relative;left:-0.625rem;width: 1rem;height: 1rem;display: block;margin: 15.625rem auto 0.75rem;`} color={"#123abc"} loading={loading} size={'2rem'} />
            <div style={{textAlign:'center',fontWeight:'600'}}>Loading</div>
        </div>
    );
}

export default MySpinners;