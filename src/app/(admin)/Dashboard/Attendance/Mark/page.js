'use client';

import React, { useEffect, useState, useRef } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  ArrowLeft,
  Search,
  ChevronDown,
  Edit2,
} from "lucide-react";
import DashboardPageHeader from "@/Components/DashboardPageHeader";

// API Configuration - Replace with your actual endpoints
const API_ENDPOINTS = {
  GET_ATTENDANCE: "/api/attendance",
  SAVE_ATTENDANCE: "/api/attendance",
  GET_EMPLOYEES: "/api/employees",
  GET_PROJECTS: "/api/projects",
};

const ProjectDropdown = ({ value, onChange, projects, idLabel = "project" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current || !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="btn btn-sm bg-transparent border border-[var(--primary-color)] rounded-sm w-48 flex items-center justify-between text-xs h-10"
      >
        <span className="truncate text-left flex-1">
          {value ? value.name : "Select Project"}
        </span>
        <ChevronDown className="w-4 h-4 opacity-70 ml-1 flex-shrink-0" />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-48 bg-base-100 shadow-lg rounded-sm max-h-48 overflow-y-auto border border-base-300">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(project);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-base-200 ${
                  value?.id === project.id ? "bg-base-200" : ""
                }`}
              >
                {project.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const StatusDropdown = ({ value, onChange, idLabel = "status" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const options = ["Present", "Absent", "Leave"];

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current || !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="btn btn-sm bg-transparent border border-[var(--primary-color)] rounded-sm w-32 flex items-center justify-between text-xs h-10"
      >
        <span className="truncate">{value || "Select"}</span>
        <ChevronDown className="w-4 h-4 opacity-70 ml-2" />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-32 bg-base-100 shadow-lg rounded-sm border border-base-300">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-base-200 ${
                  opt === value ? "bg-base-200" : ""
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function MarkAttendancePage() {
  const todayISO = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [projectAssignments, setProjectAssignments] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAttendanceForDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchEmployees = async () => {
    try {
      // REPLACE WITH: const response = await fetch(API_ENDPOINTS.GET_EMPLOYEES);
      // const data = await response.json();
      // setEmployees(data);
      
      const dummyEmployees = [
        { id: 1, name: "Ali Khan", iqama: "1234567890", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali" },
        { id: 2, name: "Ahmed Raza", iqama: "0987654321", image: null },
        { id: 3, name: "Sara Ahmed", iqama: "1122334455", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
        { id: 4, name: "Fatima Ali", iqama: "2233445566", image: null },
        { id: 5, name: "Hassan Sheikh", iqama: "3344556677", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan" },
        { id: 6, name: "Zainab Malik", iqama: "4455667788", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab" },
      ];
      setEmployees(dummyEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      // REPLACE WITH: const response = await fetch(API_ENDPOINTS.GET_PROJECTS);
      // const data = await response.json();
      // setProjects(data);
      
      const dummyProjects = [
        { id: 1, name: "Website Redesign" },
        { id: 2, name: "Mobile App Development" },
        { id: 3, name: "Marketing Campaign Q4" },
        { id: 4, name: "Cloud Migration" },
        { id: 5, name: "ERP Implementation" },
        { id: 6, name: "Security Audit" },
      ];
      setProjects(dummyProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchAttendanceForDate = async (date) => {
    setIsLoading(true);
    try {
      // REPLACE WITH: 
      // const response = await fetch(`${API_ENDPOINTS.GET_ATTENDANCE}?date=${date}`);
      // const data = await response.json();
      // Expected format: { marked: boolean, attendance: [{employeeId, status, projectId, projectName}] }
      
      await new Promise(r => setTimeout(r, 500));
      
      const isToday = date === todayISO;
      const alreadyMarked = isToday && Math.random() > 0.5;
      
      if (alreadyMarked) {
        const attendanceData = {};
        const projectData = {};
        employees.slice(0, 3).forEach((emp) => {
          attendanceData[emp.id] = "Present";
          projectData[emp.id] = projects[0];
        });
        setAttendance(attendanceData);
        setProjectAssignments(projectData);
        setAttendanceMarked(true);
        setIsEditMode(false);
      } else {
        setAttendance({});
        setProjectAssignments({});
        setAttendanceMarked(false);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setAttendance({});
      setProjectAssignments({});
      setAttendanceMarked(false);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const q = searchQuery.trim().toLowerCase();
    return q === "" || emp.name.toLowerCase().includes(q) || emp.iqama.toLowerCase().includes(q);
  });

  const stats = {
    total: filteredEmployees.length,
    present: filteredEmployees.filter((e) => attendance[e.id] === "Present").length,
    absent: filteredEmployees.filter((e) => attendance[e.id] === "Absent").length,
    leave: filteredEmployees.filter((e) => attendance[e.id] === "Leave").length,
  };

  const completionPercentage = filteredEmployees.length
    ? Math.round((Object.keys(attendance).filter((id) => filteredEmployees.some((fe) => fe.id === Number(id))).length / filteredEmployees.length) * 100)
    : 0;

  const updateStatus = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const updateProject = (id, project) => {
    setProjectAssignments((prev) => ({ ...prev, [id]: project }));
  };

  const markAllAs = (status) => {
    const newAtt = { ...attendance };
    filteredEmployees.forEach((emp) => {
      newAtt[emp.id] = status;
    });
    setAttendance(newAtt);
  };

  const clearAllMarks = () => {
    setAttendance({});
    setProjectAssignments({});
  };

  const handleSave = async () => {
    if (filteredEmployees.length === 0) return;

    const payload = {
      date: selectedDate,
      attendance: filteredEmployees.map((emp) => ({
        employeeId: emp.id,
        employeeName: emp.name,
        iqama: emp.iqama,
        status: attendance[emp.id] || "Absent",
        projectId: projectAssignments[emp.id]?.id || null,
        projectName: projectAssignments[emp.id]?.name || null,
      })),
    };

    setIsSaving(true);
    try {
      // REPLACE WITH:
      // const response = await fetch(API_ENDPOINTS.SAVE_ATTENDANCE, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // if (!response.ok) throw new Error('Failed to save');
      
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Attendance payload:", payload);
      
      setAttendanceMarked(true);
      setIsEditMode(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to save attendance");
    } finally {
      setIsSaving(false);
    }
  };

  const enableEditMode = () => {
    setIsEditMode(true);
    setAttendanceMarked(false);
  };

  const searchTimeout = useRef(null);
  const onSearchChange = (val) => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => setSearchQuery(val), 200);
  };

  const canEdit = !attendanceMarked || isEditMode;

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
 
    { name: "Mark Attendance", href: "/Dashboard/Attendance/Mark" },
  ];

  return (

    <>

    <DashboardPageHeader breadData={breadData} heading="Mark Attendance" />
    <div className="w-full   ">
      
<div className="max-w-7xl m-auto  space-y-6 ">
      <div className="card bg-base-100  border border-base-200">
        <div className="card-body p-4">
          <div className="flex items-center gap-3">
            <label className="font-medium text-xs text-base-content/70">Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input input-bordered input-sm text-xs h-10" />
            <div className="text-xs text-base-content/60 ml-2">{selectedDate ? new Date(selectedDate).toLocaleDateString() : ""}</div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="alert alert-info shadow-sm text-xs">
          <span className="loading loading-spinner loading-sm"></span>
          <span>Loading attendance data...</span>
        </div>
      )}

      {!isLoading && attendanceMarked && !isEditMode && (
        <div className="alert alert-warning shadow-sm text-xs">
          <CheckCircle className="w-5 h-5" />
          <span>Attendance for <strong>{selectedDate}</strong> is already marked.</span>
          <button type="button" onClick={enableEditMode} className="btn btn-sm gap-2 bg-[var(--primary-color)] text-white hover:opacity-90">
            <Edit2 className="w-4 h-4" />
            Edit Attendance
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="alert alert-success shadow-sm text-xs">
          <CheckCircle className="w-5 h-5" />
          <span>Attendance saved successfully for {selectedDate}!</span>
        </div>
      )}

      {!isLoading && canEdit && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { title: "Total", value: stats.total, desc: "Employees", color: "" },
              { title: "Present", value: stats.present, desc: "Marked present", color: "text-success" },
              { title: "Absent", value: stats.absent, desc: "Marked absent", color: "text-error" },
              { title: "Leave", value: stats.leave, desc: "On leave", color: "text-warning" },
              { title: "Progress", value: `${completionPercentage}%`, desc: "Completion rate", color: "text-[var(--primary-color)]" },
            ].map((stat, idx) => (
              <div key={idx} className="stats shadow bg-base-100 border border-base-200">
                <div className="stat py-3 px-4">
                  <div className="stat-title text-xs text-base-content/60">{stat.title}</div>
                  <div className={`stat-value text-2xl ${stat.color}`}>{stat.value}</div>
                  <div className={`stat-desc text-xs ${stat.color}`}>{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-4 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                <input type="text" placeholder="Search by name or Iqama..." onChange={(e) => onSearchChange(e.target.value)} className="input input-bordered input-sm w-full pl-10 text-xs h-10" />
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline gap-2 text-xs h-10" role="button">
                  Quick Actions <ChevronDown className="w-4 h-4" />
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 text-xs border border-base-200">
                  <li><button type="button" onClick={() => markAllAs("Present")}>Mark All Present</button></li>
                  <li><button type="button" onClick={() => markAllAs("Absent")}>Mark All Absent</button></li>
                  <li><button type="button" onClick={() => markAllAs("Leave")}>Mark All Leave</button></li>
                  <li className="border-t mt-1 pt-1"><button type="button" onClick={clearAllMarks}>Clear All</button></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm border border-base-200 px-4 py-6">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead className="bg-base-200">
                    <tr className="text-xs uppercase">
                      <th className="py-3">#</th>
                      <th className="py-3">Employee</th>
                      <th className="py-3">Iqama Number</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Project</th>
                      <th className="py-3 text-center">Indicator</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Search className="w-12 h-12 text-base-content/40" />
                            <div className="font-medium text-xs">No employees found</div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((emp, i) => (
                        <tr key={emp.id} className="hover:bg-base-200">
                          <td className="py-3 text-xs">{i + 1}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="w-10 h-10 rounded-md  ring-1 ring-base-300">
                                  {emp.image ? (
                                    <img src={emp.image} alt={emp.name} />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[var(--primary-color)] text-white text-xs font-semibold">
                                      {emp.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="font-medium text-xs">{emp.name}</div>
                            </div>
                          </td>
                          <td className="font-mono text-xs py-3">{emp.iqama}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <StatusDropdown idLabel={`status-${emp.id}`} value={attendance[emp.id]} onChange={(status) => updateStatus(emp.id, status)} />
                              {attendance[emp.id] && (
                                <button type="button" className="btn btn-ghost btn-xs" onClick={() => setAttendance((prev) => { const copy = { ...prev }; delete copy[emp.id]; return copy; })}>×</button>
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <ProjectDropdown idLabel={`project-${emp.id}`} value={projectAssignments[emp.id]} projects={projects} onChange={(project) => updateProject(emp.id, project)} />
                              {projectAssignments[emp.id] && (
                                <button type="button" className="btn btn-ghost btn-xs" onClick={() => setProjectAssignments((prev) => { const copy = { ...prev }; delete copy[emp.id]; return copy; })}>×</button>
                              )}
                            </div>
                          </td>
                          <td className="text-center py-3">
                            {attendance[emp.id] === "Present" && <CheckCircle className="w-5 h-5 text-success inline-block" />}
                            {attendance[emp.id] === "Absent" && <XCircle className="w-5 h-5 text-error inline-block" />}
                            {attendance[emp.id] === "Leave" && <Clock className="w-5 h-5 text-warning inline-block" />}
                            {!attendance[emp.id] && <div className="w-2 h-2 bg-base-content/30 rounded-full inline-block"></div>}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-base-content/60">
                {Object.keys(attendance).length > 0 ? (
                  <span><strong className="text-[var(--primary-color)]">{Object.keys(attendance).length}</strong> of <strong>{filteredEmployees.length}</strong> marked</span>
                ) : (
                  <span>No attendance marked yet</span>
                )}
              </div>
              <div className="flex gap-3">
                <button type="button" className="btn btn-ghost btn-sm text-xs h-10" onClick={clearAllMarks} disabled={Object.keys(attendance).length === 0}>Clear All</button>
                <button type="button" className="btn btn-sm text-white bg-[var(--primary-color)] hover:opacity-90 text-xs h-10" onClick={handleSave} disabled={Object.keys(attendance).length === 0 || isSaving}>
                  {isSaving ? <span className="loading loading-spinner loading-sm"></span> : <><Save className="w-4 h-4 mr-2" />{isEditMode ? "Update Attendance" : "Save Attendance"}</>}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </div>
    </>  );
}