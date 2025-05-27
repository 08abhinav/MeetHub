# MeetHub 🧑‍💻📹

A modern Google Meet clone built with Next.js, TypeScript, and ZEGOCLOUD for real-time video conferencing. MeetHub supports responsive design, and smooth UI for a seamless virtual meeting experience.


## 🚀 Features

- 🔐 User Authentication (NextAuth)
- 🎥 Real-Time Video & Audio Chat (ZEGOCLOUD)
- 💬 In-Meeting Chat Messaging
- 🖥️ Screen Sharing
- 📡 Peer-to-Peer Communication with Cloud Infra
- 🎨 Custom Fonts with Geist (Google Fonts)
- 📱 Fully Responsive UI
- ⚡ Fast Rendering with SSR + Client Components

---

## 🧰 Tech Stack

| Category       | Tools/Frameworks                          |
|----------------|-------------------------------------------|
| Frontend       | Next.js (App Router), TypeScript          |
| Styling        | Tailwind CSS, Shadcn/UI                   |
| Fonts          | Geist Sans, Geist Mono (Google Fonts)     |
| Real-time Comm | ZEGOCLOUD API                             |
| Deployment     | Vercel                                    |

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/08abhinav/meethub.git
cd meethub

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Fill in the required keys (see below)

# 4. Run the app locally
npm dev
