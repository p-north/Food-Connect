# Map Component

This component provides Google Maps integration for displaying food listings on a map.

## Setup

1. You'll need a Google Maps API key with the following APIs enabled:
   - Maps JavaScript API
   - Places API (optional, for location search)
   - Geocoding API (optional, for address lookup)

2. Add your API key to the `.env.local` file:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

3. For production, make sure to restrict your API key to your domain to prevent unauthorized usage.

## Usage

```tsx
import MapView from '../components/Map/MapView';

// Your component
const MyComponent = () => {
  const listings = [...]; // Your food listings data
  
  return (
    <MapView 
      listings={listings} 
      onSelectListing={(listing) => {
        console.log('Selected listing:', listing);
        // Handle selection
      }} 
    />
  );
}; ```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `listings` | `FoodListing[]` | Array of food listings to display on the map |
| `onSelectListing` | `(listing: FoodListing) => void` | Optional callback when a listing is selected |

## Customization

You can customize the map appearance by modifying the `options` prop passed to the GoogleMap component in MapView.tsx. 