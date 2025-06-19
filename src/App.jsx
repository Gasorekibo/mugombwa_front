import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import Announcements from './pages/Announcements';
import Emergency from './pages/Emergency';
import NGODetail from './pages/NGODetail';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/ngo/:id" element={<NGODetail />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFoundPage/>}/>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;