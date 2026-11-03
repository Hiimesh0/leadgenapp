import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/doctor/ProtectedRoute';
import { DoctorLayout } from './components/doctor/DoctorLayout';

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

// Doctor Dashboard Pages
import { DoctorLoginPage } from './pages/doctor/DoctorLoginPage';
import { DashboardOverviewPage } from './pages/doctor/DashboardOverviewPage';
import { AppointmentsManagementPage } from './pages/doctor/AppointmentsManagementPage';
import { DoctorCalendarPage } from './pages/doctor/DoctorCalendarPage';
import { DoctorEnquiriesPage } from './pages/doctor/DoctorEnquiriesPage';
import { DoctorSettingsPage } from './pages/doctor/DoctorSettingsPage';

// Scroll to top component on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Public Website Wrapper Layout
interface PublicLayoutProps {
  onOpenAppointmentModal: (serviceId?: string) => void;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ onOpenAppointmentModal }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text-primary selection:bg-accent-light selection:text-primary">
      <AnnouncementBar />
      <Header onOpenAppointmentModal={() => onOpenAppointmentModal()} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
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
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Patient-Facing Website Routes */}
          <Route element={<PublicLayout onOpenAppointmentModal={handleOpenAppointmentModal} />}>
            <Route path="/" element={<HomePage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/about" element={<AboutPage onOpenAppointmentModal={() => handleOpenAppointmentModal()} />} />
            <Route path="/team" element={<TeamPage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/services" element={<ServicesPage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/services/:id" element={<ServiceDetailPage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/patient-info" element={<PatientInfoPage onOpenAppointmentModal={() => handleOpenAppointmentModal()} />} />
            <Route path="/testimonials" element={<TestimonialsPage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
          </Route>

          {/* Doctor Portal Authentication */}
          <Route path="/doctor/login" element={<DoctorLoginPage />} />

          {/* Protected Doctor Admin Dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DoctorLayout />}>
              <Route path="/doctor" element={<DashboardOverviewPage />} />
              <Route path="/doctor/dashboard" element={<DashboardOverviewPage />} />
              <Route path="/doctor/appointments" element={<AppointmentsManagementPage />} />
              <Route path="/doctor/calendar" element={<DoctorCalendarPage />} />
              <Route path="/doctor/enquiries" element={<DoctorEnquiriesPage />} />
              <Route path="/doctor/settings" element={<DoctorSettingsPage />} />
            </Route>
          </Route>

          {/* Fallback Catch-all */}
          <Route element={<PublicLayout onOpenAppointmentModal={handleOpenAppointmentModal} />}>
            <Route path="*" element={<HomePage onOpenAppointmentModal={handleOpenAppointmentModal} />} />
          </Route>
        </Routes>

        {/* Global Interactive Appointment Modal */}
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          preselectedServiceId={selectedServiceId}
        />
      </Router>
    </AuthProvider>
  );
};

export default App;
