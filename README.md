<<<<<<< HEAD
# TravelX
=======
# TravelX - React Frontend

A modern travel booking platform built with React. Migrated from Bootstrap to React for better component reusability and state management.

## Features

- 🌍 Multiple destination showcases
- 📦 Travel package listings
- 🗺️ Destination exploration
- 📋 Booking form with validation
- 📱 Fully responsive design
- 🎨 Modern UI with custom CSS

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **CSS3** - Styling (custom CSS, no Bootstrap)
- **Axios** - HTTP client (for future API integration)

## Project Structure

```
src/
├── components/
│   ├── Navbar.js         # Navigation component
│   └── Footer.js         # Footer component
├── pages/
│   ├── Home.js           # Home page
│   ├── Destinations.js   # Destinations listing
│   ├── Packages.js       # Tour packages
│   ├── About.js          # About page
│   └── Contact.js        # Contact & booking form
├── App.js                # Main app component
├── index.js              # Entry point
└── index.css             # Global styles
public/
└── index.html            # HTML template
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

### `npm start`
Runs the app in development mode.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

## Navigation

- **Home** (`/`) - Main landing page with hero section
- **Destinations** (`/destinations`) - Browse all destinations
- **Packages** (`/packages`) - View available tour packages
- **About** (`/about`) - Learn about TravelX
- **Contact** (`/contact`) - Book tours and contact us

## Features

### Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop (1200px and above)
- Tablet (768px - 1199px)
- Mobile (below 768px)

### Mobile Navigation
- Hamburger menu on mobile devices
- Smooth navigation with active link highlighting

### Forms
- Booking form with validation
- Contact form with multiple fields
- Real-time form state management

## Future Enhancements

- Backend API integration
- User authentication
- Payment gateway integration
- Booking history
- User reviews and ratings
- Advanced search and filtering

## Notes

- Images are currently referenced but not included. Add your images to the `public/` folder
- Backend endpoints are not yet connected. Update API calls in components when backend is ready
- Consider adding state management (Redux) for larger scale

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
>>>>>>> c7eddc5 (Initial commit)
