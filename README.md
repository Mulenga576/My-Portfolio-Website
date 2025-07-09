# Mulenga Mpikula Silence - Portfolio Website

A modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Supabase, showcasing my skills, projects, and professional experience.

## ✨ Features

- 🚀 Blazing fast performance with Next.js 14
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Fully responsive design
- 📝 Contact form with Supabase backend
- 🔍 SEO optimized
- 🔄 Real-time updates
- 🔒 Secure authentication (if enabled)
- ⚡ Performance optimized
- 🎨 Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account (for the backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > General > Your Apps
5. Click the web icon (</>) to register your app
6. Copy the Firebase configuration object
7. Create a new file `js/firebase-config.js` with your Firebase configuration

### Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## 🛠️ Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Firebase (Authentication, Firestore, Hosting)
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [AOS](https://michalsnik.github.io/aos/) for scroll animations

## 🔧 Project Structure

```
portfolio/
├── assets/               # Static assets
│   ├── images/           # Image files
│   └── fonts/            # Custom fonts
├── css/                  # Stylesheets
│   ├── styles.css        # Global styles
│   └── portfolio-styles.css # Portfolio page styles
├── js/                   # JavaScript files
│   ├── firebase-config.js # Firebase configuration
│   ├── contact-form.js   # Contact form handling
│   ├── portfolio-clean.js # Portfolio page scripts
│   └── script.js         # Main JavaScript file
├── index.html            # Home page
├── portfolio.html        # Portfolio page
└── README.md             # This file
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- [Google Fonts](https://fonts.google.com/) for the typography
- [AOS](https://michalsnik.github.io/aos/) for the smooth scroll animations
- [Firebase](https://firebase.google.com/) for the backend services

## 📬 Contact

- Email: smpikula@u.rochester.edu
- LinkedIn: [Silence Mpikula](https://www.linkedin.com/in/silence-mpikula-24a559335/)
- GitHub: [Mulenga576](https://github.com/Mulenga576)

---

Made with ❤️ by Mulenga Mpikula Silence