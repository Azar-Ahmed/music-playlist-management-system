# 🛒 Music Playlists Management Backend

This is a robust **Node.js + Express.js** backend API designed for an music management system. It features **user authentication**, **profile management**, **secure password handling**, **image uploads**, and **complete playlist CRUD operations**.

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

### ▶️ Start Development Server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in your root directory with the following values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 📁 Folder Structure

```
project-root/
├── controllers/         # Business logic (auth, user, product)
├── middlewares/         # Auth, validation, error handling
├── models/              # Mongoose schemas
├── routes/              # User and product route handlers
├── utils/               # Utilities (token handling, Cloudinary)
├── uploads/             # Temporary uploads (if any)
├── .env                 # Environment variables
├── app.js               # Express app config
├── server.js            # Server entry point
└── README.md
```

---

## 🧪 Tech Stack

- **Backend Framework**: Express.js (v5)
- **Database**: MongoDB + Mongoose
- **Auth**: JWT
- **Validation**: Joi
- **File Uploads**: express-fileupload + Cloudinary
- **Security**: bcryptjs, cookie-parser
- **CORS Support**: cors
- **Environment Config**: dotenv

---

## 📦 Installed Packages

```json
"bcryptjs": "^3.0.2",
"body-parser": "^2.2.0",
"cloudinary": "^2.6.1",
"cookie-parser": "^1.4.7",
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"express-fileupload": "^1.5.1",
"joi": "^17.13.3",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.15.0"
```

---

## 👤 User Routes

| Method | Route              | Access         | Description             |
|--------|--------------------|----------------|-------------------------|
| POST   | `/signup`          | Public         | Register new user       |
| POST   | `/signin`          | Public         | Login user              |
| GET    | `/signout`         | Authenticated  | Logout user             |
| PUT    | `/update`          | Authenticated  | Update user profile     |
| PUT    | `/change-password` | Authenticated  | Change user password    |

---

## 🛍️ playlist Routes

| Method | Route             | Access     | Description               |
|--------|-------------------|------------|---------------------------|
| POST   | `/add`            | Authenticated      | Add a new playlist         |
| PUT    | `/update/:id`     | Authenticated      | Update playlist by ID      |
| DELETE | `/delete/:id`     | Authenticated      | Delete playlist by ID      |
| GET    | `/`               | Authenticated     | Get all playlists          |
| GET    | `/:id`            | Authenticated     | Get playlist details       |

---

## 🛍️ Songs Routes

| Method | Route             | Access     | Description               |
|--------|-------------------|------------|---------------------------|
| POST   | `/add`            | Authenticated      | Add song to playlist         |
| POST   | `/remove`         | Authenticated      | Remove song to playlist         |


---

## 👤 User Model Schema

```js
{
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  phone:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  profileImage:{ type: String, required: true },
  role:        { type: String, enum: ["user", "admin"], default: "user" }
}
```

---

## 📦 Playlist Model Schema

```js
 {
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }], // <-- many songs here
  },
```
## 📦 Song Model Schema

```js
{
   spotifyId: { type: String, required: true, unique: true, trim: true }, // to avoid duplicates
    image: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    album: { type: String, required: true, trim: true },
  
}

--
---

## 🔐 Middleware

- **`isAuthenticated`** – Validates JWT token.
- **`validate(schema)`** – Validates request body using Joi schema.

---

## 📖 Swagger API Documentation (Optional)

You can integrate Swagger using:

```bash
npm install swagger-ui-express yamljs
```

Sample setup in `app.js`:

```js
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

Then visit:

```
http://localhost:5001/api-docs
```

---

## 📬 Contact

For bug reports, feature requests, or contributions, feel free to open an issue.

---

**Made with ❤️ using Node.js + Express + MongoDB**
