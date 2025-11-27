'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Plus, Trash2, DollarSign, TrendingUp, Calendar, 
  AlertCircle, Loader, BarChart3, Search
} from 'lucide-react';
import DashboardPageHeader from '@/Components/DashboardPageHeader';
import CustomDropdown from '@/Components/CustomDropdown';


const DashboardSearch = ({ placeholder, value, onChange }) => (
  <div className="relative w-full md:w-64">
    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input 
      type="text" 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-base-200"
    />
  </div>
);


export default function ProjectDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id || 'demo';

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');

  const [expenseForm, setExpenseForm] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: 'materials'
  });

  const [incomeForm, setIncomeForm] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: ''
  });

  useEffect(() => {
    // Demo data for artifact
    setProject({
      id: 'demo',
      name: 'Residential Complex - Phase 2',
      location: 'Downtown District',
      clientName: 'ABC Developers',
      startDate: '2024-01-15',
      estimatedBudget: 500000,
      status: 'in_progress',
      progress: 65,
      expenses: [
        {
          id: '1',
          date: '2024-11-01',
          description: 'Cement and Steel',
          amount: 15000,
          category: 'materials',
          createdAt: '2024-11-01'
        },
        {
          id: '2',
          date: '2024-11-10',
          description: 'Labor Wages',
          amount: 8000,
          category: 'labor',
          createdAt: '2024-11-10'
        },
        {
          id: '3',
          date: '2024-11-15',
          description: 'Equipment Rental',
          amount: 5000,
          category: 'equipment',
          createdAt: '2024-11-15'
        }
      ],
      income: [
        {
          id: '1',
          date: '2024-11-05',
          description: 'First Milestone Payment',
          amount: 150000,
          createdAt: '2024-11-05'
        },
        {
          id: '2',
          date: '2024-11-20',
          description: 'Second Milestone Payment',
          amount: 100000,
          createdAt: '2024-11-20'
        }
      ]
    });
    setLoading(false);
  }, [projectId]);

  const saveProject = (updatedProject) => {
    setProject(updatedProject);
  };

  const updateProjectProgress = (newProgress) => {
    const updatedProject = { ...project, progress: parseInt(newProgress) };
    saveProject(updatedProject);
  };

  const handleAddExpense = () => {
    if (!expenseForm.description.trim() || !expenseForm.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      date: expenseForm.date,
      description: expenseForm.description.trim(),
      amount: parseFloat(expenseForm.amount),
      category: expenseForm.category,
      createdAt: new Date().toISOString()
    };

    const updatedProject = {
      ...project,
      expenses: [...project.expenses, newExpense]
    };

    saveProject(updatedProject);
    setExpenseForm({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: 'materials'
    });
  };

  const deleteExpense = (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      const updatedProject = {
        ...project,
        expenses: project.expenses.filter(e => e.id !== id)
      };
      saveProject(updatedProject);
    }
  };

  const handleAddIncome = () => {
    if (!incomeForm.description.trim() || !incomeForm.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const newIncome = {
      id: Date.now().toString(),
      date: incomeForm.date,
      description: incomeForm.description.trim(),
      amount: parseFloat(incomeForm.amount),
      createdAt: new Date().toISOString()
    };

    const updatedProject = {
      ...project,
      income: [...project.income, newIncome]
    };

    saveProject(updatedProject);
    setIncomeForm({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: ''
    });
  };

  const deleteIncome = (id) => {
    if (confirm('Are you sure you want to delete this income entry?')) {
      const updatedProject = {
        ...project,
        income: project.income.filter(i => i.id !== id)
      };
      saveProject(updatedProject);
    }
  };

  const calculateTotals = () => {
    if (!project) return { totalExpenses: 0, totalIncome: 0, balance: 0 };

    const totalExpenses = project.expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = project.income.reduce((sum, i) => sum + i.amount, 0);
    const balance = totalIncome - totalExpenses;

    return { totalExpenses, totalIncome, balance };
  };

  const getFilteredExpenses = () => {
    let filtered = project.expenses;
    
    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getFilteredIncome = () => {
    let filtered = project.income;
    
    if (searchTerm) {
      filtered = filtered.filter(i => 
        i.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Projects", href: "/Dashboard/Projects" },
    { name: project?.name || "Project Details", href: "#" },
  ];

  const tabMenu = ['Overview', 'Expenses', 'Income'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-[var(--primary-color)]" size={48} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-error mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
          <button 
            onClick={() => router.push('/Dashboard/Projects')}
            className="btn btn-sm bg-[var(--primary-color)] text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const totals = calculateTotals();
  const budgetUtilization = project.estimatedBudget 
    ? (totals.totalExpenses / project.estimatedBudget) * 100 
    : 0;

  return (
    <>
      <DashboardPageHeader breadData={breadData} heading={project.name} />

      {/* Stats Cards - Matching Employee Page Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-10">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Total Expenses</div>
            <div className="stat-value text-2xl text-error">
              ${totals.totalExpenses.toLocaleString()}
            </div>
            <div className="stat-desc text-error">{project.expenses.length} transactions</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Total Income</div>
            <div className="stat-value text-2xl text-success">
              ${totals.totalIncome.toLocaleString()}
            </div>
            <div className="stat-desc text-success">{project.income.length} payments</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Net Profit</div>
            <div className={`stat-value text-2xl ${totals.balance >= 0 ? 'text-[var(--primary-color)]' : 'text-warning'}`}>
              {totals.balance >= 0 ? '+' : ''}${totals.balance.toLocaleString()}
            </div>
            <div className={`stat-desc ${totals.balance >= 0 ? 'text-[var(--primary-color)]' : 'text-warning'}`}>
              {totals.balance >= 0 ? 'Profit' : 'Loss'}
            </div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Budget Used</div>
            <div className="stat-value text-2xl text-[var(--primary-color)]">
              {budgetUtilization.toFixed(0)}%
            </div>
            <div className="stat-desc text-[var(--primary-color)]">
              ${project.estimatedBudget ? parseFloat(project.estimatedBudget).toLocaleString() : '0'}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="bg-base-100 rounded-xl shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Project Progress</span>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              min="0" 
              max="100" 
              value={project.progress}
              onChange={(e) => updateProjectProgress(e.target.value)}
              className="input input-sm input-bordered w-16 text-center"
            />
            <span className="text-sm">%</span>
          </div>
        </div>
        <progress className="progress progress-primary w-full" value={project.progress} max="100"></progress>
      </div>

      {/* Main Content Card - Matching Employee Page Style */}
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
        <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-between mb-6 md:px-2">
          <div className="w-full md:w-auto justify-center md:justify-start flex">
            <DashboardSearch 
              placeholder={activeTab === 'Expenses' ? "Search expenses..." : activeTab === 'Income' ? "Search income..." : "Search..."} 
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="font-medium text-sm mr-2">View:</label>
              <CustomDropdown value={activeTab} setValue={setActiveTab} dropdownMenu={tabMenu} />
            </div>
            <Link href={`/Dashboard/Projects/${projectId}/Summary`}>
              <button className="btn btn-sm bg-[var(--primary-color)] text-white rounded-sm">
                <BarChart3 className="w-4 h-4 mr-1" />
                Summary Report
              </button>
            </Link>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full overflow-x-auto">
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {/* Project Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-base-200 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Client Name</p>
                  <p className="font-medium">{project.clientName || 'N/A'}</p>
                </div>
                <div className="p-4 bg-base-200 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-medium">{project.location}</p>
                </div>
                <div className="p-4 bg-base-200 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Start Date</p>
                  <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 bg-base-200 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="font-medium">${project.estimatedBudget?.toLocaleString()}</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...project.expenses, ...project.income]
                      .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
                      .slice(0, 10)
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>{item.description}</td>
                          <td>
                            <span className={`badge badge-sm ${item.category ? 'badge-error' : 'badge-success'}`}>
                              {item.category ? 'Expense' : 'Income'}
                            </span>
                          </td>
                          <td className={`text-right font-semibold ${item.category ? 'text-error' : 'text-success'}`}>
                            {item.category ? '-' : '+'}${item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Expenses' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Expense Form */}
              <div className="lg:col-span-1">
                <div className="bg-base-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Add Expense</h3>
                  <div className="space-y-3">
                    <div className="w-full">
                      <label className="label"><span className="label-text text-xs">Date</span></label>
                      <input 
                        type="date" 
                        className="input input-sm input-bordered w-full"
                        value={expenseForm.date} 
                        onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})} 
                      />
                    </div>

                    <div className="w-full">
                      <label className="label"><span className="label-text text-xs">Category</span></label>
                      <select 
                        className="select select-sm select-bordered w-full"
                        value={expenseForm.category}
                        onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                      >
                        <option value="materials">Materials</option>
                        <option value="equipment">Equipment</option>
                        <option value="transport">Transport</option>
                        <option value="utilities">Utilities</option>
                        <option value="labor">Labor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="w-full">
                      <label className="label"><span className="label-text text-xs">Description</span></label>
                      <input 
                        type="text" 
                        placeholder="e.g., Cement bags" 
                        className="input input-sm input-bordered w-full"
                        value={expenseForm.description} 
                        onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})} 
                      />
                    </div>

                    <div className="w-full">
                      <label className="label"><span className="label-text text-xs">Amount ($)</span></label>
                      <input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        min="0"
                        className="input input-sm input-bordered w-full"
                        value={expenseForm.amount} 
                        onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})} 
                      />
                    </div>

                    <button onClick={handleAddExpense} className="btn btn-sm bg-error text-white w-full hover:bg-error/90">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Expense
                    </button>
                  </div>
                </div>
              </div>

              {/* Expense List */}
              <div className="lg:col-span-2">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th className="text-right">Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredExpenses().map(expense => (
                      <tr key={expense.id}>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>{expense.description}</td>
                        <td>
                          <span className="badge badge-sm capitalize">{expense.category}</span>
                        </td>
                        <td className="text-right font-semibold text-error">
                          ${expense.amount.toLocaleString()}
                        </td>
                        <td>
                          <button 
                            onClick={() => deleteExpense(expense.id)} 
                            className="btn btn-ghost btn-xs text-error"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-right font-semibold">Total:</td>
                      <td className="text-right font-bold text-error text-lg">
                        ${totals.totalExpenses.toLocaleString()}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
                {getFilteredExpenses().length === 0 && (
                  <div className="text-center py-12">
                    <DollarSign size={48} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No expenses recorded yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Income' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Income Form */}
              <div className="lg:col-span-1">
                <div className="bg-base-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Record Income</h3>
                  <div className="space-y-3">
                    <div className="w-full">
                      <label className="label"><span className="label-text text-xs">Date</span></label>
                      <input 
                        type="date" 
                        className="input input-sm input-bordered w-full"
                        value={incomeForm.date} 
                        onChange={(e) => setIncomeForm({...incomeForm, date: e.target.value})} 
                      />
                    </div>

                    <div className="w-full">
                      <label className="label"><span className="label-text text-xs">Description</span></label>
                      <input 
                        type="text" 
                        placeholder="e.g., Client payment" 
                        className="input input-sm input-bordered w-full"
                        value={incomeForm.description} 
                        onChange={(e) => setIncomeForm({...incomeForm, description: e.target.value})} 
                      />
                    </div>

                    <div className="w-full">
                      <label className="label"><span className="label-text text-xs">Amount ($)</span></label>
                      <input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        min="0"
                        className="input input-sm input-bordered w-full"
                        value={incomeForm.amount} 
                        onChange={(e) => setIncomeForm({...incomeForm, amount: e.target.value})} 
                      />
                    </div>

                    <button onClick={handleAddIncome} className="btn btn-sm bg-success text-white w-full hover:bg-success/90">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Income
                    </button>
                  </div>
                </div>
              </div>

              {/* Income List */}
              <div className="lg:col-span-2">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th className="text-right">Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredIncome().map(income => (
                      <tr key={income.id}>
                        <td>{new Date(income.date).toLocaleDateString()}</td>
                        <td>{income.description}</td>
                        <td className="text-right font-semibold text-success">
                          ${income.amount.toLocaleString()}
                        </td>
                        <td>
                          <button 
                            onClick={() => deleteIncome(income.id)} 
                            className="btn btn-ghost btn-xs text-error"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="text-right font-semibold">Total:</td>
                      <td className="text-right font-bold text-success text-lg">
                        ${totals.totalIncome.toLocaleString()}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
                {getFilteredIncome().length === 0 && (
                  <div className="text-center py-12">
                    <TrendingUp size={48} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No income recorded yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}