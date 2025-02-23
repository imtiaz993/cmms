"use client";
import { useState, useEffect } from "react";
import { message } from "antd";
import {  getSystems } from "app/services/setUp/systems";
import { getSites } from "app/services/setUp/sites";

function useGetRigs() {
  const [locations, setLocations] = useState([]);
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Locations
        const locationResponse = await getSites();
        if (locationResponse.status === 200) {
          setLocations(locationResponse.data.data);
        } else {
          message.error(
            locationResponse.data?.message || "Failed to get locations"
          );
        }

        // Fetch Systems
        const systemResponse = await getSystems();
        if (systemResponse.status === 200) {
          setSystems(systemResponse.data.data);
        } else {
          message.error(
            systemResponse.data?.message || "Failed to get systems"
          );
        }
      } catch (error) {
        message.error("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { locations, systems, loading };
}

export default useGetRigs;
