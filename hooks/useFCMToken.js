"use client";
import { useEffect, useState } from "react";

const useFcmToken = () => {
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const handlePermission = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handlePermission();
  }, []);

  return { notificationPermissionStatus };
};

export default useFcmToken;
