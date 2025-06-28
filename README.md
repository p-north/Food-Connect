
![foodconnect-high-resolution-logo](https://github.com/user-attachments/assets/b1ffc80c-8319-4463-aa19-18308e9c7c10)

"Connecting food donors with those in need through an online platform" 

## 🌍 Overview
FoodConnect is a web platform that bridges the gap between food donors and recipients. It provides a marketplace for food donations, a real-time chat system, and various filtering options to ensure food accessibility for those in need.

## 💪 Group Members
- **Puneet North**
- **Amraj Koonar**
- **Jake Bareng**
- **Priyansh Sarvaiya**

## 🚀 Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**

### Backend
- **Express.js**
- **JWT(Auth)**
- **PostgreSQL**
- **Socket.io**
  
### Cloud
- **AWS RDS**
- **AWS S3**

## 🎯 Features

- **Marketplace** for various food donations
- **AI-powered tool** that predicts food expiry dates based on image uploads
- **Real-time chat system** using WebSockets (Socket.io)
- **Advanced filtering** system (allergies, dietary preferences, location, expiry date, quantity, availability, etc.)
- **User & Seller profiles**
- **Map integration** for easy location-based searches
- **Login/Sign-up system**

## 🏢 Target Users

### Food Donors
- Businesses
- Restaurants
- Grocery Stores, Supermarkets, and Bakeries
- Food Manufacturers
- Local Farmers
- Homeowners & Individual Donors

### Recipients
- Individual Recipients
- Religious Institutions
- Community Centers
- Food Banks
- Homeless Shelters
- Non-Profit Organizations
- Soup Kitchens

## 🔧 Setup & Installation

### Prerequisites
Ensure you have the following installed on your machine:
- 📌 **Node.js** (latest LTS recommended)
- 📌 **PostgreSQL** (for database management)

### Frontend Setup
1. **Navigate to the frontend directory**
   ```sh
   cd frontend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start the frontend development server**
   ```sh
   npm run dev
   ```

### Backend Setup
1. **Navigate to the backend directory**
   ```sh
   cd backend
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   Create a `.env` file in the backend directory and add necessary configuration values:
   ```sh
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   ```
4. **Run database migrations**
   ```sh
   npm run migrate
   ```
5. **Start the backend development server**
   ```sh
   npm run dev
   ```

##  Links
- 📌 **Figma Design**: [View on Figma](https://www.figma.com/design/lslDNDAiHzhVulIRzpf3e9/Untitled?node-id=0-1&t=YOmYcakXcrBR3bdA-1)
- 📌 **Overview**: [View Sketch](https://excalidraw.com/#json=r_GFEVVySkSO_UKvkVFuv,dhcnzzEThm5pd4gVqQXf0w)
