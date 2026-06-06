# Buddies Unleashed Adventure Clan Website

A professional, mobile-responsive website for the Buddies Unleashed motorcycle riding community.

## Features
- **Premium Biker Aesthetic**: Dark theme with red and white accents reflecting the club's identity.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.
- **AOS Animations**: Smooth scroll-reveal animations for an engaging user experience.
- **WhatsApp Integration**: Direct integration with WhatsApp for easy membership joining and contact.
- **Dynamic Event Management**: An integrated Admin Dashboard (`admin.html`) to easily update upcoming rides across the site via a local Node.js server.
- **Dynamic Gallery & Visited Places**: High-quality visual showcase powered by JavaScript data.
- **Sticky Navigation**: Easy access to sections as you scroll.

## Technologies Used
- HTML5 & CSS3
- Tailwind CSS (via CDN)
- JavaScript (Vanilla)
- Node.js (Vanilla HTTP for the Admin Event API - `serve.js`)
- AOS (Animate On Scroll) Library
- FontAwesome (Icons)
- Google Fonts (Bebas Neue, Inter, & Poppins)

## Setup & Deployment
1. **Local View**: 
   - Open `index.html` in any modern web browser for the static version.
   - To use the Admin Dashboard and Event API, run the Node server: `node serve.js` and access via `http://localhost:8000`.
2. **Customization**:
   - Update event details via `admin.html` (requires the local server).
   - Add new gallery images and visited places by updating `js/gallery-data.js`.
3. **Deployment**:
   - Ready for deployment on platforms like Netlify, GitHub Pages, or Vercel.
   - Ensure all assets, CSS, and JS folders are included. *Note: The `/api/event` endpoints rely on a backend environment like Node.js if you want dynamic updates in production.*

## Structure
- `index.html`: Main website file.
- `admin.html`: Admin login and dashboard for updating events.
- `serve.js`: Node.js server handling the events API.
- `assets/`: Contains hero, gallery, and team images.
- `js/`: Contains main functionality (`script.js`) and dynamic data (`gallery-data.js`).
- `convert_images.py`: A Python script to help format and resize images for the site.

---
*Ride with Freedom & Wisdom.*
