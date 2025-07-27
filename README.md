 fundingPips - Real-Time Stock Tracking App
A modern web application built with Next.js 15, Zustand, Tailwind CSS, and Sonner for toasts. It simulates real-time stock tracking, dynamic watchlists, and live price updates – ideal for practice or demos.

🌐 Live Demo
🔗 Visit the app on Vercel
https://fundingpips-frontend-assessment-mocha.vercel.app/
🎥 Demo Video
https://www.youtube.com/watch?v=nrggX-KVc18



🚀 Features
🔍 Real-time stock price simulation

📊 Watchlist with live updates

🔐 JWT-based mock login/register

💡 Toast notifications (Sonner)

🎨 Fully responsive UI with Tailwind

⚡ Infinite scroll with loading skeletons

🌗 Dark/light theme support

🛠️ Tech Stack
Next.js 15(App Router)

Zustand (Global store)

Tailwind CSS (Styling)

Sonner (Modern toast notifications)

Radix UI + custom components

Zod for validation

React Hook Form for forms

JWT + bcrypt (Mock auth)

📦 Installation
bash
Copy
Edit
git clone
cd fundingPips
npm install
🔑 Environment Variables
Create a .env.local file:pass the key
ini
Copy
Edit
# NEXT_PUBLIC_TWELVE_DATA_API_KEY= use your key
🧪 Run Locally
bash
Copy
Edit
npm run dev
Open http://localhost:3000


📁 Folder Structure
vbnet
Copy
Edit
app/
  api/        → Mock auth endpoints
  stock/      → Dynamic route for stock details
components/   → UI & feature components
lib/          → Zustand store, mock data, auth logic
public/       → Static assets
styles/       → Global styles (Tailwind)

✅ Coming Soon (Ideas)
User portfolio management
Trading simulator logic
Data persistence with Supabase/Firebase
