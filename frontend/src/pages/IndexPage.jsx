import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      const { data } = response;
      setPlaces([...data, ...data]);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <div key={place._id}>
              <Link
                to={"/place/" + place._id}
                className="flex bg-gray-500 mb-2 rounded-2xl"
              >
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl aspect-square object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt="listing pic"
                  />
                )}
              </Link>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="txt-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default IndexPage;
