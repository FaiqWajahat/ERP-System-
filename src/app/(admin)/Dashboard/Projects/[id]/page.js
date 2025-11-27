'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, Search, MapPin, Calendar, DollarSign, TrendingUp, 
  Edit, Trash2, Eye, Activity
} from 'lucide-react';

// Mock components - replace with your actual components
const DashboardPageHeader = ({ breadData, heading }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 text-sm mb-2">
      {breadData.map((item, index) => (
        <span key={index}>
          <Link href={item.href} className="text-gray-600 hover:text-[var(--primary-color)]">
            {item.name}
          </Link>
          {index < breadData.length - 1 && <span className="mx-2 text-gray-400">/</span>}
        </span>
      ))}
    </div>
    <h1 className="text-2xl font-bold text-gray-900">{heading}</h1>
  </div>
);

const DashboardSearch = ({ placeholder, value, onChange }) => (
  <div className="relative w-full md:w-64">
    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input 
      type="text" 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-white"
    />
  </div>
);

const CustomDropdown = ({ value, setValue, dropdownMenu }) => (
  <select 
    className="select select-bordered select-sm bg-white"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  >
    {dropdownMenu.map((item, index) => (
      <option key={index} value={item}>{item}</option>
    ))}
  </select>
);

const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return 'PKR 0';
  return `PKR ${amount.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function ProjectsPage() {
  const router = useRouter();
  
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newProject, setNewProject] = useState({
    projectName: '',
    location: '',
    startDate: new Date().toISOString().split('T')[0],
    details: ''
  });

  useEffect(() => {
    // Demo data for artifact
    setProjects([
      {
        id: 'proj-1',
        projectName: 'Residential Complex - Phase 2',
        location: 'Downtown District, Rawalpindi',
        startDate: '2024-01-15',
        details: 'Modern residential complex with 50 units',
        status: 'active',
        expenses: [
          { id: 'exp-1', amount: 15000 },
          { id: 'exp-2', amount: 8000 },
          { id: 'exp-3', amount: 5000 }
        ],
        payments: [
          { id: 'pay-1', amount: 150000 },
          { id: 'pay-2', amount: 100000 }
        ],
        labourAssigned: [
          { id: 'lab-1', employees: [{ name: 'Ali' }, { name: 'Ahmed' }] }
        ]
      },
      {
        id: 'proj-2',
        projectName: 'Commercial Plaza Construction',
        location: 'Satellite Town, Rawalpindi',
        startDate: '2024-02-20',
        details: 'Three-story commercial plaza with parking',
        status: 'active',
        expenses: [
          { id: 'exp-4', amount: 25000 },
          { id: 'exp-5', amount: 12000 }
        ],
        payments: [
          { id: 'pay-3', amount: 200000 }
        ],
        labourAssigned: [
          { id: 'lab-2', employees: [{ name: 'Hassan' }, { name: 'Bilal' }, { name: 'Usman' }] }
        ]
      },
      {
        id: 'proj-3',
        projectName: 'House Renovation - Bahria Town',
        location: 'Bahria Town, Rawalpindi',
        startDate: '2024-03-10',
        details: 'Complete renovation of 10 marla house',
        status: 'completed',
        expenses: [
          { id: 'exp-6', amount: 8000 }
        ],
        payments: [
          { id: 'pay-4', amount: 80000 }
        ],
        labourAssigned: []
      }
    ]);
  }, []);

  const calculateProjectStats = (project) => {
    const totalExpenses = project.expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;
    const totalReceived = project.payments?.reduce((sum, pay) => sum + (pay.amount || 0), 0) || 0;
    const remaining = totalReceived - totalExpenses;
    const totalLabour = project.labourAssigned?.reduce((sum, lab) => sum + (lab.employees?.length || 0), 0) || 0;
    return { totalExpenses, totalReceived, remaining, totalLabour };
  };

  const overallStats = () => {
    const active = projects.filter(p => p.status === 'active').length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const totalExpenses = projects.reduce((sum, p) => {
      const expenses = p.expenses?.reduce((s, e) => s + (e.amount || 0), 0) || 0;
      return sum + expenses;
    }, 0);
    const totalRevenue = projects.reduce((sum, p) => {
      const payments = p.payments?.reduce((s, pay) => s + (pay.amount || 0), 0) || 0;
      return sum + payments;
    }, 0);

    return { active, completed, totalExpenses, totalRevenue };
  };

  const handleAddProject = () => {
    if (!newProject.projectName || !newProject.location) {
      alert('Please fill in all required fields');
      return;
    }

    const project = {
      id: `proj-${Date.now()}`,
      ...newProject,
      status: 'active',
      expenses: [],
      payments: [],
      labourAssigned: []
    };

    setProjects([...projects, project]);
    setShowAddModal(false);
    setNewProject({
      projectName: '',
      location: '',
      startDate: new Date().toISOString().split('T')[0],
      details: ''
    });
  };

  const handleDeleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const getFilteredProjects = () => {
    let filtered = projects;

    if (statusFilter !== 'All') {
      filtered = filtered.filter(p => {
        if (statusFilter === 'Active') return p.status === 'active';
        if (statusFilter === 'Completed') return p.status === 'completed';
        return true;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Projects", href: "/Dashboard/Projects" },
  ];

  const dropdownMenu = ['All', 'Active', 'Completed'];
  const stats = overallStats();

  return (
    <>
      <DashboardPageHeader breadData={breadData} heading="Projects" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Total Projects</div>
            <div className="stat-value text-2xl">
              {projects.length}
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

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Total Revenue</div>
            <div className="stat-value text-2xl text-success">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div className="stat-desc text-success">Overall income</div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
        <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-between mb-6 md:px-2">
          <div className="w-full md:w-auto justify-center md:justify-start flex">
            <DashboardSearch 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={setSearchTerm}
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

        {/* Projects Grid */}
        <div className="w-full overflow-x-auto">
          {getFilteredProjects().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredProjects().map(project => {
                const stats = calculateProjectStats(project);
                return (
                  <div key={project.id} className="card bg-base-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="card-body p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="card-title text-base font-bold">{project.projectName}</h3>
                        <span className={`badge badge-sm ${project.status === 'active' ? 'badge-success' : 'badge-primary'}`}>
                          {project.status}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(project.startDate)}</span>
                        </div>
                      </div>

                      {project.details && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.details}</p>
                      )}

                      <div className="divider my-2"></div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-error/10 p-2 rounded">
                          <div className="text-xs text-gray-600">Expenses</div>
                          <div className="text-sm font-bold text-error">{formatCurrency(stats.totalExpenses)}</div>
                        </div>
                        <div className="bg-success/10 p-2 rounded">
                          <div className="text-xs text-gray-600">Revenue</div>
                          <div className="text-sm font-bold text-success">{formatCurrency(stats.totalReceived)}</div>
                        </div>
                      </div>

                      <div className={`p-2 rounded mb-4 ${stats.remaining >= 0 ? 'bg-[var(--primary-color)]/10' : 'bg-warning/10'}`}>
                        <div className="text-xs text-gray-600">Net Balance</div>
                        <div className={`text-sm font-bold ${stats.remaining >= 0 ? 'text-[var(--primary-color)]' : 'text-warning'}`}>
                          {formatCurrency(stats.remaining)}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/Dashboard/Projects/${project.id}`} className="flex-1">
                          <button className="btn btn-sm btn-outline w-full">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="btn btn-sm btn-ghost text-error"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 font-medium mb-1">No projects found</p>
              <p className="text-gray-400 text-sm">
                {searchTerm || statusFilter !== 'All' 
                  ? 'Try adjusting your filters' 
                  : 'Add your first project to get started'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
              
              <div className="space-y-4">
                <div className="w-full">
                  <label className="label">
                    <span className="label-text font-medium">Project Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Residential Complex - Phase 2"
                    className="input input-bordered w-full"
                    value={newProject.projectName}
                    onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  />
                </div>

                <div className="w-full">
                  <label className="label">
                    <span className="label-text font-medium">Location *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Downtown District, Rawalpindi"
                    className="input input-bordered w-full"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                  />
                </div>

                <div className="w-full">
                  <label className="label">
                    <span className="label-text font-medium">Start Date *</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  />
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
                    setNewProject({
                      projectName: '',
                      location: '',
                      startDate: new Date().toISOString().split('T')[0],
                      details: ''
                    });
                  }}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="btn bg-[var(--primary-color)] text-white flex-1"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}