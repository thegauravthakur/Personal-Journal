// importScripts("https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.2/firebase-messaging.js");
//
// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//   apiKey: "AIzaSyA-k5P1INBmbW_A11U3b4KiKSQtZsfNx98",
//   authDomain: "journal-c346a.firebaseapp.com",
//   projectId: "journal-c346a",
//   storageBucket: "journal-c346a.appspot.com",
//   messagingSenderId: "206612287240",
//   appId: "1:206612287240:web:2e9dd1a67f636a0878e6bd",
//   measurementId: "G-MN5QD5BGC1",
// });
//
// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();
self.addEventListener("push", async function (event) {
  event.waitUntil(
    self.registration.showNotification("Everyday Journal", {
      body: "Don't forget to write your daily journal!",
      badge: "/favicon-96x96.png",
      icon: "https://i.ibb.co/PM4P6PH/Untitled-design-10.png",
      image: "https://i.ibb.co/MD5JWyN/Soon.png",
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
