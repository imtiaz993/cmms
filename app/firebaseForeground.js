"use client";
import useFcmToken from "../hooks/useFCMToken";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase/firebase";
import { useEffect } from "react";
import { notification } from "antd";

export default function FcmTokenComp() {
  const { notificationPermissionStatus } = useFcmToken();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (payload) => {
    api.info({
      message: payload.data.title,
      description: payload.data.body,
      placement: "topRight",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const unsubscribe = onMessage(messaging, (payload) => {
          openNotification(payload);
        });
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return contextHolder; // This component is primarily for handling foreground notifications
}
