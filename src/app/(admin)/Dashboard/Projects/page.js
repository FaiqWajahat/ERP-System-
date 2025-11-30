'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {
  Plus, MapPin, Calendar, Eye, Trash2, X, AlertTriangle, DollarSign, CheckCircle
} from 'lucide-react';
import DashboardPageHeader from '@/Components/DashboardPageHeader';
import CustomDropdown from '@/Components/CustomDropdown';
import DashboardSearch from '@/Components/DashboardSearch';
import { errorToast, successToast } from '@/lib/toast';
import CustomLoader from '@/Components/CustomLoader';

// Updated for Saudi Riyal (SAR)
const formatCurrency = (amount) => {
  if (!amount || typeof amount !== 'number') return 'SAR 0';
  return `SAR ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (error) {
    return '-';
  }
};

export default function ProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingProjectId, setUpdatingProjectId] = useState(null);

  const [errors, setErrors] = useState({});

  const [newProject, setNewProject] = useState({
    projectName: '',
    clientName: '',
    location: '',
    startDate: new Date().toISOString().split('T')[0],
    estimatedBudget: '',
    details: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- API FUNCTIONS ---

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/project');
      const success = response.data.success;
      if (!success) {
        errorToast(response.data.message || "Something went wrong");
        setIsLoading(false);
      }
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      errorToast("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        projectName: newProject.projectName.trim(),
        clientName: newProject.clientName.trim(),
        location: newProject.location.trim(),
        startDate: newProject.startDate,
        estimatedBudget: newProject.estimatedBudget ? Number(newProject.estimatedBudget) : 0,
        details: newProject.details.trim(),
        status: 'active'
      };

      const response = await axios.put('/api/project/add', payload);
      const success = response.data.success;

      if (!success) {
        errorToast(response.data.message || "Failed to add project");
        return;
      }
      successToast(response.data.message || "Project added successfully");
      setProjects((prev) => [...prev, response.data.data]);
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error adding project:', error);
      errorToast(error.response?.data?.message || 'Failed to add project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkAsCompleted = async (project) => {
    const targetId = project._id || project.id;
    if (!targetId) return;

    setUpdatingProjectId(targetId);

    try {
      const response = await axios.patch(`/api/project/status/${targetId}`, {
        status: 'completed'
      });

      const success = response.data.success;

      if (!success) {
        errorToast(response.data.message || "Failed to update project status");
      } else {
        successToast(response.data.message || "Project marked as completed");

        setProjects((prevProjects) =>
          prevProjects.map((p) =>
            (p._id === targetId || p.id === targetId) ? { ...p, status: 'completed' } : p
          )
        );
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      errorToast(error.response?.data?.message || 'Failed to mark project as completed.');
    } finally {
      setUpdatingProjectId(null);
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    const targetId = projectToDelete._id || projectToDelete.id;

    if (!targetId) {
        errorToast("Cannot delete: Invalid project ID");
        return;
    }

    setIsDeleting(true);

    try {
      const response = await axios.delete(`/api/project/${targetId}`);
      const success = response.data.success;

      if (!success) {
        errorToast(response.data.message || "Failed to delete project");
      } else {
        successToast(response.data.message || "Project deleted successfully");
        setProjects((prev) => prev.filter(p => (p._id || p.id) !== targetId));
        setShowDeleteDialog(false);
        setProjectToDelete(null);
      }

    } catch (error) {
      console.error('Error deleting project:', error);
      errorToast(error.response?.data?.message || 'Failed to communicate with server while deleting.');
    } finally {
      setIsDeleting(false);
    }
  };

  // --- FORM UTILS ---

  const validateForm = () => {
    const newErrors = {};
    if (!newProject.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!newProject.location.trim()) newErrors.location = 'Location is required';
    if (!newProject.startDate) newErrors.startDate = 'Start date is required';
    if (newProject.estimatedBudget && isNaN(Number(newProject.estimatedBudget))) newErrors.estimatedBudget = 'Budget must be a valid number';
    if (newProject.estimatedBudget && Number(newProject.estimatedBudget) < 0) newErrors.estimatedBudget = 'Budget cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setNewProject({
      projectName: '',
      clientName: '',
      location: '',
      startDate: new Date().toISOString().split('T')[0],
      estimatedBudget: '',
      details: ''
    });
    setErrors({});
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  const cancelDelete = () => {
    if (!isDeleting) {
        setShowDeleteDialog(false);
        setProjectToDelete(null);
    }
  };

  // UPDATED: Search handler for DashboardSearch component
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    
  };

  const getFilteredProjects = () => {
    let filtered = [...projects];

    if (statusFilter !== 'All') {
      filtered = filtered.filter(p => {
        if (statusFilter === 'Active') return p.status === 'active';
        if (statusFilter === 'Completed') return p.status === 'completed';
        return true;
      });
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.projectName?.toLowerCase().includes(searchLower) ||
        p.name?.toLowerCase().includes(searchLower) ||
        p.location?.toLowerCase().includes(searchLower) ||
        p.clientName?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Projects", href: "/Dashboard/Projects" },
  ];

  const dropdownMenu = ['All', 'Active', 'Completed'];

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length
  };

  const filteredProjects = getFilteredProjects();

  if(isLoading) return <CustomLoader text={"loading projects..."}/>
  else return (
    <>
      <DashboardPageHeader breadData={breadData} heading="Projects" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Total Projects</div>
            <div className="stat-value text-2xl">{stats.total}</div>
            <div className="stat-desc">All projects</div>
          </div>
        </div>
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Active Projects</div>
            <div className="stat-value text-2xl text-success">{stats.active}</div>
            <div className="stat-desc text-success">Currently ongoing</div>
          </div>
        </div>
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Completed</div>
            <div className="stat-value text-2xl text-[var(--primary-color)]">{stats.completed}</div>
            <div className="stat-desc text-[var(--primary-color)]">Finished projects</div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
        <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-between mb-6 md:px-2">
          <div className="w-full md:w-auto justify-center md:justify-start flex">
            {/* FIXED: Added value and onChange props */}
            <DashboardSearch 
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="font-medium text-sm mr-2">Status:</label>
              <CustomDropdown value={statusFilter} setValue={setStatusFilter} dropdownMenu={dropdownMenu} />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-sm bg-[var(--primary-color)] text-white rounded-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Project
            </button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="w-full overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <span className="loading loading-spinner loading-lg text-[var(--primary-color)]"></span>
                  </td>
                </tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map(project => {
                   const projectId = project._id || project.id;
                   return (
                  <tr key={projectId}>
                    <td>
                      <div className="font-medium">{project.name || project.projectName}</div>
                      {project.details && (
                        <div className="text-xs text-gray-500 truncate max-w-[100px]">{project.details}</div>
                      )}
                    </td>
                    <td>
                      <span className="text-sm text-gray-700">{project.clientName || '-'}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{project.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-3 h-3 text-gray-400" />
                        <span>{formatCurrency(project.estimatedBudget)}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-sm ${project.status === 'active' ? 'badge-success' : 'badge-primary'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1 items-center">
                        {project.status !== 'completed' && (
                          <button
                            onClick={() => handleMarkAsCompleted(project)}
                            className="btn btn-ghost btn-xs text-success"
                            title="Mark as Completed"
                            disabled={updatingProjectId === projectId}
                          >
                            {updatingProjectId === projectId ? (
                               <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                               <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                        )}

                        <Link href={`/Dashboard/Projects/${projectId}/Dashboard`}>
                          <button className="btn btn-ghost btn-xs" title="View Project">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(project)}
                          className="btn btn-ghost btn-xs text-error"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <div className="text-gray-400 mb-2">
                        {searchTerm ? `No projects found matching "${searchTerm}"` : 'No projects found'}
                      </div>
                      {!searchTerm && (
                        <button onClick={() => setShowAddModal(true)} className="btn btn-link btn-sm text-[var(--primary-color)]">
                          Add your first project
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
         <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity">
         <div className="bg-base-100 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="p-5">
            <div className="flex justify-between items-center mb-4 border-b border-base-200 pb-3">
              <h2 className="text-lg font-bold text-gray-800">Add New Project</h2>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="btn btn-ghost btn-xs btn-circle">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="w-full">
                  <label className="label py-1"><span className="label-text font-medium text-xs">Project Name *</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Al Narjis Villa Compound"
                    className={`input input-sm input-bordered w-full text-sm ${errors.projectName ? 'input-error' : ''}`}
                    value={newProject.projectName}
                    onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  />
                  {errors.projectName && <span className="text-[10px] text-error mt-1 ml-1">{errors.projectName}</span>}
                </div>
                <div className="w-full">
                  <label className="label py-1"><span className="label-text font-medium text-xs">Client Name (Optional)</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Al-Saif Contractors"
                    className="input input-sm input-bordered w-full text-sm"
                    value={newProject.clientName}
                    onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="label py-1"><span className="label-text font-medium text-xs">Location *</span></label>
                <input
                  type="text"
                  className={`input input-sm input-bordered w-full text-sm ${errors.location ? 'input-error' : ''}`}
                  placeholder="e.g. Al Malqa District, Riyadh"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                />
                {errors.location && <span className="text-[10px] text-error mt-1 ml-1">{errors.location}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="w-full">
                  <label className="label py-1"><span className="label-text font-medium text-xs">Start Date *</span></label>
                  <input
                    type="date"
                    className={`input input-sm input-bordered w-full text-sm ${errors.startDate ? 'input-error' : ''}`}
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  />
                  {errors.startDate && <span className="text-[10px] text-error mt-1 ml-1">{errors.startDate}</span>}
                </div>

                <div className="w-full">
                  <label className="label py-1"><span className="label-text font-medium text-xs">Budget (SAR)</span></label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    className={`input input-sm input-bordered w-full text-sm ${errors.estimatedBudget ? 'input-error' : ''}`}
                    value={newProject.estimatedBudget}
                    onChange={(e) => setNewProject({ ...newProject, estimatedBudget: e.target.value })}
                  />
                  {errors.estimatedBudget && <span className="text-[10px] text-error mt-1 ml-1">{errors.estimatedBudget}</span>}
                </div>
              </div>

              <div className="w-full">
                <label className="label py-1"><span className="label-text font-medium text-xs">Details</span></label>
                <textarea
                  placeholder="Brief scope of work..."
                  className="textarea textarea-bordered textarea-sm w-full text-sm"
                  rows={3}
                  value={newProject.details}
                  onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5 pt-3 border-t border-base-200">
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="btn btn-sm btn-ghost flex-1 font-normal"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="btn btn-sm bg-[var(--primary-color)] text-white flex-1 hover:brightness-110"
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : <Plus className="w-3 h-3 mr-1" />}
                Save Project
              </button>
            </div>
          </div>
        </div>
       </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && projectToDelete && (
         <div className="fixed inset-0 bg-black/30 bg-opacity-10 flex items-center justify-center z-50 p-4">
         <div className="bg-base-100 rounded-xl shadow-xl max-w-sm w-full">
           <div className="p-5">
             <div className="flex items-center gap-3 mb-3">
               <div className="p-2 bg-error/10 rounded-full">
                 <AlertTriangle className="w-5 h-5 text-error" />
               </div>
               <h3 className="text-lg font-bold">Delete Project?</h3>
             </div>
             <p className="text-sm text-gray-600 mb-5 leading-relaxed">
               Are you sure you want to delete <strong>"{projectToDelete.name || projectToDelete.projectName}"</strong>?
               This action cannot be undone.
             </p>
             <div className="flex gap-2">
               <button
                   onClick={cancelDelete}
                   className="btn btn-sm btn-ghost flex-1"
                   disabled={isDeleting}
               >
                 Cancel
               </button>
               <button
                   onClick={confirmDelete}
                   className="btn btn-sm bg-error text-white flex-1 hover:bg-error/90 items-center justify-center"
                   disabled={isDeleting}
               >
                 {isDeleting ? (
                     <>
                         <span className="loading loading-spinner loading-xs mr-2"></span>
                         Deleting...
                     </>
                 ) : (
                     "Delete"
                 )}
               </button>
             </div>
           </div>
         </div>
       </div>
      )}
    </>
  );
}