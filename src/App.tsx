import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import YogaPage from './pages/YogaPage';
import DietPage from './pages/DietPage';
import FactsPage from './pages/FactsPage';
import ArticlesPage from './pages/ArticlesPage';
import TrackerPage from './pages/TrackerPage';
import PredictionPage from './pages/PredictionPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/yoga" element={<YogaPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route path="/facts" element={<FactsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/prediction" element={<PredictionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;