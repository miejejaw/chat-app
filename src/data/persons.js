const persons = [
  {
    "id": 1,
    "name": "Jessica Drew",
    "message": "Great! See you tomorrow.",
    "time": "18:50",
    "unread": 2,
    "profilePic": "/avatars/1.svg",
    "lastSeen": "18:50",
    "messages": [
      {
        "id": 1,
        "message": "Hey, how have you been? 😊",
        "time": "18:10",
        "isSelf": false
      },
      {
        "id": 2,
        "message": "I've been good! What about you?",
        "time": "18:15",
        "isSelf": true
      },
      {
        "id": 3,
        "message": "Let's meet for coffee tomorrow. ☕ What do you think? 😂 It'll be fun, I promise!",
        "time": "18:16",
        "isSelf": false
      },
      {
        "id": 4,
        "message": "Sure, sounds good! I need a break from all this work. 💻",
        "time": "18:30",
        "isSelf": true
      },
      {
        "id": 5,
        "message": "Great! See you tomorrow. 😄",
        "time": "18:50",
        "isSelf": false
      }
    ]
  },
  {
    "id": 2,
    "name": "David Moore",
    "message": "Let's catch up over the weekend.",
    "time": "18:25",
    "unread": 1,
    "profilePic": "/avatars/2.svg",
    "lastSeen": "18:25",
    "messages": [
      {
        "id": 1,
        "message": "I’m so excited for the weekend! 🎉 It’s been such a long week...",
        "time": "18:16",
        "isSelf": false
      },
      {
        "id": 2,
        "message": "Me too! Any plans? 😁",
        "time": "18:18",
        "isSelf": true
      },
      {
        "id": 3,
        "message": "Not yet. Let’s catch up over the weekend. 😎",
        "time": "18:25",
        "isSelf": false
      },
      {
        "id": 4,
        "message": "Sounds good! I’ll let you know. 😄",
        "time": "18:30",
        "isSelf": false
      }
    ]
  },
  {
    "id": 3,
    "name": "Greg James",
    "message": "I can't wait to start this new chapter. 🚀",
    "time": "17:50",
    "unread": 0,
    "profilePic": "/avatars/3.svg",
    "lastSeen": "17:50",
    "messages": [
      {
        "id": 1,
        "message": "I just got a job at SpaceX! 🚀 I can’t believe it!",
        "time": "17:46",
        "isSelf": false
      },
      {
        "id": 2,
        "message": "Wow! That’s amazing news! Congrats, Greg! 🎉",
        "time": "17:50",
        "isSelf": true
      },
      {
        "id": 3,
        "message": "Can you send me the files for the project? 📂 I need them by EOD.",
        "time": "17:51",
        "isSelf": true
      },
      {
        "id": 4,
        "message": "Thanks! I can't wait to start this new chapter. 😄",
        "time": "17:50",
        "isSelf": false
      }
    ]
  },
  {
    "id": 4,
    "name": "John Doe",
    "message": "Thanks! Looking forward to it.",
    "time": "16:50",
    "unread": 0,
    "profilePic": "/avatars/4.svg",
    "lastSeen": "16:50",
    "messages": [
      {
        "id": 1,
        "message": "Did you receive my last email? 📧 Just wanted to confirm.",
        "time": "16:46",
        "isSelf": false
      },
      {
        "id": 2,
        "message": "Yes, got it! I'll review it tonight. 👍",
        "time": "16:50",
        "isSelf": true
      },
      {
        "id": 3,
        "message": "Thanks! Looking forward to it.",
        "time": "16:50",
        "isSelf": false
      }
    ]
  },
  {
    "id": 5,
    "name": "Emily Jane",
    "message": "I’ll share the final designs soon!",
    "time": "15:55",
    "unread": 0,
    "profilePic": "/avatars/5.svg",
    "lastSeen": "15:55",
    "messages": [
      {
        "id": 1,
        "message": "I’m working on the new project. 🎨 It’s going really well!",
        "time": "15:46",
        "isSelf": false
      },
      {
        "id": 2,
        "message": "That's awesome! Can't wait to see it. 👀",
        "time": "15:50",
        "isSelf": true
      },
      {
        "id": 3,
        "message": "I’ll share the final designs soon! 💼",
        "time": "15:55",
        "isSelf": false
      }
    ]
  },
  {
    "id": 6,
    "name": "Linda Moore",
    "message": "Thanks, appreciate it.",
    "time": "14:50",
    "unread": 0,
    "profilePic": "/avatars/6.svg",
    "lastSeen": "14:50",
    "messages": [
      {
        "id": 1,
        "message": "Can you send me the files for the project? 📂 I need them by EOD.",
        "time": "14:46",
        "isSelf": false
      },
      {
        "id": 2,
        "message": "Sure! I'll send them over in a few minutes. 📧",
        "time": "14:50",
        "isSelf": true
      },
      {
        "id": 3,
        "message": "Thanks, appreciate it. 🙌",
        "time": "14:50",
        "isSelf": false
      }
    ]
  },
  {
    "id": 7,
    "name": "Alexa",
    "message": "Looking forward to it!",
    "time": "13:50",
    "unread": 0,
    "profilePic": "/avatars/7.svg",
    "lastSeen": "13:50",
    "messages": [
      {
        "id": 1,
        "message": "Let's catch up this weekend! 🎉 It's been too long!",
        "time": "13:46",
        "isSelf": false
      },
      {
        "id": 2,
        "message": "Definitely! Saturday works for me. 🗓️",
        "time": "13:50",
        "isSelf": true
      },
      {
        "id": 3,
        "message": "Looking forward to it! 😄",
        "time": "13:50",
        "isSelf": false
      }
    ]
  },
  {
    "id": 8,
    "name": "John Doe",
    "message": "I'll get back to you later today!",
    "time": "12:50",
    "unread": 0,
    "profilePic": "",
    "lastSeen": "12:50",
    "messages": [
      {
        "id": 1,
        "message": "Did you receive my last email? 📧 Just following up.",
        "time": "12:46",
        "isSelf": false
      },
      {
        "id": 2,
        "message": "Yes, I saw it. I'll get back to you later today! 👍",
        "time": "12:50",
        "isSelf": true
      }
    ]
  }
];

export { persons };