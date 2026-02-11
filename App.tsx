import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundBlobs } from './components/ui/BackgroundBlobs';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SolutionDetail } from './pages/SolutionDetail';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Contact } from './pages/Contact';
import { PageDetail } from './pages/PageDetail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-dark font-sans text-gray-100 selection:bg-brand-green selection:text-brand-dark">
        <BackgroundBlobs />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            {/* Main solutions listing page removed as requested */}
            <Route path="/soluciones/:slug" element={<SolutionDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contacto" element={<Contact />} />
            {/* Catch-all: WordPress pages by slug — must be last */}
            <Route path="/:slug" element={<PageDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;