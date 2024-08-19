import React from "react";
import { useState, useEffect } from "react";
import PhotosUploader from "./components/PhotosUploader";
import Perks from "./components/Perks";
import axios from "axios";
import AccountNav from "./components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="mt-4 text-2xl">{text}</h2>;
  }

  function inputDetails(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function provideLabel(header, details) {
    return (
      <>
        {inputHeader(header)}
        {inputDetails(details)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      await axios.put("/user-places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post("/user-places", { ...placeData });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {provideLabel("Title", "Title for place, should be catchy")}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="title, ex: My beautiful apt"
          />
          {provideLabel("Address", "Address of your place")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="address"
          />
          {provideLabel("Photos", "more = better")}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {provideLabel("Description", "description of the place")}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {provideLabel("Perks", "select all the perks of your place")}
          <Perks selected={perks} onChange={setPerks} />
          {provideLabel("Extra info", "house rules, etc...")}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {provideLabel(
            "Check in/out times",
            "remember to have some time window for cleaning the room between guests"
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3 className="mt-2 -mb-1">Check-in</h3>
              <input
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                type="number"
                placeholder="14"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check-out</h3>
              <input
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                type="number"
                placeholder="12"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max guests</h3>
              <input
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                type="number"
                placeholder="1"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                type="number"
                placeholder="$150"
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
