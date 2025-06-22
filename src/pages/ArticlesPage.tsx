import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Search, Newspaper } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
}

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock articles data (in a real app, this would come from an API)
  useEffect(() => {
    const mockArticles: Article[] = [
      {
        id: '1',
        title: 'New Research Links PCOS to Gut Microbiome Imbalance',
        description: 'Recent studies reveal how gut bacteria composition affects hormonal balance in women with PCOS, opening new treatment avenues.',
        url: 'https://example.com/article1',
        source: 'Medical Research Journal',
        publishedAt: '2025-01-10',
        category: 'Research'
      },
      {
        id: '2',
        title: 'Exercise Therapy Shows Promise for PCOS Symptom Management',
        description: 'A comprehensive study demonstrates how specific exercise regimens can improve insulin sensitivity and reduce PCOS symptoms.',
        url: 'https://example.com/article2',
        source: 'Health & Wellness Today',
        publishedAt: '2025-01-08',
        category: 'Treatment'
      },
      {
        id: '3',
        title: 'Mediterranean Diet May Reduce PCOS Inflammation',
        description: 'New findings suggest that following a Mediterranean diet pattern can significantly reduce inflammatory markers in PCOS patients.',
        url: 'https://example.com/article3',
        source: 'Nutrition Science Review',
        publishedAt: '2025-01-05',
        category: 'Nutrition'
      },
      {
        id: '4',
        title: 'Mental Health Support Crucial for PCOS Patients',
        description: 'Study highlights the importance of psychological support in comprehensive PCOS treatment plans.',
        url: 'https://example.com/article4',
        source: 'Psychology & Health',
        publishedAt: '2025-01-03',
        category: 'Mental Health'
      },
      {
        id: '5',
        title: 'Sleep Quality Linked to PCOS Severity',
        description: 'Research shows correlation between poor sleep patterns and worsening PCOS symptoms, emphasizing importance of sleep hygiene.',
        url: 'https://example.com/article5',
        source: 'Sleep Medicine Journal',
        publishedAt: '2025-01-01',
        category: 'Lifestyle'
      },
      {
        id: '6',
        title: 'Vitamin D Supplementation Benefits in PCOS',
        description: 'Clinical trials demonstrate how vitamin D supplementation can improve metabolic parameters in PCOS patients.',
        url: 'https://example.com/article6',
        source: 'Endocrine Research',
        publishedAt: '2024-12-28',
        category: 'Supplements'
      }
    ];

    // Simulate API loading delay
    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Research': 'bg-blue-100 text-blue-800',
      'Treatment': 'bg-green-100 text-green-800',
      'Nutrition': 'bg-orange-100 text-orange-800',
      'Mental Health': 'bg-purple-100 text-purple-800',
      'Lifestyle': 'bg-pink-100 text-pink-800',
      'Supplements': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest PCOS Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest research, treatment options, and lifestyle insights for PCOS management.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading latest articles...</p>
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(article.publishedAt)}
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-medium">
                        {article.source}
                      </span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('This is a demo article. In a real application, this would open the actual article.');
                        }}
                      >
                        Read More
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 opacity-90">
            Get the latest PCOS research and health tips delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          <p className="text-sm mt-4 opacity-75">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
          <p className="text-yellow-700">
            The articles provided are for educational purposes only and should not replace professional medical advice. 
            Always consult with qualified healthcare providers for personalized medical guidance regarding PCOS treatment and management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;