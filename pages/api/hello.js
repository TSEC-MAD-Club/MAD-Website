// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const tabData = [
    {
      id: 1,
      name: "Core Committee",
      teams: [
        {
          id: 1,
          name: "Web Team",
          imagePath: "/assets/images/WebTeam.png",
          member: [
            {
              id: 1,
              name: "Mahima Samantara",
              imagePath: "/assets/images/MahimaWebTeam.png",
              content: "BE - IT",
            },
            {
              id: 2,
              name: "Kavish Shah",
              imagePath: "/assets/images/KavishWebTeam.jpg",
              content: "BE - Computer",
            },
            {
              id: 3,
              name: "Jay Kaku",
              imagePath: "/assets/images/JayWebTeam.png",
              content: "BE - Computer",
            },
            {
              id: 4,
              name: "Ritwik Vaidya",
              imagePath: "/assets/images/RitwikWebTeam.jpeg",
              content: "BE - Computer",
            },
          ],
        },
        {
          id: 2,
          name: "Database team",
          imagePath: "/assets/images/DatabaseTeam.png",
          member: [
            {
              id: 1,
              name: "Ruchit Thaker",
              imagePath: "/assets/images/RuchitDatabaseTeam.jpg",
              content: "BE - IT",
            },
            {
              id: 2,
              name: "Keyul Jain",
              imagePath: "/assets/images/KeyulDatabaseTeam.jfif",
              content: "BE - Computer",
            },
          ],
        },
        {
          id: 3,
          name: "App Team",
          imagePath: "/assets/images/AppTeam.png",
          member: [
            {
              id: 1,
              name: "Darshan Rander",
              imagePath: "/assets/images/DarshanAppTeam.png",
              content: "BE - IT",
            },
            {
              id: 2,
              name: "Tanay Kamath",
              imagePath: "/assets/images/TanayAppTeam.png",
              content: "BE - Computer",
            },
            {
              id: 3,
              name: "Gaurav Raj",
              imagePath: "/assets/images/GauravAppTeam.png",
              content: "BE - Computer",
            },
            {
              id: 4,
              name: "Harsh Mody",
              imagePath: "/assets/images/HarshAppTeam.png",
              content: "BE - IT",
            },
          ],
        },
        {
          id: 4,
          name: "Graphics team",
          imagePath: "/assets/images/GraphicsTeam.png",
          member: [
            {
              id: 1,
              name: "Pooja Patel",
              imagePath: "/assets/images/PoojaGraphicsTeam.png",
              content: "BE - Computer",
            },
            {
              id: 2,
              name: "Ishan Saksena",
              imagePath: "/assets/images/IshanGraphicsTeam.png",
              content: "BE - Computer",
            },
          ],
        },
        {
          id: 5,
          name: "Content team",
          imagePath: "/assets/images/ContentTeam.png",
          member: [
            {
              id: 1,
              name: "Amandeep Chawla",
              imagePath: "/assets/images/AmandeepContentTeam.png",
              content: "BE - Chemical",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Mentor",
      teams: [
        {
          id: 1,
          name: "Mentor Team",
          imagePath: "/assets/images/WebTeam.png",
          member: [
            {
              id: 1,
              name: "Dr. G. T. Thampi",
              imagePath: "/assets/images/gtthampi.jpg",
              course: "Principal",
            },
            {
              id: 2,
              name: "Dr. Shachi Natu",
              imagePath: "/assets/images/shachinatu.jpg",
              course: "Computer",
            },
            {
              id: 3,
              name: "Ms. Darakhshan Khan",
              imagePath: "/assets/images/darakhshankhan.jpg",
              course: "Computer",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Founder",
      teams: [
        {
          id: 1,
          name: "Mentor Team",
          imagePath: "/assets/images/WebTeam.png",
          member: [
            {
              id: 1,
              name: "Krishna Dubey",
              imagePath: "/assets/images/krishnadubey.jpeg",
              course: "",
            },
            {
              id: 2,
              name: "Ankita Kar",
              imagePath: "/assets/images/ankitakar.jpg",
              course: "",
            },
            {
              id: 3,
              name: "Rahul Nair",
              imagePath: "/assets/images/rahulnair.jpg",
              course: "",
            },
          ],
        },
      ],
    },
  ];
  res.status(200).json(tabData);
}
