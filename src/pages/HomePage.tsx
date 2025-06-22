import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap, Calendar, Brain, Flower, Apple } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Flower className="h-8 w-8" />,
      title: 'Yoga & Wellness',
      description: 'Discover yoga poses specifically beneficial for PCOS management',
      link: '/yoga',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Apple className="h-8 w-8" />,
      title: 'Diet Guide',
      description: 'Nutrition plans and foods that support hormonal balance',
      link: '/diet',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Period Tracker',
      description: 'Track your cycles and understand your reproductive health',
      link: '/tracker',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'PCOS Prediction',
      description: 'Assessment tool to understand your PCOS risk factors',
      link: '/prediction',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  const facts = [
    "PCOS affects 1 in 10 women of reproductive age worldwide",
    "Early diagnosis and management can prevent long-term complications",
    "Lifestyle changes can significantly improve PCOS symptoms",
    "Regular exercise helps with insulin resistance common in PCOS"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-amber-100 to-amber-200 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Heart className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Welcome to <span className="text-purple-700">OviQue</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-800">
              Your comprehensive PCOS/PCOD awareness, wellness, and management platform. 
              Empowering women through knowledge, tools, and guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/prediction"
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center"
              >
                <Zap className="h-5 w-5 mr-2" />
                Take PCOS Assessment
              </Link>
              <Link
                to="/tracker"
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-colors inline-flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Track Your Cycle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive PCOS Management Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to understand, track, and manage your PCOS journey in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="p-6">
                  <div className={`bg-gradient-to-r ${feature.color} text-white p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className={`h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Did You Know?
            </h2>
            <p className="text-xl text-gray-600">
              Important facts about PCOS that every woman should know
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-gray-800 font-medium leading-relaxed">{fact}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/facts"
              className="bg-gradient-to-r from-purple-600 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-amber-700 transition-colors inline-flex items-center"
            >
              Learn More Facts & Myths
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your PCOS Management Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take control of your health with our comprehensive tools and expert guidance. 
            Remember, you're not alone in this journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/prediction"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started with Assessment
            </Link>
            <Link
              to="/articles"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Read Latest Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;