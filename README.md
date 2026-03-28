# 📋 TaskManager App

A full-stack Task Management application built with **FastAPI** (Python) backend and **React + Vite** frontend, featuring JWT authentication and role-based access control.

---

## 🚀 Tech Stack

### Backend
- **FastAPI** — REST API framework
- **MySQL** — Database
- **SQLAlchemy** — ORM
- **JWT** — Authentication
- **Bcrypt** — Password hashing
- **Swagger UI** — API documentation

### Frontend
- **React + Vite** — Frontend framework
- **React Router** — Navigation
- **Axios** — HTTP client

---

## ✨ Features

- ✅ User registration & login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (user vs admin)
- ✅ CRUD APIs for Tasks
- ✅ API versioning (/api/v1)
- ✅ Swagger documentation
- ✅ Protected frontend routes
- ✅ Responsive UI

---

## 📁 Project Structure
```
TaskManagerApp/
├── .gitignore
├── README.md
├── BackendTaskmanager/
│   ├── app/
│   │   ├── config/
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   └── task.py
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   └── task.py
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   └── task.py
│   │   ├── utils/
│   │   │   ├── auth.py
│   │   │   └── hashing.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
└── FrontendTaskmanager/
    └── frontend/
        ├── src/
        │   ├── pages/
        │   │   ├── Login.jsx
        │   │   ├── Login.css
        │   │   ├── Register.jsx
        │   │   ├── Register.css
        │   │   ├── Dashboard.jsx
        │   │   └── Dashboard.css
        │   ├── services/
        │   │   └── api.js
        │   ├── App.jsx
        │   └── index.css
        ├── index.html
        ├── vite.config.js
        └── package.json
```

---

## ⚙️ Setup & Installation

### Backend Setup

**1. Go to backend folder:**
```bash
cd BackendTaskmanager
```

**2. Create virtual environment:**
```bash
python -m venv venv
```

**3. Activate virtual environment:**
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

**4. Install dependencies:**
```bash
pip install -r requirements.txt
```

**5. Create `.env` file:**
```
DATABASE_URL=mysql+pymysql://root:yourpassword@localhost:3306/taskmanager
SECRET_KEY=your-super-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**6. Create MySQL database:**
```sql
CREATE DATABASE taskmanager;
```

**7. Run backend server:**
```bash
uvicorn app.main:app --reload
```

- Backend runs on: `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

### Frontend Setup

**1. Go to frontend folder:**
```bash
cd FrontendTaskmanager/frontend
```

**2. Install dependencies:**
```bash
npm install
```

**3. Run frontend:**
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| GET | `/api/v1/auth/me` | Get current user | JWT Required |

### Tasks
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/tasks/` | Create task | JWT Required |
| GET | `/api/v1/tasks/` | Get my tasks | JWT Required |
| GET | `/api/v1/tasks/all` | Get all tasks | Admin Only |
| GET | `/api/v1/tasks/{id}` | Get task by ID | JWT Required |
| PUT | `/api/v1/tasks/{id}` | Update task | JWT Required |
| DELETE | `/api/v1/tasks/{id}` | Delete task | JWT Required |

---

## 🔐 Security Features

- JWT tokens with expiry
- Password hashing with bcrypt
- Role-based access (user/admin)
- Input validation with Pydantic
- CORS configuration

---

## 📈 Scalability Notes

- **Modular structure** — easy to add new modules
- **API versioning** — `/api/v1/` for backward compatibility
- **Database migrations** — Alembic ready
- **Microservices ready** — each module independent
- **Caching** — Redis can be added easily
- **Load balancing** — Stateless JWT allows horizontal scaling
- **Docker** — Can be containerized easily

---

## 👨‍💻 Author

**Shivam Nayak**
- GitHub: [ShivamNayak-dev](https://github.com/ShivamNayak-dev)
- Email: shivamkumarnayak15@gmail.com
```

---

Save with **Ctrl+S**!

Then run in terminal:
```
git init
```
```
git add .
```
```
git commit -m "Initial commit - TaskManager App with FastAPI and React"
