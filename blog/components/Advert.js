import React, { useState, useEffect } from "react";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../styles/components/advert.css";

const Advert = () => {
  const [advertisementList, setAdvertisementList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios(servicePath.getAdvertisementList).then((res) => {
        if (res.data.errno === 0) {
          setAdvertisementList(res.data.data);
        } else {
          console.error("Fetch advertisement list failed");
        }
      });
    };
    fetchData();
  }, []);

  const handleAdvertisementClick = (url) => {
    window.open(url, "_blank");
    return false;
  };

  return (
    <div className="ad-div comm-box">
      {advertisementList.map((advertisement) => (
          <img
            key={advertisement.id}
            style={{ cursor: "pointer" }}
            src={advertisement.picture}
            width="100%"
            onClick={() => handleAdvertisementClick(advertisement.url)}
          />
      ))}

      {/* <div>
        <img
          src="https://www.eurostep.com/wp-content/uploads/2020/10/Bimworld-Paris-e1602082909223.jpg"
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://455767.smushcdn.com/1101216/wp-content/uploads/2020/06/plmroadmappdt2020fall-1280x430.png?lossy=1&strip=1&webp=1"
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://455767.smushcdn.com/1101216/wp-content/uploads/2020/05/ShareAspace-Forum-2020.jpg?lossy=1&strip=1&webp=1"
          width="100%"
        />
      </div>
      <div>
        <img
          src="https://455767.smushcdn.com/1101216/wp-content/uploads/2020/04/Export-control-webinar-speakers-2-1447x630.png?lossy=1&strip=1&webp=1"
          width="100%"
        />
      </div> */}
    </div>
  );
};

export default Advert;
