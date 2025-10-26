# PICMYFIT — Your Personalized AI Stylist

**Live Website:** [www.picmyfit.xyz](https://www.picmyfit.xyz)

---

## Project Overview
**PICMYFIT** is an AI-powered personalized fashion recommendation system that acts as your virtual stylist. It analyzes your style preferences, body type, and current trends to provide outfit suggestions that best suit your look and personality.

This project uses **AI-based recommendation algorithms** and an intuitive **web interface** to offer an intelligent styling experience. Users can upload their photos or input their preferences to receive customized fashion suggestions instantly.

---

## ✨ Key Features
- 👕 **AI-Powered Styling:** Personalized outfit recommendations using image and preference analysis.
- 🧍‍♀️ **Body & Color Analysis:** Detects your body type and suggests outfits accordingly.
- 💬 **Style Chatbot:** Interact with your virtual stylist for instant outfit ideas.
- ☁️ **Cloud-Integrated:** Secure and fast cloud hosting.
- 📱 **Responsive UI:** Works seamlessly on mobile, tablet, and desktop.

---

## 🧩 Tech Stack
| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js |
| **Database** | Supabase |
| **Hosting** | Custom domain (www.picmyfit.xyz) |

---

## ⚙️ Local Setup Guide
Follow these steps to **run PICMYFIT locally** on your system 👇

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Jainex2/PICMYFIT_CLG.git
```

### 2️⃣ Navigate to the Project Directory
```bash
cd PICMYFIT_CLG
```

### 3️⃣ Install Dependencies
Make sure you have **Node.js** and **npm** installed.
```bash
npm install
```

### 4️⃣ Configure Environment Variables
Create a file named `.env` in the root directory and add your configuration:
```env
VITE_SUPABASE_URL=supabase_connection_string
VITE_SUPABASE_ANON_KEY=your_openai_api_key
VITE_APP_NAME=PICMYFIT
VITE_APP_URL=http://localhost:5173
```

### 5️⃣ Run the Backend Server
```bash
npm run server
```

### 6️⃣ Run the Frontend (React App)
Open a new terminal window and run:
```bash
npm start
```

### 7️⃣ View in Browser
Visit:
```
http://localhost:5173
```
Your personalized AI stylist will be live locally!

---

## 🧍‍♂️ How It Works
1. **Upload or Select Style Preference:** The user uploads an image or fills a short style quiz.
2. **AI Model Processing:** The system analyzes the user’s face, body structure, and color preferences.
3. **Personalized Recommendation:** The AI stylist suggests ideal outfit combinations.
4. **Save or Share:** Users can save their favorite looks or share them instantly.

---

## 🚀 Deployment
The live version of PICMYFIT is hosted on a cloud server with the domain:
🔗 **[www.picmyfit.xyz](https://www.picmyfit.xyz)**

It uses a CI/CD pipeline through **GitHub → Vercel** for continuous deployment. Every new push to the `main` branch automatically updates the live site.

---

## 🧑‍💻 Project Structure
```
PICMYFIT_CLG/
│
├── backend/           # Express.js backend APIs
├── frontend/          # React.js frontend
├── models/            # Database schemas
├── routes/            # API routes
├── public/            # Static assets
├── .env.example       # Example environment configuration
├── package.json       # Dependencies
└── README.md          # Documentation
```

---

## 🔒 Security & Privacy
- User images are **not stored permanently** — only processed temporarily for outfit recommendations.
- All sensitive data is encrypted using **AES encryption**.
- Secure API communication via **HTTPS**.

---

## 📈 Future Enhancements
- 👗 Integration of virtual try-on using AR.
- 🧠 Smarter style learning from user feedback.
- 🌎 Multi-language support.
- 🛍️ Integration with e-commerce platforms for direct outfit purchase.

---

## 💡 Author
**Developed by:** Jainex Pumbhadiya  
**GitHub:** [@Jainex2](https://github.com/Jainex2)  
**Website:** [www.picmyfit.xyz](https://www.picmyfit.xyz)

---

## 📜 License
This project is licensed under the **MIT License** — feel free to use and modify it with proper attribution.
