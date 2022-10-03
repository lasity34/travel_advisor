import React, { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { getPlacesData, getGeoData } from "./api/index";
import Header from "./components/Header/Header";
import List from "./pages/List/List";
import Map from "./pages/Map/Map";
import { cuisineList } from "./Objects/cuisines";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [places, setPlaces] = useState([]);

  // const [filteredRatings, setFilteredRatings] = useState([]);

  const [map, setMap] = useState({});

  const [filteredLocations, setFilteredLocations] = useState({});

  const [cuisine, setCuisine] = useState("Select Cuisine");
  const [cuisineKey, setCuisineKey] = useState(0);

  const [childClicked, setChildClicked] = useState(null);

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [rating, setRating] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // useEffect(() => {
  //   const filteredPlaces = places.filter((place) => place.rating > rating);

  //   setFilteredRatings(filteredRatings);
  // }, [rating]);

  // useEffect(() => {
  //   const cuisineName = places.filter((item) => {
  //     return  item.cuisine.some((item2) => item2.name === cuisine)
  //   })

  //   setFilteredCuisines(cuisineName);
  // }, [cuisine]);
  // && place.cuisine.some((item) => item.name === cuisine)



  useEffect(() => {
    const key = cuisineList.filter((item) => item.name === cuisine);
    const cuisineKey = key[0].key;
    setCuisineKey(cuisineKey);
  }, [cuisine]);

  useEffect(() => {
    const placeLocation = isLoading === false ? places[0].ranking_geo : places;
    const filteredLocation = places.filter(
      (item) => places.item === placeLocation
    );
    setFilteredLocations(filteredLocation);
  }, [places]);

  useEffect(() => {
    if (cuisineKey && bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(cuisineKey, bounds.sw, bounds.ne).then((data) => {
        setPlaces(
          data.filter((place) => {
            return place.name && place.num_reviews > 0 && place.rating > rating;
          })
        );

        setIsLoading(false);
      });
    }
  }, [cuisineKey, rating, bounds]);

  console.log(filteredLocations)


  return (
    <div>
      <CssBaseline />

      <Header
        coords={coords}
        setCoords={setCoords}
        setRating={setRating}
        rating={rating}
        cuisine={cuisine}
        cuisineList={cuisineList}
        setCuisine={setCuisine}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Map
              setCoords={setCoords}
              setBounds={setBounds}
              coords={coords}
              places={filteredLocations.length ? filteredLocations : places}
              setChildClicked={setChildClicked}
            />
          }
        />
        <Route
          path="/List/List"
          element={
            <List
              places={filteredLocations.length ? filteredLocations : places}
              childClicked={childClicked}
              isLoading={isLoading}
              setRating={setRating}
              rating={rating}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
