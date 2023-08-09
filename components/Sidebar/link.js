import { userTypes } from "../../constants/userTypes";

const Features = [
  {
    mainTitle: "Dashboard",
    mainLink: "/",
    lightIconLink: "assets/images/Dashboard.png",
    darkIconLink: "assets/images/dashboard-dark.png",
    type: [],
  },
  {
    mainTitle: "Create Notifications",
    mainLink: "/CreateNotification",
    lightIconLink: "assets/images/Bell.png",
    darkIconLink: "assets/images/bell-dark.png",
    type: [userTypes.FACULTY, userTypes.PRINCIPAL],
  },
  {
    mainTitle: "Past Notifications",
    mainLink: "/PastNotification",
    lightIconLink: "assets/images/Bell.png",
    darkIconLink: "assets/images/bell-dark.png",
    type: [userTypes.FACULTY, userTypes.PRINCIPAL],
  },
  {
    mainTitle: "Create Notes",
    mainLink: "/CreateNote",
    lightIconLink: "assets/images/Notes.png",
    darkIconLink: "assets/images/notes-dark.png",
    type: [userTypes.FACULTY],
  },
  {
    mainTitle: "Past Notes",
    mainLink: "/PastNote",
    lightIconLink: "assets/images/Notes.png",
    darkIconLink: "assets/images/notes-dark.png",
    type: [userTypes.FACULTY],
  },
  {
    mainTitle: "Create Event",
    mainLink: "/CreateEvent",
    lightIconLink: "assets/images/Notes.png",
    darkIconLink: "assets/images/notes-dark.png",
    type: [userTypes.COMMITTEE],
  },

  {
    mainTitle: "Coming Soon",
    mainLink: "/",
    lightIconLink: "assets/images/Notes.png",
    darkIconLink: "assets/images/notes-dark.png",
    type: [userTypes.COMMITTEE],
  },
];
export default Features;