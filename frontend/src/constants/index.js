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
    callbackTime: "15 Nov 10:00 AM",
  },
  {
    id: 2,
    category: "New Enquiries",
    organization: "Org B",
    callbackTime: "18 Nov 11:00 AM",
  },
  {
    id: 3,
    category: "New Enquiries",
    organization: "Org C",
    callbackTime: "19 Nov 12:00 PM",
  },
  {
    id: 4,
    category: "New Enquiries",
    organization: "Org X",
    callbackTime: "20 Nov 10:00 AM",
  },
  {
    id: 5,
    category: "New Enquiries",
    organization: "Org Y",
    callbackTime: "19 Nov 11:30 AM",
  },
  {
    id: 6,
    category: "New Enquiries",
    organization: "Org Z",
    callbackTime: "18 Nov 12:00 PM",
  },
  {
    id: 7,
    category: "Discussions in Progress",
    organization: "Org D",
    callbackTime: "20 Nov 1:00 PM",
  },
  {
    id: 8,
    category: "Discussions in Progress",
    organization: "Org E",
    callbackTime: "2:00 PM",
  },
  {
    id: 9,
    category: "Delivered",
    organization: "Org F",
    callbackTime: "3:00 PM",
  },
  {
    id: 10,
    category: "Delivered",
    organization: "Org G",
    callbackTime: "4:00 PM",
  },
  {
    id: 11,
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
  { aveRating: 3.5, month: "September" },
  { aveRating: 4.5, month: "October" },
  { aveRating: 5, month: "November" },
  { aveRating: 0, month: "December" },
];

export const viewershipData = [
  { name: "Professionals", views: 400, color: "#FF4D4D" }, // Red
  { name: "Workshops", views: 700, color: "#FFC107" }, // Yellow
  { name: "Labs", views: 200, color: "#B0BEC5" }, // Grey
  { name: "Camps", views: 1000, color: "#009688" }, // Green
];

export const courseData = [
  {
    title: "Public Speaking",
    currentCount: 39,
    maxCount: 45,
    sessions: [
      { date: "30/11/2024", level: "Beginner", status: "Full" },
      { date: "5/12/2024", level: "Intermediate", slotsLeft: 6 },
    ],
  },
  {
    title: "PSLE Oral",
    currentCount: 39,
    maxCount: 45,
    sessions: [
      { date: "30/11/2024", level: "Beginner", status: "Full" },
      { date: "5/12/2024", level: "Intermediate", slotsLeft: 6 },
    ],
  },
  {
    title: "Entrepreneurship",
    currentCount: 39,
    maxCount: 45,
    sessions: [
      { date: "30/11/2024", level: "Beginner", status: "Full" },
      { date: "5/12/2024", level: "Intermediate", slotsLeft: 6 },
    ],
  },
];

export const surveyData = {
  publicity: ["Google", "Word of Mouth", "Facebook"],
  keyInterests: ["Entrepreneurship", "Toastmaster", "Leadership"],
};
