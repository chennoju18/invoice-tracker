> 📌 **Project Summary:** Upload invoices → extract amount, vendor, and 
due date using OCR + NLP → track them in calendar view and get email reminders.

# 📄 Invoice Scanner + Payment Tracker

🔗 **Live Demo**: [https://invoice-tracker-frontend.onrender.com](https://invoice-tracker-frontend.onrender.com)


A full-stack app that allows users to upload invoices (image or PDF), 
extract key data (vendor, amount, due date) using OCR and NLP, track them 
on a calender, and get email reminders before due dates.

---

## 🚀 Features

- 📤 Upload invoice (image/PDF)
- 🔍 OCR via Tesseract
- 🧠 NLP to extract invoice fields
- 📅 Visual calendar to show due dates
- 📬 Email reminders for upcoming invoices
- 💾 MongoDB for storage

---

## 🧪 Try It Yourself!

- Enter your own email address and upload any invoice (image or PDF)
- On the invoice's due date, you’ll receive a real reminder email

---

## 🛠 Tech Stack

| Layer      | Tech                    |
|------------|-------------------------|
| Frontend   | React.js, CSS           |
| Backend    | Flask (Python)          |
| OCR/NLP    | pytesseract, re         |
| Database   | MongoDB                 |
| Email      | Gmail SMTP              |

---

## 📸 Screenshots

### Invoice Upload + Result
![Invoice Upload](frontend/public/invoice-upload-result.png)

### Calendar View
![Calendar View](frontend/public/invoice-calendar-view.png)

### Full App Screenshot
![Full App](frontend/public/invoice-app-main.png)

---

## 🧪 How to Run the App (Backend + Frontend + Email)

```bash
# 👉 Run Flask Backend
cd backend
source venv/bin/activate
python app.py

# 👉 Run React Frontend
cd ../frontend
npm install
npm start

# 👉 Setup Email Reminders (edit this file with your Gmail credentials)
nano ../backend/send_reminders.py

# Inside send_reminders.py, set:
# EMAIL_USER = "your_email@gmail.com"
# EMAIL_PASS = "your_app_password"

