import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";

export const SearchOptions = ({ searchQuery }) => {
  const [data, setData] = useState("");
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=10&language=en&format=json`
        );
        if (!response.ok) {
          throw Error("baddd naiaaa");
        }
        const locationData = await response.json();
        if (locationData["results"]) {
          locationData["results"] = locationData["results"].filter((lo) => {
            return lo["country"] ? true : false;
          });
          console.log(locationData["results"], "after");
        } else {
          setData("");
        }
        if (!locationData["results"]) {
          setData("");
        } else {
          console.log(locationData["results"]);
          setData(locationData["results"]);
        }
      } catch (e) {
        console.log(Error(e), "fffff");
      }
    }
    loadData();
  }, [searchQuery]);
  console.log(data);
  return (
    <div className="bg-blue-200/45 container absolute left-1/2 -translate-x-1/2 max-w-4xl p-6 rounded-xl shadow-md shadow-blue-500/80 backdrop-blur-2xl">
      {!data ? <p>Results not found</p> : 
      <ul className="border-gray-300 border-2 rounded-2xl overflow-hidden">
        {data.map((lo,index)=>{
          return (<li className={`flex gap-5 items-center p-5 ${index===data.length-1?"":"border-b-2"} border-gray-300 bg-gray-200 hover:bg-gray-300 transition-all`}>
            <CircleFlag countryCode={lo["country_code"].toLowerCase()} width="35"/>
            <p>{lo["name"]}</p>
          </li>)
        })}
        </ul>}
    </div>
  );
};
