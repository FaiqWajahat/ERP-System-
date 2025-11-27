'use client';
import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Search,
  Download,
  User,
} from "lucide-react";
import DashboardPageHeader from "@/Components/DashboardPageHeader";

export default function EmployeeTrackingPage() {
  const [iqamaNumber] = useState("1234567890");
  const [employee, setEmployee] = useState(null);
  const [trackingData, setTrackingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [hasSearched, setHasSearched] = useState(false);
  
  const todayISO = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(thirtyDaysAgo);
  const [toDate, setToDate] = useState(todayISO);

  useEffect(() => {
    if (iqamaNumber) fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const dummyEmployee = {
        id: 1,
        name: "Ali Khan",
        iqama: iqamaNumber,
        department: "Engineering",
        position: "Senior Developer",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
        joinDate: "2023-01-15",
      };
      setEmployee(dummyEmployee);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates");
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      alert("From date cannot be after To date");
      return;
    }
    setHasSearched(true);
    fetchTrackingData();
  };

  const fetchTrackingData = async () => {
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      
      const dummyData = [];
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const statuses = ["Present", "Absent", "Leave"];
      const projects = [
        { id: 1, name: "Website Redesign" },
        { id: 2, name: "Mobile App Development" },
        { id: 3, name: "Marketing Campaign Q4" },
      ];
      
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split("T")[0];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const randomProject = projects[Math.floor(Math.random() * projects.length)];
        
        dummyData.push({
          date: dateStr,
          status: randomStatus,
          projectId: randomProject.id,
          projectName: randomStatus === "Present" ? randomProject.name : null,
        });
      }
      
      setTrackingData(dummyData.reverse());
    } catch (error) {
      console.error("Error fetching tracking data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = trackingData.filter((record) => {
    const matchesStatus = filterStatus === "All" || record.status === filterStatus;
    const matchesSearch = 
      searchQuery === "" ||
      record.date.includes(searchQuery) ||
      (record.projectName && record.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: trackingData.length,
    present: trackingData.filter((r) => r.status === "Present").length,
    absent: trackingData.filter((r) => r.status === "Absent").length,
    leave: trackingData.filter((r) => r.status === "Leave").length,
  };

  const attendancePercentage = stats.total > 0 
    ? Math.round((stats.present / stats.total) * 100) 
    : 0;

  const handleExport = () => {
    const csvContent = [
      ["Date", "Status", "Project"],
      ...filteredData.map(r => [r.date, r.status, r.projectName || "N/A"])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${employee?.name}_attendance_${fromDate}_to_${toDate}.csv`;
    a.click();
  };

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Employees", href: "/Dashboard/Employees" },
    { name: "Tracking", href: "/Dashboard/Employees/Tracking" },
  ];

  return (
    <> 
    <DashboardPageHeader    breadData={breadData} heading="Employee Tracking" />
    <div className="w-full min-h-screen ">
      <div className="max-w-7xl mx-auto space-y-6">
        

        {employee && (
          <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[var(--primary-color)] text-white-content flex items-center justify-center text-xl font-bold ring-4 ring-primary/20">
                {employee.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-base-content">{employee.name}</h2>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-base-content/70">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{employee.position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Iqama:</span>
                    <span>{employee.iqama}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Department:</span>
                    <span>{employee.department}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-xs text-base-content/80">From Date</label>
                <input 
                  type="date" 
                  value={fromDate} 
                  onChange={(e) => setFromDate(e.target.value)} 
                  max={toDate} 
                  className="px-3 py-2 border border-base-300 rounded-lg text-xs bg-base-100"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-xs text-base-content/80">To Date</label>
                <input 
                  type="date" 
                  value={toDate} 
                  onChange={(e) => setToDate(e.target.value)} 
                  min={fromDate} 
                  max={todayISO} 
                  className="px-3 py-2 border border-base-300 rounded-lg text-xs bg-base-100"
                />
              </div>
              <button 
                onClick={handleSearch} 
                className="flex items-center gap-2 px-6 py-2 bg-[var(--primary-color)] text-white rounded-sm cursor-pointer hover:bg-[var(--primary-color)]-focus transition font-medium text-xs"
              >
                <Search className="w-4 h-4" />
                Search Records
              </button>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <label className="text-xs font-medium text-base-content/80">Status Filter</label>
              <select 
                className="px-3 py-2 border border-base-300 rounded-lg text-xs disabled:bg-base-200 bg-base-100"
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)} 
                disabled={!hasSearched}
              >
                <option value="All">All</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
              </select>
            </div>
          </div>
        </div>

        {hasSearched && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
                <div className="text-xs text-base-content/60 uppercase font-medium mb-2">Total Days</div>
                <div className="text-3xl font-bold text-base-content">{stats.total}</div>
                <div className="text-xs mt-1 text-base-content/60">In selected range</div>
              </div>
              <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
                <div className="text-xs text-base-content/60 uppercase font-medium mb-2">Present</div>
                <div className="text-3xl font-bold text-success">{stats.present}</div>
                <div className="text-xs mt-1 text-success">Days present</div>
              </div>
              <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
                <div className="text-xs text-base-content/60 uppercase font-medium mb-2">Absent</div>
                <div className="text-3xl font-bold text-error">{stats.absent}</div>
                <div className="text-xs mt-1 text-error">Days absent</div>
              </div>
              <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
                <div className="text-xs text-base-content/60 uppercase font-medium mb-2">Leave</div>
                <div className="text-3xl font-bold text-warning">{stats.leave}</div>
                <div className="text-xs mt-1 text-warning">Days on leave</div>
              </div>
              <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
                <div className="text-xs text-base-content/60 uppercase font-medium mb-2">Attendance</div>
                <div className="text-3xl font-bold text-[var(--primary-color)]">{attendancePercentage}%</div>
                <div className="text-xs mt-1 text-white">Attendance rate</div>
              </div>
            </div>

            <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-base-content/40" />
                  <input 
                    type="text" 
                    placeholder="Search by date or project..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg text-xs bg-base-100"
                  />
                </div>
                <button 
                  onClick={handleExport} 
                  className="flex items-center gap-2 px-6 py-2 bg-[var(--primary-color)] text-white rounded-sm hover:bg-[var(--primary-color)]-focus transition font-medium text-xs disabled:opacity-50"
                  disabled={filteredData.length === 0}
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </>
        )}

        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
          {!hasSearched ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-3 text-center">
                <Search className="w-16 h-16 text-base-content/40" />
                <div className="font-semibold text-lg text-base-content">Ready to search</div>
                <div className="text-base-content/60 text-xs max-w-md">
                  Select a date range and click "Search Records" button to view attendance data
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-base-200 border-b border-base-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/80 uppercase">#</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/80 uppercase">Employee</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/80 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/80 uppercase">Day</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/80 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/80 uppercase">Project</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-base-content/80 uppercase">Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Calendar className="w-12 h-12 text-base-content/40" />
                          <div className="font-medium text-xs text-base-content">No records found</div>
                          <div className="text-base-content/60 text-xs">Try adjusting your date range or filters</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((record, i) => {
                      const date = new Date(record.date);
                      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                      const statusColors = {
                        Present: { bg: "bg-success/10", text: "text-success", icon: <CheckCircle className="w-5 h-5 text-success" /> },
                        Absent: { bg: "bg-error/10", text: "text-error", icon: <XCircle className="w-5 h-5 text-error" /> },
                        Leave: { bg: "bg-warning/10", text: "text-warning", icon: <Clock className="w-5 h-5 text-warning" /> }
                      };
                      const statusStyle = statusColors[record.status];
                      
                      return (
                        <tr key={i} className="hover:bg-base-200">
                          <td className="px-6 py-4 text-xs text-base-content">{i + 1}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white-content flex items-center justify-center text-xs font-bold">
                                {employee?.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div className="font-medium text-xs text-base-content">{employee?.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-base-content">{date.toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-xs text-base-content">{dayName}</td>
                          <td className="px-6 py-4">
                            <span className={`${statusStyle.bg} ${statusStyle.text} px-3 py-1 rounded-full text-xs font-medium`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-base-content">
                            {record.projectName || <span className="text-base-content/40 italic">No project</span>}
                          </td>
                          <td className="px-6 py-4 text-center">{statusStyle.icon}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {hasSearched && filteredData.length > 0 && (
          <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-4">
            <div className="text-xs text-base-content/60 text-center">
              Showing <strong className="text-white">{filteredData.length}</strong> of <strong>{trackingData.length}</strong> records
              {fromDate && toDate && (
                <span className="ml-2">
                  from <strong>{new Date(fromDate).toLocaleDateString()}</strong> to <strong>{new Date(toDate).toLocaleDateString()}</strong>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}