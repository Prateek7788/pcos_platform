import React, { useState } from 'react';
import { Clock, Star, Filter } from 'lucide-react';
import yogaData from '../data/yogaData.json';

const YogaPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const tags = ['All', 'hormonal balance', 'stress relief', 'circulation', 'spine flexibility', 'relaxation', 'digestion'];

  const filteredPoses = yogaData.filter(pose => {
    const levelMatch = selectedLevel === 'All' || pose.level === selectedLevel;
    const tagMatch = selectedTag === 'All' || pose.tags.includes(selectedTag);
    return levelMatch && tagMatch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Yoga for PCOS Wellness
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover yoga poses specifically chosen to support PCOS management through hormonal balance, 
            stress reduction, and improved circulation.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Poses</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'All' ? 'All Benefits' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Yoga Poses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoses.map((pose) => (
            <div key={pose.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden">
                <img
                  src={pose.image}
                  alt={pose.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(pose.level)}`}>
                    {pose.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1 text-sm text-gray-700">
                    <Clock className="h-4 w-4" />
                    <span>{pose.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pose.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{pose.instructions}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    Benefits
                  </h4>
                  <ul className="space-y-1">
                    {pose.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {pose.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPoses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No poses found matching your filters. Try adjusting your selection.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
          <p className="text-yellow-700">
            Always consult with your healthcare provider before starting any new exercise routine, especially if you have PCOS or other health conditions. 
            Listen to your body and modify poses as needed. If you experience any pain or discomfort, stop immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YogaPage;