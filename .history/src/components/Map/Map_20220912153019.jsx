import React from "react";
import GoogleMapReact from "google-map-react";
import { paper, Typography, useMediaQuery} from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import { Rating } from "@mui/material";


import useStyles from './styles'

const Map = ( { setCoords, setBounds, coords}) => {
    const classes = useStyles()
    const isMobile = useMediaQuery(`(min-width:600px)`)

   
    return (
        <div className={classes.mapContainer}>
          <GoogleMapReact
          bootstrapURLKeys={ { key: 'AIzaSyDZqk-GXkfcFZMVBVhieTUE3aXIb9i1-JE'}}
          defaultCenter={coords}
          center={coords}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={ '' }
          onChange={(e) => {
            console.log(e)
            setCoords({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
          onChildClick={''}
          >

          </GoogleMapReact>
        </div>
    )
}

export default Map;