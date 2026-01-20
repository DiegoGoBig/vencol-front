import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundBlobs } from './components/ui/BackgroundBlobs';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SolutionDetail } from './pages/SolutionDetail';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
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
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;