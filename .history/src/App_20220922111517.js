import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { getPlacesData } from "./api/index";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { cuisineList } from "./Objects/cuisines";


console.log()
const App = () => {
  const [places, setPlaces] = useState([]);

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [filteredCuisines, setFilteredCuisines] = useState([]);
  const [cuisine, setCuisine] = useState("Select Cuisine");

  const [childClicked, setChildClicked] = useState(null);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  console.log(places)
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    const cuisineName = places.filter((item) => {
      return  item.cuisine.some((item2) => item2.name === cuisine)
    })
   
    setFilteredCuisines(cuisineName);
  }, [cuisine]);

  

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(
          data
            .filter((place) => {
              place.name && place.num_reviews > 0 && place.cuisine.some((item) => item.name === cuisine) })
           
        );
        setFilteredCuisines([]);
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  return (
    <div>
      <CssBaseline />

      <Header
        setCoords={setCoords}
        type={type}
        setType={setType}
        setRating={setRating}
        rating={rating}
        cuisine={cuisine}
        cuisineList={cuisineList}
        setCuisine={setCuisine}
      />

      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={12} md={9}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={
               filteredCuisines.length
                ?  filteredCuisines 
                : places
            }
            setChildClicked={setChildClicked}
          />
          <cuisineApi />
        </Grid>
        <Grid item xs={12} md={3}>
          <List
            places={
              filteredCuisines.length
               ?  filteredCuisines 
               : places
           }
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            setRating={setRating}
            rating={rating}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
