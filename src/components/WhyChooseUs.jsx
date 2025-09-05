import { useState } from 'react';
import { Home, Award, Users, TrendingUp, Shield, Clock, MapPin, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: Home,
      title: "Extensive Property Network",
      description: "Access to over 10,000+ premium properties across prime locations with exclusive listings you won't find elsewhere.",
    
      color: "bg-gradient-to-r from-gray-900 to-blue-900"
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized as the #1 real estate agency for 3 consecutive years with industry-leading customer satisfaction.",
     
      color: "bg-gradient-to-r from-gray-900 to-blue-900"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our certified real estate professionals have 15+ years average experience and deep local market knowledge.",
    
      color: "bg-gradient-to-r from-gray-900 to-blue-900"
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Advanced analytics and market intelligence to help you make informed decisions and maximize your investment.",
   
      color: "bg-gradient-to-r from-gray-900 to-blue-900"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "End-to-end transaction security with legal compliance and comprehensive insurance coverage.",
  
      color: "bg-gradient-to-r from-gray-900 to-blue-900"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support and emergency assistance whenever you need us most.",
     
      color: "bg-gradient-to-r from-gray-900 to-blue-900"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Buyer",
      content: "They made buying my first home stress-free and guided me through every step.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Property Investor",
      content: "Exceptional market knowledge helped me find the perfect investment property.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Home Seller",
      content: "Sold my house above asking price in just 2 weeks. Outstanding service!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Your Trusted Real Estate Partner
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">PropertyPro</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With over a decade of excellence in real estate, we deliver unmatched service, 
            expertise, and results that exceed expectations every time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                  hoveredCard === index ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>


                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

     

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the families we've helped find their perfect home
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}