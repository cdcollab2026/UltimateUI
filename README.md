# Wine Shop - React + Vite + Tailwind CSS

A modern wine shopping application built with React, Vite, and Tailwind CSS featuring dynamic theming and a complete shopping experience.

## Features

- **Dynamic Theming**: Light and dark mode support with persistent preferences
- **Wine Catalog**: Browse and search through a curated collection of premium wines
- **Wine Details**: Detailed product pages with comprehensive wine information
- **Shopping Cart**: Full cart functionality with quantity management
- **Filtering**: Filter wines by type (Red, White, Sparkling)
- **Search**: Real-time search across wine names, regions, and grape varieties
- **Responsive Design**: Fully responsive layout for all screen sizes
- **Modern UI**: Clean, modern interface with smooth animations

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd wine-shop
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
wine-shop/
├── src/
│   ├── components/
│   │   └── Navigation.jsx       # Main navigation bar
│   ├── context/
│   │   ├── ThemeContext.jsx     # Theme management (light/dark)
│   │   └── CartContext.jsx      # Shopping cart state management
│   ├── data/
│   │   └── wines.js             # Static wine data (to be replaced with API)
│   ├── pages/
│   │   ├── Home.jsx             # Wine catalog with search and filters
│   │   ├── WineDetail.jsx       # Individual wine details page
│   │   └── Cart.jsx             # Shopping cart page
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind imports
├── index.html
├── package.json
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
└── vite.config.js               # Vite configuration
```

## API Integration

The application currently uses static data in `src/data/wines.js`. To integrate with an API:

1. Replace the static `wines` array in `src/data/wines.js` with API calls
2. Update the components to fetch data from your API endpoints
3. Add loading states and error handling as needed

## Theme Customization

The theme can be customized in:
- `tailwind.config.js` - Add custom colors and design tokens
- `src/index.css` - Modify CSS custom properties for theming

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
