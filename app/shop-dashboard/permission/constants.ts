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
    titleKey: "contacts",
    icon: Contact,
    hasDescription: false,
  },
  {
    id: "bluetooth",
    titleKey: "bluetooth",
    icon: Bluetooth,
    hasDescription: false,
  },
  {
    id: "microphone",
    titleKey: "microphone",
    icon: Mic,
    hasDescription: true,
    descriptionKey: "microphoneDesc",
  },
  {
    id: "location",
    titleKey: "location",
    icon: MapPin,
    hasDescription: true,
    descriptionKey: "locationDesc",
  },
  {
    id: "photos",
    titleKey: "photos",
    icon: Image,
    hasDescription: true,
    descriptionKey: "photosDesc",
  },
  {
    id: "camera",
    titleKey: "camera",
    icon: Camera,
    hasDescription: true,
    descriptionKey: "cameraDesc",
  },
  {
    id: "others",
    titleKey: "others",
    icon: MoreHorizontal,
    hasDescription: true,
    descriptionKey: "othersDesc",
    isLast: true,
  },
];
