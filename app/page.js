'use client';
import React, { useState, useEffect } from 'react';
import { Camera, Search, Star, User, Car, TrendingUp, Shield, DollarSign, Users, Menu, X, ChevronRight, Heart, Share2, MessageCircle, Calendar, AlertCircle } from 'lucide-react';

const CarVinoApp = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Sample car data
  const carDatabase = [
    {
      id: 1,
      make: 'Tesla',
      model: 'Model 3',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=400',
      rating: 4.6,
      reviews: 1247,
      price: '$42,990',
      categories: {
        reliability: 4.5,
        performance: 4.8,
        comfort: 4.3,
        value: 4.7,
        efficiency: 4.9
      }
    },
    {
      id: 2,
      make: 'Toyota',
      model: 'RAV4',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1621993202323-f438eec934ff?w=400',
      rating: 4.4,
      reviews: 2891,
      price: '$31,225',
      categories: {
        reliability: 4.8,
        performance: 4.0,
        comfort: 4.4,
        value: 4.6,
        efficiency: 4.3
      }
    },
    {
      id: 3,
      make: 'BMW',
      model: 'X5',
      year: 2024,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      rating: 4.3,
      reviews: 876,
      price: '$65,400',
      categories: {
        reliability: 4.0,
        performance: 4.7,
        comfort: 4.8,
        value: 3.9,
        efficiency: 3.8
      }
    }
  ];

  const userReviews = [
    {
      id: 1,
      carId: 1,
      userName: 'Alex Chen',
      rating: 5,
      date: '2024-03-15',
      comment: 'Best electric car I\'ve owned! The autopilot is incredible and the efficiency is unmatched.',
      helpful: 127
    },
    {
      id: 2,
      carId: 1,
      userName: 'Sarah Johnson',
      rating: 4,
      date: '2024-03-10',
      comment: 'Great car overall, but the interior could use more premium materials for the price.',
      helpful: 89
    }
  ];

  const StarRating = ({ rating, size = 16, interactive = false, onRate = () => {} }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const ScanTab = () => (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-full mb-6 shadow-lg">
        <Camera size={64} className="text-white" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Scan a Car</h2>
      <p className="text-gray-600 text-center mb-6">
        Take a photo of any car to instantly see ratings, reviews, and market insights
      </p>
      <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
        Open Camera
      </button>
      <p className="text-sm text-gray-500 mt-4">or enter VIN/License Plate</p>
    </div>
  );

  const SearchTab = () => (
    <div className="p-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by make, model, or year..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        {carDatabase
          .filter(car => 
            searchQuery === '' || 
            `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(car => (
            <div
              key={car.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              <div className="flex gap-4">
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{car.year} {car.make} {car.model}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={car.rating} size={14} />
                    <span className="text-sm text-gray-600">{car.rating} ({car.reviews})</span>
                  </div>
                  <p className="text-blue-600 font-semibold mt-2">{car.price}</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
        ))}
      </div>
    </div>
  );

  const CarDetailView = ({ car }) => (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setSelectedCar(null)}>
            <X size={24} />
          </button>
          <h1 className="font-semibold">{car.year} {car.make} {car.model}</h1>
          <div className="flex gap-2">
            <Heart size={24} className="text-gray-400" />
            <Share2 size={24} className="text-gray-400" />
          </div>
        </div>
      </div>

      <img
        src={car.image}
        alt={`${car.make} ${car.model}`}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{car.make} {car.model}</h2>
            <p className="text-gray-600">{car.year} • Starting at {car.price}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{car.rating}</div>
            <StarRating rating={car.rating} size={16} />
            <p className="text-sm text-gray-600">{car.reviews} reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            Write Review
          </button>
          <button className="border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50">
            Add to Garage
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Rating Breakdown</h3>
          {Object.entries(car.categories).map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between mb-2">
              <span className="capitalize text-gray-700">{category}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(rating / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{rating}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Recent Reviews</h3>
          {userReviews
            .filter(review => review.carId === car.id)
            .map(review => (
              <div key={review.id} className="border-b pb-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    <span className="font-medium">{review.userName}</span>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <StarRating rating={review.rating} size={14} />
                <p className="text-gray-700 mt-2">{review.comment}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="text-sm text-gray-500 hover:text-blue-600">
                    Helpful ({review.helpful})
                  </button>
                  <button className="text-sm text-gray-500 hover:text-blue-600">
                    Reply
                  </button>
                </div>
              </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="mx-auto mb-2 text-blue-600" size={24} />
            <p className="text-sm font-medium">Market Trends</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Shield className="mx-auto mb-2 text-green-600" size={24} />
            <p className="text-sm font-medium">Safety Ratings</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <DollarSign className="mx-auto mb-2 text-purple-600" size={24} />
            <p className="text-sm font-medium">Price Analysis</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Car Enthusiast</h2>
          <p className="text-gray-600">Member since 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">3</p>
          <p className="text-sm text-gray-600">Cars Owned</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-600">Reviews</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">89</p>
          <p className="text-sm text-gray-600">Helpful Votes</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="text-blue-600" size={24} />
              <span className="font-medium">My Garage</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="text-red-500" size={24} />
              <span className="font-medium">Wishlist</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="text-green-600" size={24} />
              <span className="font-medium">My Reviews</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="text-purple-600" size={24} />
              <span className="font-medium">Test Drive History</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-orange-500" size={24} />
              <span className="font-medium">Maintenance Alerts</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Car size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Twelve Car Garage</h1>
        </div>
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {activeTab === 'scan' && <ScanTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t">
        <div className="grid grid-cols-3">
          <button
            className={`py-3 flex flex-col items-center gap-1 ${
              activeTab === 'scan' ? 'text-blue-600' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('scan')}
          >
            <Camera size={24} />
            <span className="text-xs">Scan</span>
          </button>
          <button
            className={`py-3 flex flex-col items-center gap-1 ${
              activeTab === 'search' ? 'text-blue-600' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('search')}
          >
            <Search size={24} />
            <span className="text-xs">Search</span>
          </button>
          <button
            className={`py-3 flex flex-col items-center gap-1 ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={24} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Car Detail Modal */}
      {selectedCar && <CarDetailView car={selectedCar} />}

      {/* Side Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="py-3 border-b">
                <p className="font-medium">Market Insights</p>
              </div>
              <div className="py-3 border-b">
                <p className="font-medium">Compare Cars</p>
              </div>
              <div className="py-3 border-b">
                <p className="font-medium">Car News</p>
              </div>
              <div className="py-3 border-b">
                <p className="font-medium">Community</p>
              </div>
              <div className="py-3 border-b">
                <p className="font-medium">Settings</p>
              </div>
              <div className="py-3">
                <p className="font-medium">Help & Support</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarVinoApp;