import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AnimalsPage from './pages/AnimalsPage';
import GalleryPage from './pages/GalleryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import BookTicketsPage from './pages/BookTicketsPage';
import EventsPage from './pages/EventsPage';
import VacanciesPage from './pages/VacanciesPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import ManageAnimals from './pages/admin/ManageAnimals';
import ManageTickets from './pages/admin/ManageTickets';

import ManageEvents from './pages/admin/ManageEvents';
import ManageVacancies from './pages/admin/ManageVacancies';

import ManageUsers from './pages/admin/ManageUsers';
import ManageGallery from './pages/admin/ManageGallery';

import ManageFeedback from './pages/admin/ManageFeedback';

// Placeholder for other pages
const Placeholder = ({ title }) => <div className="p-10 text-center text-2xl font-bold">{title} Page (Coming Soon)</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="animals" element={<AnimalsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="tickets" element={<BookTicketsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="vacancies" element={<VacanciesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="animals" element={<ManageAnimals />} />
        <Route path="tickets" element={<ManageTickets />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="vacancies" element={<ManageVacancies />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="feedback" element={<ManageFeedback />} />
      </Route>
    </Routes>
  );
}

export default App;
