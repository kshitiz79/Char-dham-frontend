import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CharDham from './pages/CharDham'
import DooDham from './pages/DooDham'
import DooDhamOneDay from './pages/DooDhamOneDay'
import Layout from './components/Layout'
import ConfiirmBookingForm from './pages/ConfirmBookingForm/ConfiirmBookingForm'
import Dashboard from './AdminDashboard/pages/Dashboard'
import AddBooking from './AdminDashboard/pages/AddBooking'
import DashboardLayout from './AdminDashboard/DashBoardLayout'
import BookedHelecopter from './AdminDashboard/pages/BookedHelecopter'
import AllSlots from './AdminDashboard/pages/AllSlots'
import BookingSucess from './pages/BookingSucess'
import Login from './pages/Auth/Login'
import ProtectedRoute from './pages/Auth/ProtectedRoute'
import BoadingPass from './pages/BoadingPass'
import GetTicket from './pages/GetTicket'


function App() {
  return (
    <Router basename="/chardham">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/char-dham" element={<CharDham />} /> */}
          {/* <Route path="/do-dham" element={<DooDham />} /> */}
          <Route path="/do-dham-oneday" element={<DooDhamOneDay />} />
          <Route path="/confirm-booking" element={<ConfiirmBookingForm />} />
          <Route path="/booking-success" element={<BookingSucess />} />
          <Route path="/boding-pass" element={<BoadingPass />} />
          <Route path="/get-ticket" element={<GetTicket />} />
          <Route path="/admin-login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="add-booking" element={<AddBooking />} />
            <Route path="all-slots" element={<AllSlots />} />
            <Route path="custumer-booking" element={<BookedHelecopter />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}


export default App
