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
  { name: "New Enquiries", value: 6, color: "#FF4D4D" }, // Red
  { name: "Discussions in Progress", value: 4, color: "#db7c26" }, // Orange
  { name: "Delivered", value: 2, color: "#0e6ba8" }, // Blue
  { name: "Confirmed", value: 1, color: "#009688" }, // Teal
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
    title: "PSLE Power Up",
    currentCount: 34,
    maxCount: 50,
    sessions: [
      { date: "19/12/2024", level: " ", slotsLeft: 3 },
      { date: "28/12/2024", level: " ", slotsLeft: 13 },
    ],
  },
  {
    title: "Entrepreneurship",
    currentCount: 8,
    maxCount: 15,
    sessions: [{ date: "12/12/2024", level: " ", slotsLeft: 7 }],
  },
];

export const surveyData = {
  publicity: ["Google", "Word of Mouth", "Facebook"],
  keyInterests: ["Entrepreneurship", "Toastmaster", "Leadership"],
};

export const programmeDashboardData = {
  visitors: 1176,
  subscribers: 500,
  members: 73,
  date: "2024-10-08",
  professionals: [
    { id: 1, status: "Enquire", date: "2024-10-08" },
    { id: 2, status: "In Progress", date: "2024-10-08" },
    { id: 3, status: "Complete", date: "2024-10-08" },
  ],
  transactions: [
    { id: 1, programme: "S1020", qty: 2, status: "Paid", date: "2024-10-08" },
    {
      id: 2,
      programme: "$499",
      qty: 1,
      status: "Pending",
      date: "2024-10-08",
    },
    { id: 3, programme: "$800", qty: 1, status: "Paid", date: "2024-10-08" },
  ],
  programmes: [
    {
      id: 1,
      name: "Programme Name",
      price: "$300",
      venue: "Venue",
      sessions: ["5/12/2024 - 7/12/2024", "4/1/2024 - 6/1/2024"],
    },
    {
      id: 2,
      name: "Programme Name",
      price: "",
      venue: "Venue",
      sessions: ["5/12/2024 - 7/12/2024", "4/1/2024 - 6/1/2024"],
    },
  ],
  seminars: [
    {
      id: 1,
      name: "Seminar Name",
      venue: "Venue",
      date: "20/12/2024",
      seats: 50,
    },
    {
      id: 2,
      name: "Seminar Name",
      venue: "Venue",
      date: "20/12/2024",
      seats: 50,
    },
  ],
};

export const salesSupplyData = {
  Workshop: [
    { month: "Sept", sales: 15, views: 100 },
    { month: "Oct", sales: 4, views: 200 },
    { month: "Nov", sales: 20, views: 400 },
  ],
  Camp: [
    { month: "Sept", sales: 1, views: 8 },
    { month: "Oct", sales: 10, views: 85 },
    { month: "Nov", sales: 23, views: 200 },
  ],
  Lab: [
    { month: "Sept", sales: 4, views: 40 },
    { month: "Oct", sales: 1, views: 9 },
    { month: "Nov", sales: 3, views: 14 },
  ],
  Professional: [
    { month: "Sept", sales: 1, views: 30 },
    { month: "Oct", sales: 1, views: 10 },
    { month: "Nov", sales: 1, views: 80 },
  ],
};
