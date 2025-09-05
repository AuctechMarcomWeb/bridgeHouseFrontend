import React, { useState, useEffect } from 'react';
import { Home, Users, Award, TrendingUp, Heart, Shield, Star, ArrowRight } from 'lucide-react';
import WhyChooseUs from '../components/WhyChooseUs';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '500+', label: 'Properties Sold', icon: Home },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '98%', label: 'Client Satisfaction', icon: Star },
    { number: '50+', label: 'Expert Agents', icon: Users }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Client-Centered Approach',
      description: 'We put our clients first, understanding their unique needs and delivering personalized solutions that exceed expectations.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Built on integrity and honest communication, we ensure every transaction is transparent and in your best interest.'
    },
    {
      icon: TrendingUp,
      title: 'Market Excellence',
      description: 'Our deep market knowledge and innovative strategies help you make informed decisions in today\'s dynamic real estate landscape.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:py-18 py-12">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-xl md:text-3xl font-bold text-white mb-6 bg-clip-text bg-gradient-to-r from-white to-blue-200">
              About Us
            </h1>
            <p className="md:text-xl text-base text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connecting Dreams to Reality Through Premier Real Estate Excellence
            </p>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-blue-800 bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
              <span className="text-base font-medium">Building Futures Since 2008</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-400 opacity-15 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-ping"></div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl mb-4 shadow-lg">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Our Story of 
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Excellence</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 text-justify leading-relaxed">
                Founded in 2008, Bridge House began with a simple mission: to bridge the gap between property dreams and reality. What started as a small team of passionate real estate professionals has grown into one of the region's most trusted property consultancies.
              </p>
              <p className="text-lg text-gray-700 text-justify mb-8 leading-relaxed">
                We've weathered market changes, embraced technological innovations, and consistently delivered exceptional results. Our success is measured not just in properties sold, but in families housed, investments secured, and communities strengthened.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <span className="text-blue-600 font-semibold">Building Trust, One Property at a Time</span>
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="text-4xl font-bold mb-4">15+</div>
                  <div className="text-xl mb-6">Years of Excellence in Real Estate</div>
                  <div className="bg-gradient-to-r from-gray-700 to-blue-800  bg-opacity-20 rounded-xl p-4">
                    <div className="text-sm opacity-90 mb-2">Our Journey</div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>2008</span><span>Founded</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2015</span><span>100th Property</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2020</span><span>Digital Innovation</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2025</span><span>Market Leader</span>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-blue-100 text-lg text-justify leading-relaxed">
                  To provide exceptional real estate services that transform the property buying and selling experience through innovation, integrity, and unwavering commitment to client success.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full translate-y-20 -translate-x-20"></div>
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Our Vision</h3>
                <p className="text-purple-100 text-lg text-justify leading-relaxed">
                  To be the leading real estate agency that sets industry standards for customer service, market knowledge, and innovative solutions in property transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Our Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
              What Drives Us
            </h2>
            <p className="md:text-lg text-base text-gray-600 max-w-3xl mx-auto">
              Our core values shape every interaction and guide every decision we make for our clients
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className={`group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 ${
                    activeCard === index ? 'scale-105' : 'scale-100'
                  }`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-justify leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      

      

      {/* CTA Section */}
      <div className="py-8 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our experienced team guide you through every step of your real estate journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              View Our Properties
            </button>
          </div>
        </div>
      </div>

 
    </div>
  );
};

export default AboutUs;