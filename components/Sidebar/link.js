import { userTypes } from "../../constants/userTypes"

const Features = [
    {
        mainTitle: 'Dashboard',
        mainLink: '/',
        iconLink: 'assets/images/Dashboard.png',
        type: []
    },
    {
        mainTitle: 'Create Notifications',
        mainLink: '/CreateNotification',
        iconLink: 'assets/images/Bell.png',
        type: []
    },
    {
        mainTitle: 'Past Notifications',
        mainLink: '/PastNotification',
        iconLink: 'assets/images/Bell.png',
        type: [userTypes.FACULTY, userTypes.PRINCIPAL]
    },
    {
        mainTitle: 'Create Notes',
        mainLink: '/CreateNote',
        iconLink: 'assets/images/Notes.png',
        type: [userTypes.FACULTY]
    },
    {
        mainTitle: 'Past Notes',
        mainLink: '/PastNote',
        iconLink: 'assets/images/Notes.png',
        type: [userTypes.FACULTY]
    },
    {
        mainTitle: 'Create Event',
        mainLink: '/CreateEvent',
        iconLink: 'assets/images/Notes.png',
        type: [userTypes.COMMITTEE]
    },
    {
        mainTitle: 'Create Reminder',
        mainLink: '/CreateReminder',
        iconLink: 'assets/images/Notes.png',
        type: [userTypes.FACULTY, userTypes.PRINCIPAL]
    },
]
export default Features