import {
  prof,
  pubSpeaking,
  psle,
  entrepreneurship,
  demoVid,
  mentorPic,
  corporateLivePic,
  promotionBoxImage,
} from "../utils";

export const imageArray = [
  {
    id: 1,
    image: pubSpeaking,
    alt: "A child holding a microphone and speaking on stage",
  },
  {
    id: 2,
    image: psle,
    alt: "An empty classroom with desks and chairs",
  },
  {
    id: 3,
    image: entrepreneurship,
    alt: "A young woman holding clothes on hangers",
  },
  {
    id: 4,
    image: prof,
    alt: "A group of professionals standing together and smiling",
  },
];

export const carouselImages = [demoVid, mentorPic, corporateLivePic];

export const childInterestFields = [
  "food",
  "subject",
  "color",
  "hobby",
  "animal",
];

export const enquiryData = [
  {
    id: 1,
    category: "New Enquiries",
    organization: "Org A",
    callbackTime: "10:00 AM",
  },
  {
    id: 2,
    category: "New Enquiries",
    organization: "Org B",
    callbackTime: "11:00 AM",
  },
  {
    id: 3,
    category: "New Enquiries",
    organization: "Org C",
    callbackTime: "12:00 PM",
  },
  {
    id: 4,
    category: "Discussions in Progress",
    organization: "Org D",
    callbackTime: "1:00 PM",
  },
  {
    id: 5,
    category: "Discussions in Progress",
    organization: "Org E",
    callbackTime: "2:00 PM",
  },
  {
    id: 6,
    category: "Delivered",
    organization: "Org F",
    callbackTime: "3:00 PM",
  },
  {
    id: 7,
    category: "Delivered",
    organization: "Org G",
    callbackTime: "4:00 PM",
  },
  {
    id: 8,
    category: "Confirmed",
    organization: "Org H",
    callbackTime: "5:00 PM",
  },
];

export const enquiryPieChartData = [
  { name: "New Enquiries", value: 6, color: "#FF4D4D" },
  { name: "Discussions in Progress", value: 4, color: "#FFC107" },
  { name: "Delivered", value: 2, color: "#B0BEC5" },
  { name: "Confirmed", value: 1, color: "#009688" },
];

export const websiteRatingData = [
  { aveRating: 2, month: "August", color: "#FF4D4D" },
  { aveRating: 3.5, month: "September", color: "#FFC107" },
  { aveRating: 4.5, month: "October", color: "#B0BEC5" },
  { aveRating: 5, month: "November", color: "#009688" },
];
