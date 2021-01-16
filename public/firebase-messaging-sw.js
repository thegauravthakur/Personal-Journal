self.addEventListener("push", async function (event) {
  let { notification } = event.data.json();
  let { data } = event.data.json();
  const image = "image" in data ? data["image"] : "";
  const icon =
    "icon" in data
      ? data["icon"]
      : "https://i.ibb.co/PM4P6PH/Untitled-design-10.png";
  const body = "body" in notification ? notification["body"] : "";
  const title =
    "title" in notification ? notification["title"] : "Everyday Journal";
  console.log(data);
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      badge: "/favicon-96x96.png",
      icon: icon,
      image: image,
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
