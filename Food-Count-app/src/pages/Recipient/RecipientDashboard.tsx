import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MapView from "../../components/Map/MapView";
import { MapPin, Clock, Navigation, ArrowRight, Tag } from "lucide-react";
import axios from "axios";
import RecipientLayout from "../../components/layout/RecipientLayout";

interface FoodListing {
  id: string | number;
  title: string;
  location: string;
  distance: string;
  availableFor: string;
  tags: string[];
  provider: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const RecipientDashboard = () => {
  const [originalListings, setOriginalListings] = useState<FoodListing[]>([]);
  const [displayedListings, setDisplayedListings] = useState<FoodListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<"distance" | "availability">(
    "distance"
  );
  const [maxDistance, setMaxDistance] = useState<number>(5); // Default to 5 miles
  const [allTags, setAllTags] = useState<string[]>([]);

  // Fetch data once
  // useEffect(() => {
  //   const mockListings: FoodListing[] = [
  //     {
  //       id: "1",
  //       title: "Fresh Bread and Pastries",
  //       provider: "City Bakery",
  //       location: "123 Main St",
  //       distance: "0.8 miles",
  //       availableFor: "2 hours",
  //       tags: ["Croissants", "Baguettes", "Danish Pastries"],
  //       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKuhbn6kSNFxzMJQ3QG61EG1qVw4tPnJ84Pg&s",
  //       coordinates: {
  //         lat: 40.7128,
  //         lng: -74.006,
  //       },
  //     },
  //     {
  //       id: "2",
  //       title: "Surplus Produce",
  //       provider: "Green Market",
  //       location: "456 Oak Ave",
  //       distance: "1.2 miles",
  //       availableFor: "3 hours",
  //       tags: ["Tomatoes", "Lettuce", "Carrots", "Apples"],
  //       image: "https://assets.farmjournal.com/dims4/default/c9abbcb/2147483647/strip/true/crop/840x561+0+20/resize/800x534!/quality/90/?url=https%3A%2F%2Ffj-corp-pub.s3.us-east-2.amazonaws.com%2Fs3fs-public%2F2022-12%2FReducing-food-waste2.png",
  //       coordinates: {
  //         lat: 40.7312,
  //         lng: -73.989,
  //       },
  //     },
  //     {
  //       id: "3",
  //       title: "Prepared Meals",
  //       provider: "Community Kitchen",
  //       location: "789 Pine St",
  //       distance: "2.4 miles",
  //       availableFor: "4 hours",
  //       tags: ["Soups", "Sandwiches", "Salads"],
  //       image: "https://thecinnamonmom.com/wp-content/uploads/2018/12/34E4A223-BD11-4879-9B59-4D7CE3801464-600x450.jpeg",
  //       coordinates: {
  //         lat: 40.7415,
  //         lng: -73.9987,
  //       },
  //     },
  //   ];

  //   setTimeout(() => {
  //     setOriginalListings(mockListings);
  //     setDisplayedListings(mockListings);

  //     // Extract all unique tags
  //     const tags = new Set<string>();
  //     mockListings.forEach((listing) => {
  //       listing.tags.forEach((tag) => tags.add(tag));
  //     });
  //     setAllTags(Array.from(tags));

  //     setIsLoading(false);
  //   }, 1000); // Simulate network delay
  // }, []);

  useEffect(() => {
    const fetchFoodListings = async () => {
      try {
        setIsLoading(true);

        // Mock data
        const mockListings: FoodListing[] = [
          {
            id: 4,
            title: "Fresh Bread and Pastries",
            provider: "City Bakery",
            location: "123 Main St",
            distance: "0.8 miles",
            availableFor: "2 hours",
            tags: ["Croissants", "Baguettes", "Danish Pastries"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKuhbn6kSNFxzMJQ3QG61EG1qVw4tPnJ84Pg&s",
            coordinates: {
              lat: 40.7128,
              lng: -74.006,
            },
          },
          {
            id: 5,
            title: "Surplus Produce",
            provider: "Green Market",
            location: "456 Oak Ave",
            distance: "1.2 miles",
            availableFor: "3 hours",
            tags: ["Tomatoes", "Lettuce", "Carrots", "Apples"],
            image: "https://assets.farmjournal.com/dims4/default/c9abbcb/2147483647/strip/true/crop/840x561+0+20/resize/800x534!/quality/90/?url=https%3A%2F%2Ffj-corp-pub.s3.us-east-2.amazonaws.com%2Fs3fs-public%2F2022-12%2FReducing-food-waste2.png",
            coordinates: {
              lat: 40.7312,
              lng: -73.989,
            },
          },
          {
            id: 6,
            title: "Prepared Meals",
            provider: "Community Kitchen",
            location: "789 Pine St",
            distance: "2.4 miles",
            availableFor: "4 hours",
            tags: ["Soups", "Sandwiches", "Salads"],
            image: "https://thecinnamonmom.com/wp-content/uploads/2018/12/34E4A223-BD11-4879-9B59-4D7CE3801464-600x450.jpeg",
            coordinates: {
              lat: 40.7415,
              lng: -73.9987,
            },
          },
        ];

        // Fetch data from the API
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/food-posts`);
        // console.log("API Response:", response.data);
        const apiListings = response.data.data.map((post: any) => ({
          id: post.id,
          title: post.title,
          provider: post.provider || "Public",
          location: post.location || "Unknown Location",
          // distance: post.distance || "N/A", // You may need to calculate this if not provided
          availableFor: post.availableFor || "N/A",
          tags: post.tags || [],
          image: post.imageUrl || "https://placehold.co/400x200?text=Food+Image", // Map imageUrl to image
          coordinates: {
            lat: post.latitude || 0,
            lng: post.longitude || 0,
          },
        }));

        // console.log("API Listings:", apiListings);

        // Combine mock data and API data
        const combinedListings = [...mockListings, ...apiListings];

        // Update state with the combined data
        setOriginalListings(combinedListings);
        setDisplayedListings(combinedListings);
        console.log("Combined Listings:", combinedListings);

        // Extract all unique tags
        const tags = new Set<string>();
        combinedListings.forEach((listing) => {
          listing.tags.forEach((tag: string) => tags.add(tag));
        });
        setAllTags(Array.from(tags));
      } catch (error) {
        console.error("Error fetching food listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodListings();
  }, []);


  // // Apply filters and sorting whenever filter criteria change
  // useEffect(() => {
  //   if (originalListings.length === 0) return;

  //   // Start with original data
  //   let filteredData = [...originalListings];

  //   // Apply distance filter
  //   filteredData = filteredData.filter(
  //     (listing) => parseFloat(listing.distance.split(" ")[0]) <= maxDistance
  //   );

  //   // Apply tag filters if any are selected
  //   if (filterTags.length > 0) {
  //     filteredData = filteredData.filter((listing) =>
  //       filterTags.some((tag) => listing.tags.includes(tag))
  //     );
  //   }

  //   // Apply sorting
  //   filteredData.sort((a, b) => {
  //     if (sortOption === "distance") {
  //       const distanceA = parseFloat(a.distance.split(" ")[0]);
  //       const distanceB = parseFloat(b.distance.split(" ")[0]);
  //       return distanceA - distanceB;
  //     } else {
  //       const timeA = parseInt(a.availableFor.split(" ")[0]);
  //       const timeB = parseInt(b.availableFor.split(" ")[0]);
  //       return timeA - timeB;
  //     }
  //   });

  //   setDisplayedListings(filteredData);
  // }, [originalListings, maxDistance, filterTags, sortOption]);

  useEffect(() => {
    if (originalListings.length === 0) return;

    // Start with original data
    let filteredData = [...originalListings];

    // Apply distance filter
    // filteredData = filteredData.filter((listing) => {
    //   const distanceValue = parseFloat(listing.distance.split(" ")[0]);
    //   return !isNaN(distanceValue) && distanceValue <= maxDistance;
    // });

    // Apply tag filters if any are selected
    if (filterTags.length > 0) {
      filteredData = filteredData.filter((listing) =>
        filterTags.every((tag) => listing.tags.includes(tag))
      );
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      if (sortOption === "availability") {
        const timeA = parseInt(a.availableFor.split(" ")[0]);
        const timeB = parseInt(b.availableFor.split(" ")[0]);
        return timeA - timeB;
      }
      return 0;
    });

    // Update displayed listings
    setDisplayedListings(filteredData);
  }, [originalListings, maxDistance, filterTags, sortOption]);

  const handleSort = (option: "distance" | "availability") => {
    setSortOption(option);
  };

  const handleFilter = (tag: string) => {
    setFilterTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleDistanceChange = (distance: number) => {
    setMaxDistance(distance);
  };

  const handleResetFilters = () => {
    setFilterTags([]);
    setMaxDistance(5);
    setSortOption("distance");
  };

  return (
    <RecipientLayout>
    <div className="min-h-screen bg-green-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
            <div className="relative">
              <button
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() =>
                  document
                    .getElementById("filter-dropdown")
                    ?.classList.toggle("hidden")
                }
              >
                <svg
                  className="h-4 w-4 mr-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter {filterTags.length > 0 && `(${filterTags.length})`}
              </button>
              <div
                id="filter-dropdown"
                className="hidden absolute left-0 mt-2 p-3 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-64"
              >
                <div className="mb-2 font-medium text-gray-700">
                  Filter by Tags
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {allTags.map((tag) => (
                    <div key={tag} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`tag-${tag}`}
                        checked={filterTags.includes(tag)}
                        onChange={() => handleFilter(tag)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`tag-${tag}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setFilterTags([])}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSort("availability")}
              className={`flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${sortOption === "availability"
                ? "bg-green-50 text-green-700 border-green-300"
                : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              <svg
                className="h-4 w-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Availability
            </button>



            {(filterTags.length > 0 ||
              maxDistance !== 5 ||
              sortOption !== "distance") && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg
                    className="h-4 w-4 mr-1 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Reset
                </button>
              )}

            <div className="bg-white border border-gray-300 rounded-md shadow-sm">
              <div className="flex divide-x divide-gray-300">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 text-sm font-medium ${viewMode === "list"
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-2 text-sm font-medium ${viewMode === "map"
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            Showing {displayedListings.length} results
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <svg
              className="animate-spin h-10 w-10 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : displayedListings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No results found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your filters or increasing the distance.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "map" ? (
          <div className="rounded-lg overflow-hidden shadow-md mb-6 h-120">
            <MapView
            // locations={displayedListings.map((listing) => ({
            //   id: listing.id,
            //   title: listing.title,
            //   lat: listing.coordinates.lat,
            //   lng: listing.coordinates.lng,
            // }))}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {displayedListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
              >
                <div className="relative h-56 w-full">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://placehold.co/400x200?text=Food+Image";
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 text-xs font-medium tracking-wider rounded-full bg-green-50 text-green-600 border border-green-100">
                      Available
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                      {listing.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      {listing.provider}
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>
                        {listing.location}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span>Available for {listing.availableFor}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleFilter(tag)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterTags.includes(tag)
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${listing.coordinates.lat},${listing.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Directions
                    </a>
                    <button className="flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Reserve
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </RecipientLayout>
  );
};

export default RecipientDashboard;
