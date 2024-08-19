import React, { useEffect, useState } from "react";
import AccountNav from "./components/AccountNav";
import axios from "axios";
import PlaceImg from "./components/PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "./components/BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  function handleCancelBooking(ev, bookingID) {
    ev.preventDefault();

    axios
      .delete(`/bookings/${bookingID}`)
      .then((response) => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingID)
        );
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Error cancelling the booking:", err);
      });
  }

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => {
            return (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-3"
                key={booking._id}
              >
                <div className="w-48 cursor-pointer">
                  <PlaceImg place={booking.place} />
                </div>
                <div className="py-3 pr-3 grow">
                  <h2 className="text-2xl font-semibold">
                    {booking.place.title}
                  </h2>
                  <div className="text-xl">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-3 text-gray-500"
                    />
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span className="text-2xl">
                        Total price: ${booking.price}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(ev) => handleCancelBooking(ev, booking._id)}
                  className="bg-primary text-white p-4 hover:opacity-70"
                >
                  Cancel Booking
                </button>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default BookingsPage;
