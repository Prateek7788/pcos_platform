import React, { useState } from 'react';
import { CheckCircle, XCircle, Filter, BookOpen } from 'lucide-react';
import factsData from '../data/factsData.json';

const FactsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'fact' | 'myth'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(factsData.map(item => item.category)))];

  const filteredData = factsData.filter(item => {
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    return typeMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PCOS Facts & Myths
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Separate fact from fiction with evidence-based information about PCOS. 
            Understanding the truth helps you make better health decisions.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Content</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:text-purple-600 border border-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedType('fact')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === 'fact'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:text-green-600 border border-gray-300'
                  }`}
                >
                  Facts
                </button>
                <button
                  onClick={() => setSelectedType('myth')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === 'myth'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:text-red-600 border border-gray-300'
                  }`}
                >
                  Myths
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                item.type === 'fact' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {item.type === 'fact' ? (
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    ) : (
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="h-6 w-6 text-red-600" />
                      </div>
                    )}
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.type === 'fact' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>

                {item.type === 'fact' ? (
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-red-50 rounded-lg p-3">
                      <h4 className="font-semibold text-red-800 mb-1">Myth:</h4>
                      <p className="text-red-700 text-sm">{item.myth}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-semibold text-green-800 mb-1">Reality:</h4>
                      <p className="text-green-700 text-sm">{item.reality}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No content found matching your filters. Try adjusting your selection.</p>
          </div>
        )}

        {/* Educational Note */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Stay Informed</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Understanding PCOS facts helps you make informed decisions about your health. 
            Myths and misinformation can lead to delayed treatment and unnecessary worry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Consult Experts</h3>
              <p className="text-gray-600 text-sm">Always verify health information with qualified healthcare providers.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm">Medical knowledge evolves, so keep learning about PCOS research.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Share Knowledge</h3>
              <p className="text-gray-600 text-sm">Help others by sharing accurate PCOS information in your community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactsPage;