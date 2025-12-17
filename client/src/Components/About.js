import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInstagram } from "react-icons/fa";

export default function About() {
  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);

 const getGeoLocationData = async () => {
    try { 
      const response = await  axios.get(`${process.env.REACT_APP_LOCAION_API_KEY}`)
      setCountry(response.data.location.country); // Set country
      setRegion(response.data.location.region); // Set region
     
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  }
 useEffect(()=>{
  getGeoLocationData()
 },[])

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-8 text-gray-800">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Welcome to Ghsoon Beauty!
        </h1>

        <p className="text-lg mb-6">
          Welcome to the Ghosoun Beauty app which features a wide range of creams,
          incense, and perfumes.
        </p>

        <p className="text-lg mb-6">
          Thank you for visiting our app. We hope you enjoy your experience and
          find everything you are looking for!
        </p>

        <div className="flex justify-center items-center gap-8 mt-6">
          <a
            href="https://www.instagram.com/iimg0n"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-pink-600 hover:text-pink-800 transition"
          >
            <FaInstagram size={24} />
            <span>@ghsoonbeauty</span>
            
          
          </a>

        </div>
        <div>
           <h5> Location: {country}---{region}</h5>
           

        </div>
      </div>
    </div>
  );
}
