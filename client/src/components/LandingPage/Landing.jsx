import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css"
import {useDispatch} from "react-redux"
import { getAllCountries, getActivities } from "../../actions";

export default function LandingPage() {
  const dispatch = useDispatch()

  useEffect(() => { //Hook para usar las actions
    dispatch(getAllCountries())
    dispatch(getActivities())
}, [])



  return (
    <div className="landing-container">
      <div className="button-container">
        <Link to="/home">
          <button className="starting-button">START!</button>
        </Link>
      </div>
    </div>
  );
}
