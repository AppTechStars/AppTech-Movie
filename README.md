# 🎬 Movie Website

A **React-based** movie website that fetches and displays trending movies using the **TMDB API**. Users can browse the latest movies, view movie details, and navigate through a user-friendly interface.

## 🚀 Features

- 🔍 **Search for Movies** – Find movies by title.
- 📌 **Trending Movies Section** – Displays the most popular movies.
- 🎭 **Movie Popup** – View detailed movie information.
- 📱 **Fully Responsive** – Works on mobile, tablet, and desktop.
- 🌙 **Modern UI Design** – Styled using CSS & Styled Components.
- 🎬 **TMDB API Integration** – Fetches real-time movie data.
- 🔗 **Social Media Links** – Connect via footer icons.

## 🛠️ Technologies Used

- **React.js** – Frontend framework.
- **React Router** – Navigation and routing.
- **TMDB API** – Fetches movie data.
- **Styled Components** – Styling and responsiveness.
- **FontAwesome** – Social media icons.
- **Vite** – Fast build tool for React.

## 📦 Installation & Setup

1️⃣ **Clone the repository:**
```sh
 git clone https://github.com/your-username/movie-website.git
 cd movie-website
```

2️⃣ **Install dependencies:**
```sh
 npm install
```

3️⃣ **Create a `.env` file and add your TMDB API key:**
```sh
REACT_APP_TMDB_API_KEY=your_api_key_here
```

4️⃣ **Run the development server:**
```sh
 npm run dev
```

5️⃣ **Open the app in your browser:**
```
 http://localhost:5173
```

## 📁 Project Structure
```
📂 src
 ┣ 📂 components
 ┃ ┣ 📜 Navbar.jsx
 ┃ ┣ 📜 Footer.jsx
 ┣ 📂 pages
 ┃ ┣ 📜 Home.jsx
 ┃ ┣ 📜 MovieDetails.jsx
 ┣ 📂 api
 ┃ ┣ 📜 tmdb.js
 ┣ 📂 assets
 ┣ 📜 App.jsx
 ┣ 📜 main.jsx
 ┗ 📜 index.css
```

## 🌍 API Reference

### 🔗 **TMDB API Endpoint**
To fetch trending movies:
```sh
https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_API_KEY
```

### 🔍 **Search for Movies**
```sh
https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=search_term
```

## 🖼️ Screenshots
![Movie Homepage](https://your-image-link.jpg)
![Movie Details Page](https://your-image-link.jpg)

## 🏗️ Future Improvements
- 🎞️ Add movie trailers.
- 🌟 User authentication for favorites.
- 🎭 Dark/Light theme toggle.

## 👨‍💻 Author
- **AppTech Stars** – [GitHub](https://github.com/your-username)

## 📜 License
This project is **MIT Licensed**.

