import React from "react";
import { Typography } from "@material-ui/core";

const PlaceDetails = ({ place }) => {
    return (
        <Typography>
            {place.name}
        </Typography>
    )
}

export default PlaceDetails;