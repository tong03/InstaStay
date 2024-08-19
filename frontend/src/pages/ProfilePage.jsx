import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./components/AccountNav";

const ProfilePage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!ready) {
    return "Loading...";
  }

  if (!user && ready && !redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} - ({user.email})<br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
