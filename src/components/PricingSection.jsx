import React, { useState } from 'react';
import { Check, Star, Crown, Building2 } from 'lucide-react';

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: 'Standard',
      description: 'Manage up to 10 listings with essential features for small teams and businesses.',
      monthlyPrice: 99,
      yearlyPrice: 89,
      icon: Building2,
      popular: false,
      features: [
        '10 Listings Per Login',
        'Up to 100 Users',
        'Enquiry on Listing',
      
        'Basic Transaction Tracking',
        'Dreams Estate Branding'
      ]
    },
    {
      name: 'Professional',
      description: 'Manage up to 50 listings with essential features for small teams and businesses.',
      monthlyPrice: 199,
      yearlyPrice: 179,
      icon: Star,
      popular: true,
      features: [
        '50 Listings Per Login',
        '500+ Active Users',
        'Enquiry On Every Listing',
        'Priority 24 Hrs Support',
        
        'Partial Custom Branding'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Unlimited listings, full API access, 24/7 support, and featured organizations.',
      monthlyPrice: 399,
      yearlyPrice: 359,
      icon: Crown,
      popular: false,
      features: [
        'Unlimited Listings Per Login',
        '1000+ Active Users',
        'Enquiry Enabled On Listings',
        'Dedicated 24 Hrs Support',
     
        'White-Label Branding'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="w-full lg:w-[80%] xl:w-[75%] 2xl:w-[70%]  mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Pricing & Subscriptions
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Choose your package, choose your package wisely.
          </p>
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 bg-white p-2 rounded-full shadow-lg inline-flex">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-slate-800' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 shadow-lg"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isYearly ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-slate-800' : 'text-slate-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full ml-2 animate-pulse">
                Save 10%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  plan.popular
                    ? 'bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white shadow-2xl ring-4 ring-blue-200 transform scale-105'
                    : 'bg-white text-slate-800 shadow-xl hover:shadow-2xl'
                }`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                    plan.popular 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600'
                  }`}>
                    <Icon size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                  <p className={`text-sm leading-relaxed ${
                    plan.popular ? 'text-blue-100' : 'text-slate-600'
                  }`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold">₹{price}</span>
                    <span className={`text-lg ${plan.popular ? 'text-blue-100' : 'text-slate-500'}`}>
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && (
                    <p className={`text-sm mt-2 ${plan.popular ? 'text-blue-100' : 'text-green-600'}`}>
                      ₹{plan.monthlyPrice - price} saved yearly
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className={`font-semibold text-lg mb-4 ${
                    plan.popular ? 'text-white' : 'text-slate-800'
                  }`}>
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1 rounded-full ${
                          plan.popular 
                            ? 'bg-white/20' 
                            : 'bg-green-100'
                        }`}>
                          <Check size={14} className={
                            plan.popular ? 'text-white' : 'text-green-600'
                          } />
                        </div>
                        <span className={`text-sm leading-relaxed ${
                          plan.popular ? 'text-blue-50' : 'text-slate-600'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-indigo-600 hover:bg-gray-50 hover:shadow-xl transform hover:scale-105'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl transform hover:scale-105'
                }`}>
                  Get a Quote
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6">
            Need a custom solution? We're here to help.
          </p>
          <button className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-slate-700 hover:to-slate-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Contact Sales Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;