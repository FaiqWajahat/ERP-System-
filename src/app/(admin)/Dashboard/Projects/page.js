'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, Search, MapPin, Calendar, Eye, Trash2, X, AlertTriangle, DollarSign
} from 'lucide-react';
import DashboardPageHeader from '@/Components/DashboardPageHeader';
import CustomDropdown from '@/Components/CustomDropdown';
import DashboardSearch from '@/Components/DashboardSearch';



const formatCurrency = (amount) => {
  if (!amount || typeof amount !== 'number') return 'PKR 0';
  return `PKR ${amount.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (error) {
    return '-';
  }
};

export default function ProjectsPage() {
  const router = useRouter();
  
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [newProject, setNewProject] = useState({
    projectName: '',
    location: '',
    startDate: new Date().toISOString().split('T')[0],
    estimatedBudget: '',
    details: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed)) {
          setProjects(parsed);
        } else {
          setProjects([]);
        }
      } else {
        // Demo data
        const demoProjects = [
          {
            id: 'proj-1',
            projectName: 'Residential Complex - Phase 2',
            location: 'Downtown District, Rawalpindi',
            startDate: '2024-01-15',
            estimatedBudget: 5000000,
            details: 'Modern residential complex with 50 units',
            status: 'active',
            expenses: [],
            payments: [],
            labourAssigned: [],
            createdAt: new Date().toISOString()
          },
          {
            id: 'proj-2',
            projectName: 'Commercial Plaza Construction',
            location: 'Satellite Town, Rawalpindi',
            startDate: '2024-02-20',
            estimatedBudget: 8000000,
            details: 'Three-story commercial plaza with parking',
            status: 'active',
            expenses: [],
            payments: [],
            labourAssigned: [],
            createdAt: new Date().toISOString()
          },
          {
            id: 'proj-3',
            projectName: 'House Renovation - Bahria Town',
            location: 'Bahria Town, Rawalpindi',
            startDate: '2024-03-10',
            estimatedBudget: 1500000,
            details: 'Complete renovation of 10 marla house',
            status: 'completed',
            expenses: [],
            payments: [],
            labourAssigned: [],
            createdAt: new Date().toISOString()
          }
        ];
        setProjects(demoProjects);
        localStorage.setItem('projects', JSON.stringify(demoProjects));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    }
  };

  const saveProjects = (updatedProjects) => {
    try {
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    } catch (error) {
      console.error('Error saving projects:', error);
      alert('Failed to save projects. Please try again.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newProject.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!newProject.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!newProject.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (newProject.estimatedBudget && isNaN(Number(newProject.estimatedBudget))) {
      newErrors.estimatedBudget = 'Budget must be a valid number';
    }
    
    if (newProject.estimatedBudget && Number(newProject.estimatedBudget) < 0) {
      newErrors.estimatedBudget = 'Budget cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProject = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const project = {
        id: `proj-${Date.now()}`,
        projectName: newProject.projectName.trim(),
        location: newProject.location.trim(),
        startDate: newProject.startDate,
        estimatedBudget: newProject.estimatedBudget ? Number(newProject.estimatedBudget) : 0,
        details: newProject.details.trim(),
        status: 'active',
        expenses: [],
        payments: [],
        labourAssigned: [],
        createdAt: new Date().toISOString()
      };

      const updatedProjects = [...projects, project];
      saveProjects(updatedProjects);
      
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewProject({
      projectName: '',
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

  const confirmDelete = () => {
    if (!projectToDelete) return;
    
    try {
      const updatedProjects = projects.filter(p => p.id !== projectToDelete.id);
      saveProjects(updatedProjects);
      setShowDeleteDialog(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setProjectToDelete(null);
  };

  const getFilteredProjects = () => {
    try {
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
          p.location?.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    } catch (error) {
      console.error('Error filtering projects:', error);
      return [];
    }
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

  return (
    <>
      <DashboardPageHeader breadData={breadData} heading="Projects" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Total Projects</div>
            <div className="stat-value text-2xl">
              {stats.total}
            </div>
            <div className="stat-desc">All projects</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Active Projects</div>
            <div className="stat-value text-2xl text-success">
              {stats.active}
            </div>
            <div className="stat-desc text-success">Currently ongoing</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Completed</div>
            <div className="stat-value text-2xl text-[var(--primary-color)]">
              {stats.completed}
            </div>
            <div className="stat-desc text-[var(--primary-color)]">Finished projects</div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
        <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-between mb-6 md:px-2">
          <div className="w-full md:w-auto justify-center md:justify-start flex">
            <DashboardSearch
              placeholder="Search projects..." 
              
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
                <th>Location</th>
                <th>Start Date</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  <tr key={project.id}>
                    <td>
                      <div className="font-medium">{project.projectName}</div>
                      {project.details && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">{project.details}</div>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{project.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(project.startDate)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{formatCurrency(project.estimatedBudget)}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-sm ${project.status === 'active' ? 'badge-success' : 'badge-primary'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/Dashboard/Projects/${project.id}/Dashboard`}>
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <MapPin size={48} className="text-gray-300 mb-4" />
                      <p className="text-gray-600 font-medium mb-1">No projects found</p>
                      <p className="text-gray-400 text-sm">
                        {searchTerm || statusFilter !== 'All' 
                          ? 'Try adjusting your filters' 
                          : 'Click "Add Project" to create your first project'}
                      </p>
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
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Project</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="w-full">
                  <label className="label">
                    <span className="label-text font-medium">Project Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Residential Complex - Phase 2"
                    className={`input input-bordered w-full ${errors.projectName ? 'input-error' : ''}`}
                    value={newProject.projectName}
                    onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  />
                  {errors.projectName && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.projectName}</span>
                    </label>
                  )}
                </div>

                <div className="w-full">
                  <label className="label">
                    <span className="label-text font-medium">Location *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Downtown District, Rawalpindi"
                    className={`input input-bordered w-full ${errors.location ? 'input-error' : ''}`}
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  />
                  {errors.location && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.location}</span>
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="label">
                      <span className="label-text font-medium">Start Date *</span>
                    </label>
                    <input
                      type="date"
                      className={`input input-bordered w-full ${errors.startDate ? 'input-error' : ''}`}
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    />
                    {errors.startDate && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.startDate}</span>
                      </label>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="label">
                      <span className="label-text font-medium">Estimated Budget (PKR)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 5000000"
                      min="0"
                      className={`input input-bordered w-full ${errors.estimatedBudget ? 'input-error' : ''}`}
                      value={newProject.estimatedBudget}
                      onChange={(e) => setNewProject({ ...newProject, estimatedBudget: e.target.value })}
                    />
                    {errors.estimatedBudget && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.estimatedBudget}</span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label className="label">
                    <span className="label-text font-medium">Project Details</span>
                  </label>
                  <textarea
                    placeholder="Brief description of the project..."
                    className="textarea textarea-bordered w-full"
                    rows={4}
                    value={newProject.details}
                    onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="btn btn-ghost flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="btn bg-[var(--primary-color)] text-white flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && projectToDelete && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-10 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-error/10 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-error" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Delete Project</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Are you sure you want to delete <strong>"{projectToDelete.projectName}"</strong>? 
                All associated expenses, payments, and labour records will be permanently removed.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn bg-error text-white flex-1 hover:bg-error/90"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}