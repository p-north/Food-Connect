
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Building2, ListPlus, Users, ChevronRight, Mail, BellIcon } from 'lucide-react';

const Landing = () => {
return (
  <div className="overflow-hidden">
    {/* Hero Section with Background Pattern */}
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🌱 "Making a difference, one meal at a time"
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Connecting </span>
              <span className="text-green-600 relative">
                Food Donors
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-green-200 opacity-50 rounded"></div>
              </span>
              <br />
              <span className="text-gray-900">with Those in Need</span>
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Join our mission to reduce food waste and help your local community by 
              connecting surplus food with people who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="bg-green-600 text-white px-8 py-4 rounded-lg flex items-center justify-center hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Donate Food
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/signup" className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-green-100">
                Find Food
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80"
              alt="Food Donation"
              className="rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">150+ Active Donors Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-20 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              Our simple process connects food donors with recipients in just a few steps.
            </p>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Building2 className="w-8 h-8" />,
              title: "Register as a Donor",
              description: "Restaurants, supermarkets, and individuals can sign up to donate surplus food."
            },
            {
              icon: <ListPlus className="w-8 h-8" />,
              title: "List Available Food",
              description: "Post details about available food items, quantity, and pickup times."
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Connect & Share",
              description: "Local recipients can find and collect food donations in their area."
            }
          ].map((item, index) => (
            <div key={index} className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
              <div className="bg-green-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Recent Donations Section */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-black">Recent Donations</h2>
          <Link to="/donations" className="text-green-600 hover:text-green-700 flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              {
                title: "Fresh Produce Bundle",
                description: "Organic vegetables, fruits, and herbs from local farm",
                time: "Pickup until 8 PM today",
                distance: "2.5 miles away",
                image: "https://media.istockphoto.com/id/1251268379/photo/wooden-box-full-of-homegrown-produce.jpg?b=1&s=612x612&w=0&k=20&c=uMbjK4KCnw9GlJ5gb_Oc_2V7lHkr8Q3i8crVPsG0kRE=",
                status: "Available",
              },
              {
                title: "Bakery Assortment",
                description: "Freshly baked bread, pastries, and desserts",
                time: "Pickup until 6 PM today",
                distance: "1.2 miles away",
                image: "https://media.istockphoto.com/id/1457584676/photo/close-up-woman-choosing-pastry-from-a-bakery-store-selecting-holding-a-tray-and-service-tong.jpg?s=612x612&w=0&k=20&c=6tYvSdbTWuPuHPLzgeyc9NJVLv5jJBX6eki8Dyn24nA=",
                status: "Limited",
              },
              {
                title: "Restaurant Meals",
                description: "Prepared meals ready for immediate consumption",
                time: "Pickup until 9 PM today",
                distance: "3.7 miles away",
                image: "https://media.istockphoto.com/id/1474203885/photo/woman-eating-at-the-table-young-asia-woman-eating-spaghetti-at-restaurant.jpg?s=612x612&w=0&k=20&c=m1NifaPmptN94-vL5ZaE0UdKhLk_pQ80cmHCaC5wSXo=",
                status: "Available",
              },
            ].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image}
                  alt="Food"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg text-black">{item.title}</h3>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">{item.status}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {item.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {item.distance}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Impact Section with Gradient */}
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="max-w-5xl mx-auto px-6 relative" id="impact">
        <h2 className="text-3xl font-bold text-center mb-16">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { number: "1,000+", label: "Active Donors" },
            { number: "5,000+", label: "Meals Shared" },
            { number: "100+", label: "Communities Served" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
              <p className="text-5xl font-bold mb-3">{stat.number}</p>
              <p className="text-lg opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote: "FoodConnect has made it so easy for our restaurant to donate surplus food. We're helping the community while reducing waste.",
              author: "Sarah Johnson",
              role: "Restaurant Owner",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100"
            },
            {
              quote: "As a food bank coordinator, this platform has revolutionized how we connect with donors and distribute food to those in need.",
              author: "Michael Chen",
              role: "Food Bank Coordinator",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-600 italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter Section */}
    <section className="py-16 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <div className='flex justify-center items-center px-4 container space-x-3'>
              <BellIcon className='text-black mb-3'/>
              <h2 className="text-2xl font-bold mb-4 text-black">Stay Updated</h2>
            </div>
            <p className="text-gray-600">
              Subscribe to our newsletter for updates on local food donations and community impact.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow relative text-gray-600">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center whitespace-nowrap">
              Subscribe
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);
}
export default Landing;