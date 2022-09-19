import React from "react";
import { Typography } from "@material-ui/core";

import useStyles from './styles'

const PlaceDetails = ({ place }) => {

    const classes = useStyles()

    return (
       <div>
            <Typography variant="subtitle1">
                {place.name}
            </Typography>
            <Typography variant="body1">
                {place.ranking}
            </Typography>
            <Typography variant="body2">
                {place.description}
            </Typography>
            <Typography variant="button">
                {place.is_closed ? "Closed" : "Open"}
            </Typography>
       </div>
    )
}

export default PlaceDetails;