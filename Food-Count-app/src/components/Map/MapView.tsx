// import { useState, useCallback, memo } from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// // Define the FoodListing interface matching the one in RecipientDashboard
// interface FoodListing {
//   id: string;
//   title: string;
//   location: string;
//   distance: string;
//   availableFor: string;
//   tags: string[];
//   provider: string;
//   image: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
// }

// interface MapViewProps {
//   listings: FoodListing[];
//   onSelectListing?: (listing: FoodListing) => void;
// }

// // Default center (New York City)
// const defaultCenter = {
//   lat: 40.7128,
//   lng: -74.0060
// };

// // Using the libraries to avoid re-rendering
// const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

// // Map container styles
// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const MapView: React.FC<MapViewProps> = ({ listings, onSelectListing }) => {
//   const [selectedListing, setSelectedListing] = useState<FoodListing | null>(null);
//   const [map, setMap] = useState<google.maps.Map | null>(null);

//   // Load the Google Maps JavaScript API
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '', // Using Vite's environment variable format
//     libraries
//   });

//   // Callback for when the map loads
//   const onLoad = useCallback((map: google.maps.Map) => {
//     const bounds = new window.google.maps.LatLngBounds();
    
//     // Add each listing to bounds
//     listings.forEach(listing => {
//       bounds.extend(new window.google.maps.LatLng(
//         listing.coordinates.lat,
//         listing.coordinates.lng
//       ));
//     });
    
//     // Fit bounds to include all markers
//     map.fitBounds(bounds);
    
//     setMap(map);
//   }, [listings]);

//   // Callback for when the map unmounts
//   const onUnmount = useCallback(() => {
//     setMap(null);
//   }, []);

//   // Handler for marker click
//   const handleMarkerClick = (listing: FoodListing) => {
//     setSelectedListing(listing);
//     if (onSelectListing) {
//       onSelectListing(listing);
//     }
//   };

//   // If the API isn't loaded yet, or there was an error, show appropriate message
//   if (loadError) return <div className="p-4 text-red-500">Error loading maps</div>;
//   if (!isLoaded) return <div className="p-4">Loading maps...</div>;

//   return (
//     <div className="w-full">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={defaultCenter}
//         zoom={12}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//         options={{
//           fullscreenControl: false,
//           streetViewControl: false
//         }}
//       >
//         {/* Render markers for each listing */}
//         {listings.map(listing => (
//           <Marker
//             key={listing.id}
//             position={{
//               lat: listing.coordinates.lat,
//               lng: listing.coordinates.lng
//             }}
//             onClick={() => handleMarkerClick(listing)}
//             icon={{
//               url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
//               scaledSize: new window.google.maps.Size(40, 40)
//             }}
//           />
//         ))}

//         {/* Show InfoWindow when a marker is clicked */}
//         {selectedListing && (
//           <InfoWindow
//             position={{
//               lat: selectedListing.coordinates.lat,
//               lng: selectedListing.coordinates.lng
//             }}
//             onCloseClick={() => setSelectedListing(null)}
//           >
//             <div className="p-2 max-w-xs">
//               <h3 className="text-sm font-semibold">{selectedListing.title}</h3>
//               <p className="text-xs mt-1">{selectedListing.provider}</p>
//               <p className="text-xs mt-1">{selectedListing.location}</p>
//               <div className="flex mt-2">
//                 <button
//                   onClick={() => {
//                     if (onSelectListing) onSelectListing(selectedListing);
//                     setSelectedListing(null);
//                   }}
//                   className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// // Using memo to prevent unnecessary re-renders
// export default memo(MapView); 