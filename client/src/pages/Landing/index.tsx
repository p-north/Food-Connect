import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Building2, ListPlus, Users, ChevronRight, Mail, BellIcon } from 'lucide-react';

const Landing = () => {
return (
  <div className="overflow-hidden">
    {/* Hero Section with Enhanced Background */}
    <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <div className="inline-block bg-white/80 backdrop-blur-sm text-green-600 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg border border-white/20 animate-fade-in">
              🌱 "Making a difference, one meal at a time"
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-gray-900">Connecting </span>
              <span className="text-green-600 relative">
                Food Donors
                <div className="absolute -bottom-3 left-0 w-full h-3 bg-gradient-to-r from-green-400 to-emerald-500 opacity-30 rounded-full"></div>
              </span>
              <br />
              <span className="text-gray-900">with Those in Need</span>
            </h1>
            
            <p className="text-gray-600 text-xl mb-10 leading-relaxed max-w-2xl">
              Join our mission to reduce food waste and help your local community by 
              connecting surplus food with people who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/signup" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-xl flex items-center justify-center shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 font-semibold">
                Donate Food
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
              <Link to="/signup" className="bg-white/90 backdrop-blur-lg text-green-600 px-10 py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20 font-semibold">
                Find Food
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80"
                alt="Food Donation"
                className="rounded-3xl shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-500 border-4 border-white/50"
              />
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">150+ Active Donors Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works Section */}
    <section className="py-24 bg-white relative" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">How It Works</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-6 leading-relaxed">
            Our simple process connects food donors with recipients in just a few steps.
          </p>
          <div className="w-24 h-2 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Building2 className="w-10 h-10" />,
              title: "Register as a Donor",
              description: "Restaurants, supermarkets, and individuals can sign up to donate surplus food."
            },
            {
              icon: <ListPlus className="w-10 h-10" />,
              title: "List Available Food",
              description: "Post details about available food items, quantity, and pickup times."
            },
            {
              icon: <Users className="w-10 h-10" />,
              title: "Connect & Share",
              description: "Local recipients can find and collect food donations in their area."
            }
          ].map((item, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-green-200 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl w-20 h-20 flex items-center justify-center mb-8 text-green-600 group-hover:from-green-500 group-hover:to-emerald-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Recent Donations Section */}
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Recent Donations</h2>
          <Link to="/donations" className="text-green-600 hover:text-green-700 flex items-center font-semibold transition-colors duration-300">
            View all <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            <div key={item} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-white/20 transform hover:-translate-y-2">
              <div className="h-56 overflow-hidden">
                <img 
                  src={item.image}
                  alt="Food"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                  <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm px-4 py-2 rounded-full font-semibold">{item.status}</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-green-500" />
                    {item.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-green-500" />
                    {item.distance}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Impact Section with Enhanced Gradient */}
    <section className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10" id="impact">
        <h2 className="text-4xl font-bold text-center mb-20">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { number: "1,000+", label: "Active Donors" },
            { number: "5,000+", label: "Meals Shared" },
            { number: "100+", label: "Communities Served" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-lg rounded-3xl p-10 hover:transform hover:-translate-y-4 transition-all duration-500 border border-white/20 group">
              <p className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">{stat.number}</p>
              <p className="text-xl opacity-90 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-24 bg-white" id="testimonials">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
            <div key={index} className="bg-gradient-to-br from-gray-50 to-green-50/30 p-10 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-white/20 transform hover:-translate-y-2">
              <div className="flex items-start gap-6">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.author}</div>
                  <div className="text-green-600 font-semibold">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter Section */}
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white/90 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-10">
            <div className='flex justify-center items-center px-4 container space-x-4 mb-6'>
              <BellIcon className='text-green-600 w-8 h-8'/>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Stay Updated</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Subscribe to our newsletter for updates on local food donations and community impact.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-14 pr-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white/80 backdrop-blur-sm transition-all duration-300"
              />
            </div>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-xl transition-all duration-300 flex items-center justify-center whitespace-nowrap font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
              Subscribe
              <ArrowRight className="ml-3 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Enhanced CSS animations */}
    <style>{`
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-fade-in {
        animation: fade-in 0.8s ease-out;
      }
      
      .shadow-3xl {
        box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
      }
      
      .backdrop-blur-lg {
        backdrop-filter: blur(16px);
      }
      
      .bg-clip-text {
        -webkit-background-clip: text;
        background-clip: text;
      }
    `}</style>
  </div>
);
}
export default Landing;