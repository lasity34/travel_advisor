import React from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Phone } from "@material-ui/icons";
import { Rating } from "@mui/material";
import useStyles from "./styles";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Card elevation={8}>
      <CardMedia
        style={{ height: 200 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://unsplash.com/photos/GXXYkSwndP4"
        }
        title={place.name}
      />
      <CardContent>
        {place.name && (
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
        )}

        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Typography variant="subtitle1">Ranking:</Typography>
          <Typography variant="subtitle1">{place.ranking}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Rating:</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" className={classes.rating}>
              {place.rating}
            </Typography>
            <Rating size="small" value={Number(place.rating)} readOnly />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price:</Typography>
          <Typography variant="subtitle1">{place.price}</Typography>
        </Box>

        {place?.cuisine?.slice(0.2).map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon style={{ marginRight: 10 }} /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <Phone style={{ marginRight: 10 }} /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
