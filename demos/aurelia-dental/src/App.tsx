import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { AppointmentModal } from './components/common/AppointmentModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { PatientInfoPage } from './pages/PatientInfoPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { AppointmentPage } from './pages/AppointmentPage';

// Scroll to top component on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('cosmetic-dentistry');

  const handleOpenAppointmentModal = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setIsAppointmentModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-bg text-text-primary selection:bg-accent-light selection:text-primary">
        
        {/* Persistent Announcement Bar */}
        <AnnouncementBar />

        {/* Sticky Header */}
        <Header onOpenAppointmentModal={() => handleOpenAppointmentModal()} />

        {/* Main Content Router */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/about" element={<AboutPage onOpenAppointmentModal={() => handleOpenAppointmentModal()} />} />
            <Route path="/team" element={<TeamPage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/services" element={<ServicesPage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/services/:id" element={<ServiceDetailPage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/patient-info" element={<PatientInfoPage onOpenAppointmentModal={() => handleOpenAppointmentModal()} />} />
            <Route path="/testimonials" element={<TestimonialsPage onOpenAppointmentModal={() => handleOpenAppointmentModal()} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="*" element={<HomePage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
          </Routes>
        </main>

        {/* Global Floating WhatsApp Contact Pill */}
        <WhatsAppButton />

        {/* Global Interactive Appointment Modal */}
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          preselectedServiceId={selectedServiceId}
        />

        {/* Persistent Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

