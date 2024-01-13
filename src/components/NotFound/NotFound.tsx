import { Button } from "@mui/material";

import { images } from "../../core";

import "./NotFound.scss";

/**
 * Not found
 * 
 * @returns 
 */
const NotFound = (): JSX.Element => {
    return (
        <div className="not-found-container">
            <img src={images.notFound} alt="not-found" />
            <div className="title">Something went wrong.</div>
            <div className="content">Sorry, We can't find the page you're looking for.</div>
            <Button variant="contained" onClick={() => window.location.href = "/"}>Go Back</Button>
        </div>
    );
};

export default NotFound;
