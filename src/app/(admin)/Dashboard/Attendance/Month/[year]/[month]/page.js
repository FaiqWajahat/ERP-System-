"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardPageHeader from "@/Components/DashboardPageHeader";
import { ArrowLeft, Calendar, Edit2, Trash2, X } from "lucide-react";
import DashboardSearch from "@/Components/DashboardSearch";
import CustomDropdown from "@/Components/CustomDropdown";

const statusOptions = ["Present", "Absent", "Leave"];

export default function MonthAttendancePage() {
  const params = useParams();
  const { year, month } = params;

  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Dummy employee attendance data
  const dummyAttendanceData = [
    {
      id: 1,
      employeeName: "Ali Khan",
      iqamaNumber: "1234567890",
      image: "/dummy-user1.jpg",
      date: `${year}-${month}-01`,
      status: "Present",
    },
    {
      id: 2,
      employeeName: "Ahmed Raza",
      iqamaNumber: "0987654321",
      image: "/dummy-user2.jpg",
      date: `${year}-${month}-01`,
      status: "Absent",
    },
    {
      id: 3,
      employeeName: "Sara Ahmed",
      iqamaNumber: "1122334455",
      image: "/dummy-user3.jpg",
      date: `${year}-${month}-01`,
      status: "Leave",
    },
    {
      id: 4,
      employeeName: "Ali Khan",
      iqamaNumber: "1234567890",
      image: "/dummy-user1.jpg",
      date: `${year}-${month}-02`,
      status: "Present",
    },
    {
      id: 5,
      employeeName: "Ahmed Raza",
      iqamaNumber: "0987654321",
      image: "/dummy-user2.jpg",
      date: `${year}-${month}-02`,
      status: "Present",
    },
    {
      id: 6,
      employeeName: "Sara Ahmed",
      iqamaNumber: "1122334455",
      image: "/dummy-user3.jpg",
      date: `${year}-${month}-03`,
      status: "Absent",
    },
  ];

  const dropdownMenu = ["All", "Present", "Absent", "Leave"];

  useEffect(() => {
    setTimeout(() => {
      setAttendance(dummyAttendanceData);
      setFilteredAttendance(dummyAttendanceData);
      setLoading(false);
    }, 500);
  }, [year, month]);

  // Filter attendance by search, status, and date
  useEffect(() => {
    let filtered = attendance.filter((rec) =>
      rec.employeeName.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {
      filtered = filtered.filter((rec) => rec.status === statusFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter((rec) => rec.date === dateFilter);
    }

    setFilteredAttendance(filtered);
  }, [search, attendance, statusFilter, dateFilter]);

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Attendance", href: "/Dashboard/Attendance" },
    {
      name: "Month Attendance",
      href: `/Dashboard/Attendance/Month/${year}/${month}`,
    },
  ];

  // Calculate statistics
  const stats = {
    total: attendance.length,
    present: attendance.filter((r) => r.status === "Present").length,
    absent: attendance.filter((r) => r.status === "Absent").length,
    leave: attendance.filter((r) => r.status === "Leave").length,
  };

  const attendancePercentage =
    stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : 0;

  const monthName = new Date(year, month - 1).toLocaleString("default", {
    month: "long",
  });

  // Handle Edit
  const handleEdit = (record) => {
    setEditingRecord({ ...record });
  };

  const handleSaveEdit = () => {
    const updatedAttendance = attendance.map((rec) =>
      rec.id === editingRecord.id ? editingRecord : rec
    );
    setAttendance(updatedAttendance);
    setEditingRecord(null);
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  // Handle Delete
  const handleDeleteClick = (record) => {
    setDeleteConfirm(record);
  };

  const handleConfirmDelete = () => {
    const updatedAttendance = attendance.filter(
      (rec) => rec.id !== deleteConfirm.id
    );
    setAttendance(updatedAttendance);
    setDeleteConfirm(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  // Clear date filter
  const clearDateFilter = () => {
    setDateFilter("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[var(--primary-color)]"></span>
      </div>
    );
  }

  return (
    <>
      <DashboardPageHeader breadData={breadData} heading="Attendance" />

      <div className="w-full space-y-6">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title text-xs">Total Records</div>
              <div className="stat-value text-2xl">{stats.total}</div>
              <div className="stat-desc">{month}</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title text-xs">Present Days</div>
              <div className="stat-value text-2xl text-success">
                {stats.present}
              </div>
              <div className="stat-desc text-success">Attended</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title text-xs">Absent Days</div>
              <div className="stat-value text-2xl text-error">
                {stats.absent}
              </div>
              <div className="stat-desc text-error">Not attended</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title text-xs">Attendance Rate</div>
              <div className="stat-value text-2xl text-[var(--primary-color)]">
                {attendancePercentage}%
              </div>
              <div className="stat-desc text-[var(--primary-color)]">
                Overall performance
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="font-semibold text-base mb-1">
                  {month} {year} Attendance Records
                </h2>
                <p className="text-base-content/70 text-xs">
                  View and manage employee attendance
                </p>
              </div>
              <Link
                href="/Dashboard/Attendance"
                className="btn btn-ghost rounded-sm btn-sm gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
              <div className="w-full lg:w-auto">
                <DashboardSearch
                  placeholder={"Search Employee"}
                  value={search}
                  onChange={setSearch}
                />
              </div>

              <div className="flex items-center gap-4 mx-auto md:mx-0">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-sm whitespace-nowrap">Day:</label>
                  <CustomDropdown
                    value={dateFilter || "All Days"}
                    setValue={(value) => setDateFilter(value === "All Days" ? "" : value)}
                    dropdownMenu={["All Days", ...Array.from({ length: 31 }, (_, i) => {
                      const day = (i + 1).toString().padStart(2, '0');
                      return `${year}-${month}-${day}`;
                    })]}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="font-medium text-sm whitespace-nowrap">Status:</label>
                  <CustomDropdown
                    value={statusFilter}
                    setValue={setStatusFilter}
                    dropdownMenu={dropdownMenu}
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(dateFilter || statusFilter !== "All") && (
              <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-base-200 rounded-lg">
                <span className="text-sm font-medium">Active Filters:</span>
                {dateFilter && (
                  <div className="badge badge-primary gap-2">
                    Day: {new Date(dateFilter).getDate()}
                    <button onClick={clearDateFilter} className="hover:text-error">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {statusFilter !== "All" && (
                  <div className="badge badge-secondary gap-2">
                    Status: {statusFilter}
                    <button onClick={() => setStatusFilter("All")} className="hover:text-error">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setDateFilter("");
                    setStatusFilter("All");
                  }}
                  className="text-xs text-error hover:underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table table-md">
                <thead className="bg-base-200">
                  <tr>
                    <th className="text-xs font-semibold uppercase">
                      Employee
                    </th>
                    <th className="text-xs font-semibold uppercase">
                      Iqama Number
                    </th>
                    <th className="text-xs font-semibold uppercase">Date</th>
                    <th className="text-xs font-semibold uppercase">Status</th>
                    <th className="text-xs font-semibold uppercase text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16">
                        <div className="flex flex-col items-center gap-3">
                          <div className="bg-base-200 rounded-full p-6">
                            <Calendar className="w-12 h-12 text-base-content/40" />
                          </div>
                          <h3 className="font-semibold text-base">
                            No Records Found
                          </h3>
                          <p className="text-sm text-base-content/70">
                            No attendance records found for the selected filters
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAttendance.map((rec, index) => (
                      <tr key={index} className="hover:bg-base-200">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-10 h-10">
                                <img
                                  src={rec.image}
                                  alt={rec.employeeName}
                                  onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      rec.employeeName
                                    )}&background=random`;
                                  }}
                                />
                              </div>
                            </div>
                            <span className="font-medium text-sm">
                              {rec.employeeName}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="font-mono text-sm whitespace-nowrap">
                            {rec.iqamaNumber}
                          </span>
                        </td>
                        <td>
                          <span className="text-sm whitespace-nowrap">
                            {new Date(rec.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </td>
                        <td>
                          {rec.status === "Present" && (
                            <span className=" text-success text-sm">
                              {rec.status}
                            </span>
                          )}
                          {rec.status === "Absent" && (
                            <span className=" text-error text-sm">
                              {rec.status}
                            </span>
                          )}
                          {rec.status === "Leave" && (
                            <span className=" text-warning text-sm">
                              {rec.status}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(rec)}
                              className="btn btn-ghost rounded-sm py-3 btn-xs text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                              title="Edit"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(rec)}
                              className="btn btn-ghost btn-xs rounded-sm text-error hover:bg-error hover:text-white"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
            
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-sm">Leave Summary</h3>
              <div className="stat-value text-3xl text-warning mt-2">
                {stats.leave}
              </div>
              <p className="text-sm text-base-content/70 mt-2">
                Total leave days taken in {month} {year}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-sm">Performance Status</h3>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Attendance Goal</span>
                  <span className="text-sm font-semibold">
                    {attendancePercentage}% / 90%
                  </span>
                </div>
                <progress
                  className="progress progress-accent w-full"
                  value={attendancePercentage}
                  max="100"
                ></progress>
                <p className="text-xs text-base-content/70 mt-2">
                  {parseFloat(attendancePercentage) >= 90
                    ? "Excellent attendance record!"
                    : `${(90 - parseFloat(attendancePercentage)).toFixed(
                        1
                      )}% more to reach goal`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingRecord && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Attendance Record</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Employee Name</span>
                </label>
                <input
                  type="text"
                  value={editingRecord.employeeName}
                  disabled
                  className="input input-bordered w-full input-sm"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Date</span>
                </label>
                <input
                  type="date"
                  value={editingRecord.date}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, date: e.target.value })
                  }
                  className="input input-bordered w-full input-sm"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Status</span>
                </label>
                <select
                  value={editingRecord.status}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      status: e.target.value,
                    })
                  }
                  className="select select-bordered w-full select-sm"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={handleCancelEdit} className="btn btn-ghost btn-sm">
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="btn bg-[var(--primary-color)] text-white btn-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleCancelEdit}></div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Delete</h3>
            <p className="text-sm text-base-content/70 mb-6">
              Are you sure you want to delete the attendance record for{" "}
              <span className="font-semibold text-base-content">
                {deleteConfirm.employeeName}
              </span>{" "}
              on{" "}
              <span className="font-semibold text-base-content">
                {new Date(deleteConfirm.date).toLocaleDateString()}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="modal-action">
              <button onClick={handleCancelDelete} className="btn btn-ghost btn-sm">
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn btn-error text-white btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleCancelDelete}></div>
        </div>
      )}
    </>
  );
}