'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DashboardPageHeader from "@/Components/DashboardPageHeader";
import DashboardSearch from "@/Components/DashboardSearch";
import CustomDropdown from "@/Components/CustomDropdown";

const EmployeeSalaryList = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownMenu = ['Active', 'Inactive', 'All'];

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Salary", href: "/Dashboard/Salary" },
    
  ];

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      
      try {
        // API CALL: Fetch all employees
        // const response = await axios.get('/api/employees');
        // setEmployees(response.data);
        
        // Temporary mock data - remove when API is connected
        const mockEmployees = [
          {
            _id: "1",
            name: "Ahmed Raza",
            role: "Electrician",
            phone: "0312-4567890",
            iqama: "1245789654",
            joinedAt: "2024-01-12",
            active: true,
            profilePic: "https://randomuser.me/api/portraits/men/27.jpg",
          },
          {
            _id: "2",
            name: "Bilal Khan",
            role: "Plumber",
            phone: "0321-9876543",
            iqama: "9856321478",
            joinedAt: "2023-03-03",
            active: false,
            profilePic: "https://randomuser.me/api/portraits/men/52.jpg",
          },
          {
            _id: "3",
            name: "Saad Ali",
            role: "Labour",
            phone: "0307-4445566",
            iqama: "7412589630",
            joinedAt: "2022-07-10",
            active: true,
            profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
          },
          {
            _id: "4",
            name: "Hassan Ahmed",
            role: "Carpenter",
            phone: "0346-5566778",
            iqama: "3692581470",
            joinedAt: "2023-11-08",
            active: true,
            profilePic: "https://randomuser.me/api/portraits/men/40.jpg",
          },
        ];
        
        setEmployees(mockEmployees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.iqama.includes(searchTerm) ||
                         emp.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'All' || 
                         (selectedStatus === 'Active' && emp.active) ||
                         (selectedStatus === 'Inactive' && !emp.active);
    return matchesSearch && matchesStatus;
  });

  

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Navigate to expense details
  const handleViewExpenses = (iqama) => {
    router.push(`/Dashboard/Salary/${iqama}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg" style={{ color: 'var(--primary-color)' }}></span>
          <p className="text-base-content/70 mt-4">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardPageHeader breadData={breadData} heading="Employee Expenses" />

  

      {/* Table Section */}
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6 mt-6">
        <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-between mb-6 md:px-2">
          <div className="w-full md:w-auto justify-center md:justify-start flex">
            <DashboardSearch 
              placeholder="Search Employee" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="font-medium text-sm mr-2">Status:</label>
              <CustomDropdown 
                value={selectedStatus} 
                setValue={setSelectedStatus} 
                dropdownMenu={dropdownMenu} 
              />
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead className="text-xs font-semibold text-base-content/70 bg-base-200 uppercase tracking-wide">
              <tr>
                <th>S.No</th>
                <th>Employee</th>
                <th>Phone</th>
                <th>Iqama</th>
                <th>Status</th>
                <th>Joined At</th>
               
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp, idx) => (
                  <tr
                  onClick={() => handleViewExpenses(emp.iqama)}
                    key={emp._id}
                    className="hover:bg-base-200/40 transition cursor-pointer"
                  >
                    <td>{idx + 1}</td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-md overflow-hidden ring ring-base-300 ring-offset-base-100 ring-offset-2">
                            <Image
                              src={emp.profilePic}
                              alt={emp.name}
                              width={50}
                              height={50}
                              className="object-cover"
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium">{emp.name}</h3>
                          <p className="text-xs text-base-content/70">{emp.role}</p>
                        </div>
                      </div>
                    </td>

                    <td>{emp.phone}</td>
                    <td className="font-mono text-sm">{emp.iqama}</td>

                    <td>
                      {emp.active ? (
                        <span className="text-success">
                          Active
                        </span>
                      ) : (
                        <span className="text-error ">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td>{formatDate(emp.joinedAt)}</td>

                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8">
                    <p className="text-base-content/60">
                      {searchTerm ? 'No employees found matching your search' : 'No employees available'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
      </div>
    </>
  );
};

export default EmployeeSalaryList;