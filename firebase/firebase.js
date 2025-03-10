// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh-Q0yyEZOd6v_GaR3JoFlKPcTH24exwc",
  authDomain: "hive-solutions-69970.firebaseapp.com",
  projectId: "hive-solutions-69970",
  storageBucket: "hive-solutions-69970.firebasestorage.app",
  messagingSenderId: "1059404322427",
  appId: "1:1059404322427:web:94778274f02adc34ccf4de",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const messaging =
  typeof window !== "undefined" && getMessaging(firebaseApp);

export const generateNotificationToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("permission status", permission);
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VPID,
      });
      console.log("testing token", token);
      return token;
    } else {
      console.log("Notification permission not granted");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};
