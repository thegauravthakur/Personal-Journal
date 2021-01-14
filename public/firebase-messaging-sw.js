// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyA-k5P1INBmbW_A11U3b4KiKSQtZsfNx98",
  authDomain: "journal-c346a.firebaseapp.com",
  projectId: "journal-c346a",
  storageBucket: "journal-c346a.appspot.com",
  messagingSenderId: "206612287240",
  appId: "1:206612287240:web:2e9dd1a67f636a0878e6bd",
  measurementId: "G-MN5QD5BGC1",
};

const app = firebase.default.initializeApp(firebaseConfig);

const messaging = app.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);
//
//   const notificationTitle = "Everyday Journal";
//   const notificationOptions = {
//     body: "Don't forget to write your dairy",
//     badge: "/favicon-96x96.png",
//   };
//
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("notificationclick", function (event) {
//   event.notification.close();
//   event.waitUntil(self.clients.openWindow("/"));
// });
