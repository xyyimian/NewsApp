import React from "react"
import BounceLoader from "react-spinners/BounceLoader"
import { css } from "@emotion/core";

function MySpinners() {

    const loading = true;

    const override = css`
        display: block;
        margin: 200px auto;
    `;
    return (
        <div>
            <BounceLoader css={css`position: relative;left:-10px;width: 1rem;height: 1rem;display: block;margin: 250px auto 12px;`} color={"#123abc"} loading={loading} size={'2rem'} />
            <div style={{textAlign:'center',fontWeight:'600'}}>Loading</div>
        </div>
    );
}

export default MySpinners;