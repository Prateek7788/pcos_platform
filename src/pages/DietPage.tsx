import React, { useState } from 'react';
import { CheckCircle, XCircle, Calendar, Utensils, Lightbulb } from 'lucide-react';
import dietData from '../data/dietData.json';

const DietPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'foods' | 'plan'>('foods');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PCOS Nutrition Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the foods that support hormonal balance and help manage PCOS symptoms through proper nutrition.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2">
            <button
              onClick={() => setActiveTab('foods')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'foods'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Utensils className="h-5 w-5 inline mr-2" />
              Foods Guide
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'plan'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Calendar className="h-5 w-5 inline mr-2" />
              Meal Plan
            </button>
          </div>
        </div>

        {activeTab === 'foods' && (
          <div className="space-y-12">
            {/* Foods to Eat */}
            <section>
              <div className="flex items-center mb-8">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Foods That Help</h2>
              </div>

              <div className="space-y-8">
                {dietData.foodsToEat.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.foods.map((food, foodIndex) => (
                        <div key={foodIndex} className="border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors">
                          <h4 className="font-semibold text-gray-900 mb-2">{food.name}</h4>
                          <p className="text-gray-600 text-sm mb-3">{food.description}</p>
                          <div className="space-y-1">
                            {food.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-start text-sm">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Foods to Avoid */}
            <section>
              <div className="flex items-center mb-8">
                <XCircle className="h-8 w-8 text-red-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Foods to Limit or Avoid</h2>
              </div>

              <div className="space-y-8">
                {dietData.foodsToAvoid.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.foods.map((food, foodIndex) => (
                        <div key={foodIndex} className="border border-red-200 rounded-lg p-4 hover:bg-red-50 transition-colors">
                          <h4 className="font-semibold text-gray-900 mb-2">{food.name}</h4>
                          <p className="text-red-600 text-sm mb-3">
                            <strong>Why avoid:</strong> {food.reason}
                          </p>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-blue-800 text-sm font-medium mb-1">Better alternatives:</p>
                            <div className="text-blue-700 text-sm">
                              {food.alternatives.join(', ')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'plan' && (
          <div>
            <div className="flex items-center mb-8">
              <Calendar className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Sample Meal Plan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dietData.mealPlan.map((day, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center bg-purple-100 rounded-lg py-2">
                    {day.day}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-1">Breakfast</h4>
                      <p className="text-gray-600">{day.breakfast}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-1">Lunch</h4>
                      <p className="text-gray-600">{day.lunch}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-1">Dinner</h4>
                      <p className="text-gray-600">{day.dinner}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide mb-1">Snack</h4>
                      <p className="text-gray-600">{day.snack}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
          <div className="flex items-center mb-6">
            <Lightbulb className="h-8 w-8 text-yellow-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Nutrition Tips for PCOS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Eat Regular Meals</h3>
              <p className="text-gray-600 text-sm">Maintain steady blood sugar by eating every 3-4 hours and not skipping meals.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Focus on Fiber</h3>
              <p className="text-gray-600 text-sm">Include fiber-rich foods to help control blood sugar and support digestive health.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Stay Hydrated</h3>
              <p className="text-gray-600 text-sm">Drink plenty of water throughout the day to support overall health and hormone function.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Mind Portion Sizes</h3>
              <p className="text-gray-600 text-sm">Use smaller plates and listen to hunger cues to maintain a healthy weight.</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-yellow-700">
            This nutrition guide is for educational purposes only and should not replace professional medical advice. 
            Always consult with a registered dietitian or healthcare provider before making significant dietary changes, 
            especially if you have PCOS or other health conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DietPage;