import {
  Mic,
  Image,
  MapPin,
  Camera,
  Contact,
  Bluetooth,
  MoreHorizontal,
} from "lucide-react";

export const permissions = [
  {
    id: "contacts",
    title: "Contacts",
    icon: Contact,
    hasDescription: false,
  },
  {
    id: "bluetooth",
    title: "Bluetooth",
    icon: Bluetooth,
    hasDescription: false,
  },
  {
    id: "microphone",
    title: "Microphone",
    icon: Mic,
    hasDescription: true,
    description:
      "Temu does not request to access your microphone on the browser. Even though the browser may request access to your microphone permissions in situations like leaving a review with video, etc. Temu will only use the microphone permissions you grant to the Chrome browser to take videos.",
  },
  {
    id: "location",
    title: "Location",
    icon: MapPin,
    hasDescription: true,
    description:
      "In most countries/regions, such as the US, the UK, etc., Temu does not request access to your location on the browser. For users in the Middle East only, the browser might request access to your location permissions. Temu will only use the location permissions you grant to the Chrome browser to make it easier for users to accurately fill in their shipping address.",
  },
  {
    id: "photos",
    title: "Photos",
    icon: Image,
    hasDescription: true,
    description:
      "Temu does not request access to your photos on the browser. Even though the browser may request access to your photos permissions in situations like leaving a review, searching items, etc., Temu will only use the photo permissions you grant to the Chrome browser to upload images.",
  },
  {
    id: "camera",
    title: "Camera",
    icon: Camera,
    hasDescription: true,
    description:
      "Temu does not request permission to access your camera on the browser. Even when we use the camera to leave a review, search items, etc., Temu will only use the camera permissions you grant to the Chrome browser to take photos.",
  },
  {
    id: "others",
    title: "Others",
    icon: MoreHorizontal,
    hasDescription: true,
    description:
      "In addition to the above device features, Temu will not request access to any other device features, such as your calendar, reminders, etc.",
    isLast: true,
  },
];
