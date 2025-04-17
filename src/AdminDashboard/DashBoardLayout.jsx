import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaPlane, FaPlaneArrival, FaMoneyBillAlt } from 'react-icons/fa';
import { SiAeroflot, SiBeats, SiSeat } from 'react-icons/si';
import { IoBookOutline } from 'react-icons/io5';

const DashboardLayout = () => {
  return (
    <div className="h-screen flex font-sans bg-gray-100">

      <nav className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6 uppercase">FLYOLA Dashboard</h2>
        <ul className="space-y-4 text-base">

          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard 
            </NavLink>
          </li>
     
          <li>
            <NavLink
              to="/dashboard/add-booking"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              <FaPlus className="mr-3" />
              Add Slots
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/all-slots"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              <SiSeat className="mr-3" />
              All Slots
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/custumer-booking"
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700 hover:bg-blue-50'
                }`
              }
            >
              <SiBeats className="mr-3" />
              Customer Bookings
            </NavLink>
          </li>




          <li>
 



      











           

        







           





         




          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
