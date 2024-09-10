import React, { useState } from "react";
import axios from "axios"; // For making API requests
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";
import "./ContactUs.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MessageIcon from "@mui/icons-material/Message";
import Button from "@mui/material/Button";

const cities = [
  { name: "Johannesburg", code: "JNB" },
  { name: "Cape Town", code: "CPT" },
  { name: "Durban", code: "DUR" },
  { name: "Tshwane", code: "PRY" },
  { name: "Gqeberha", code: "PLZ" },
  { name: "Polokwane", code: "POL" },
  { name: "Bloemfontein", code: "BFN" },
  { name: "East London", code: "ELS" },
];

const Banner = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    areaCode: "",
    location: { lat: null, lon: null },
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCityChange = (e) => {
    const city = cities.find((city) => city.name === e.target.value);
    if (city) {
      setSelectedCity(city.name);
      setCityCode(city.code);
    } else {
      setSelectedCity("");
      setCityCode("");
    }
  };

  const fetchLocation = async (address) => {
    try {
      const apiKey = "7QFfZe0XnBIFdQa4ZgILQ7_-kQw="; // Replace with your actual Google Maps API key
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: address,
            key: apiKey,
          },
        }
      );
      const locationData = response.data.results[0].geometry.location;
      return { lat: locationData.lat, lon: locationData.lng };
    } catch (error) {
      console.error("Error fetching location:", error);
      return { lat: null, lon: null };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const location = await fetchLocation(formData.address);

    const updatedFormData = {
      ...formData,
      location,
      cityCode,
    };

    const contactRef = ref(db, "contacts/" + Date.now());

    set(contactRef, updatedFormData)
      .then(() => {
        alert("Data and location stored successfully!");
        setLoading(false);
        clearForm();
      })
      .catch((error) => {
        console.error("Error storing data:", error);
        setLoading(false);
      });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      number: "",
      address: "",
      areaCode: "",
      location: { lat: null, lon: null },
    });
    setSelectedCity("");
    setCityCode("");
  };

  return (
    <div className="contact">
      <div className="contact_infoButton">
        {/* {showSearch && <Search />} */}
        <Button
          //  onClick={() => setShowSearch(!showSearch)}
          className="contact_titleButton"
          variant="outlined"
        >
          Contact Us {/* {showSearch ? "Hide" : "Search Dates"} */}
        </Button>
      </div>
      <div className="contact_info">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Full Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="star">*</span>
            </label>
          </div>
          <div>
            <label>
              <EmailIcon />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="star">*</span>
            </label>
          </div>
          <div>
            <label>
              <PhoneCallbackIcon />
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
              <span className="star">*</span>
            </label>
          </div>
          {/* <div>
            <label>
              <AddLocationIcon />
              <input
                type="text"
                name="areaCode"
                value={formData.areaCode}
                onChange={handleChange}              
              />
            </label>
          </div> */}
          <div className="city">
            <label htmlFor="city">
              <AddLocationIcon />
            </label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="">-- Choose a city --</option>
              {cities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <span className="star">*</span>

            {cityCode && (
              <div>
                <p>City Code: {cityCode}</p>
              </div>
            )}
          </div>
          
          <div>
            <label>
              <MessageIcon />
              <textarea
                id="text"
                name="message"
                rows="5"
                cols="30"
                maxLength="80"
                placeholder="Write your request here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              <span className="star">*</span>
            </label>
          </div>
          <div className="form-actions">
            <Button
              className="submit"
              type="submit"
              disabled={loading}
              variant="outlined"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;

// =================================================================
// import React, { useState } from "react";
// import axios from "axios"; // For making API requests
// import { ref, set } from "firebase/database";
// import { db } from "../firebaseConfig";
// import "./Banner.css";
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
// import AddLocationIcon from '@mui/icons-material/AddLocation';
// import MessageIcon from '@mui/icons-material/Message';
// import  Button  from '@mui/material/Button';
// import Cities from './Cities/Cities';

// const cities = [
//   { name: 'Johannesburg', code: 'JNB' },
//   { name: 'Cape Town', code: 'CPT' },
//   { name: 'Durban', code: 'DUR' },
//   { name: 'Pretoria', code: 'PRY' },
//   { name: 'Port Elizabeth', code: 'PLZ' },
//   { name: 'Bloemfontein', code: 'BFN' },
//   { name: 'East London', code: 'ELS' }
// ];

// const CityDropdown = () => {
//   const [selectedCity, setSelectedCity] = useState('');
//   const [cityCode, setCityCode] = useState('');

//   const handleCityChange = (e) => {
//     const city = cities.find(city => city.name === e.target.value);
//     setSelectedCity(city.name);
//     setCityCode(city.code);
//   };

// const Banner = (cityCode, setCityCode) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     address: "",
//     areaCode: "",
//     location: { lat: null, lon: null }, // To store latitude and longitude
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const fetchLocation = async (address) => {
//     try {
//       const apiKey = "7QFfZe0XnBIFdQa4ZgILQ7_-kQw="; // Replace with your actual Google Maps API key
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json`,
//         {
//           params: {
//             address: address,
//             key: apiKey,
//           },
//         }
//       );
//       const locationData = response.data.results[0].geometry.location;
//       return { lat: locationData.lat, lon: locationData.lng };
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       return { lat: null, lon: null };
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Fetch latitude and longitude based on the address
//     const location = await fetchLocation(formData.address);

//     // Add the location data to formData
//     const updatedFormData = {
//       ...formData,
//       location,
//     };

//     // Create a unique key for each submission
//     const contactRef = ref(db, "contacts/" + Date.now());

//     set(contactRef, updatedFormData)
//       .then(() => {
//         alert("Data and location stored successfully!");
//         setLoading(false);
//         clearForm(); // Clear the form after successful submission
//       })
//       .catch((error) => {
//         console.error("Error storing data:", error);
//         setLoading(false);
//       });
//   };

//   // Clear form fields
//   const clearForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       number: "",
//       address: "",
//       areaCode: "",
//     });
//   };

//   return (
//     <div className="banner">
//          <div className="banner_info">

//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Full Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           <EmailIcon />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <span className="star">*</span>
//         </label>
//       </div>
//       <div>
//         <label>
//           <PhoneCallbackIcon />
//           <input
//             type="text"
//             name="number"
//             value={formData.number}
//             onChange={handleChange}
//             required
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//         <AddLocationIcon />
//           <input

//           type="text"
//           name="areaCode"
//           value={formData.areaCode}
//           onChange={handleChange}
//           required

//       <label htmlFor="city">Select a City:</label>
//       <select id="city" value={selectedCity} onChange={handleCityChange}>
//         <option value="">-- Choose a city --</option>
//         {cities.map((city, index) => (
//           <option key={index} value={city.name}>
//             {city.name}
//           </option>
//         ))}
//       </select>
//           />
//           <span className="required">*</span>
//         </label>
//       </div>
//       <div>
//         <label>
//           Area Code:
//           <input
//             type="text"
//             name="areaCode"
//             value={formData.areaCode}
//             onChange={handleChange}

//             {cityCode && (
//               <div>
//                 {/* <p>Selected City: {selectedCity}</p> */}
//                 <span>{cityCode}</span>
//               </div>
//             )}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           <MessageIcon />
//           <textarea
//             id="address"
//             name="address"
//             rows="5"
//             cols="30"
//             // max: "10"
//             placeholder="Write your physical address here..."
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//           <span className="star">*</span>
//         </label>
//       </div>

//       <div className="form-actions">
//         <Button className="submit" type="submit" disabled={loading} variant="outlined">{loading ? "Submitting..." : "Submit"}</Button>
//        </div>
//     </form>
//     </div>
//     </div>
//   );
// };

// export default Banner;
