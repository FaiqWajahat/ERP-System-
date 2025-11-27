'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Download, Calendar, DollarSign, TrendingUp, 
  AlertCircle, Loader, Package, Activity
} from 'lucide-react';
import * as XLSX from 'xlsx';
import DashboardPageHeader from '@/Components/DashboardPageHeader';



export default function ProjectSummaryPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id || 'demo';

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);

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
        },
        {
          id: '4',
          date: '2024-11-18',
          description: 'Transport Costs',
          amount: 3000,
          category: 'transport',
          createdAt: '2024-11-18'
        },
        {
          id: '5',
          date: '2024-11-20',
          description: 'Electrical Materials',
          amount: 7500,
          category: 'materials',
          createdAt: '2024-11-20'
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

  const calculateTotals = () => {
    if (!project) return { totalExpenses: 0, totalIncome: 0, balance: 0 };

    const totalExpenses = project.expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = project.income.reduce((sum, i) => sum + i.amount, 0);
    const balance = totalIncome - totalExpenses;

    return { totalExpenses, totalIncome, balance };
  };

  const getExpensesByCategory = () => {
    if (!project) return {};
    
    const categories = {};
    project.expenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });
    
    return categories;
  };

  const downloadExcelSummary = () => {
    if (!project) return;

    const totals = calculateTotals();
    const expensesByCategory = getExpensesByCategory();
    const budgetUtilization = project.estimatedBudget 
      ? (totals.totalExpenses / project.estimatedBudget) * 100 
      : 0;

    // Project Overview Sheet
    const overviewData = [
      ['PROJECT SUMMARY REPORT'],
      [''],
      ['Project Information'],
      ['Project Name:', project.name],
      ['Client Name:', project.clientName || 'N/A'],
      ['Location:', project.location],
      ['Start Date:', new Date(project.startDate).toLocaleDateString()],
      ['Status:', project.status],
      ['Progress:', `${project.progress}%`],
      ['Estimated Budget:', `$${project.estimatedBudget?.toLocaleString()}`],
      [''],
      ['Financial Summary'],
      ['Total Income:', `$${totals.totalIncome.toLocaleString()}`],
      ['Total Expenses:', `$${totals.totalExpenses.toLocaleString()}`],
      ['Net Profit/Loss:', `$${totals.balance.toLocaleString()}`],
      ['Budget Utilization:', `${budgetUtilization.toFixed(2)}%`],
      ['Remaining Budget:', `$${(project.estimatedBudget - totals.totalExpenses).toLocaleString()}`],
    ];

    // Expenses by Category Sheet
    const categoryData = [
      ['EXPENSES BY CATEGORY'],
      [''],
      ['Category', 'Amount', 'Percentage'],
    ];
    
    Object.entries(expensesByCategory).forEach(([category, amount]) => {
      const percentage = ((amount / totals.totalExpenses) * 100).toFixed(2);
      categoryData.push([
        category.charAt(0).toUpperCase() + category.slice(1),
        `$${amount.toLocaleString()}`,
        `${percentage}%`
      ]);
    });
    categoryData.push(['', '', '']);
    categoryData.push(['TOTAL', `$${totals.totalExpenses.toLocaleString()}`, '100%']);

    // Detailed Expenses Sheet
    const expensesData = [
      ['DETAILED EXPENSES'],
      [''],
      ['Date', 'Description', 'Category', 'Amount'],
    ];
    
    project.expenses
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(expense => {
        expensesData.push([
          new Date(expense.date).toLocaleDateString(),
          expense.description,
          expense.category.charAt(0).toUpperCase() + expense.category.slice(1),
          `$${expense.amount.toLocaleString()}`
        ]);
      });
    expensesData.push(['', '', 'TOTAL', `$${totals.totalExpenses.toLocaleString()}`]);

    // Income Details Sheet
    const incomeData = [
      ['INCOME DETAILS'],
      [''],
      ['Date', 'Description', 'Amount'],
    ];
    
    project.income
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(income => {
        incomeData.push([
          new Date(income.date).toLocaleDateString(),
          income.description,
          `$${income.amount.toLocaleString()}`
        ]);
      });
    incomeData.push(['', 'TOTAL', `$${totals.totalIncome.toLocaleString()}`]);

    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Add sheets
    const ws1 = XLSX.utils.aoa_to_sheet(overviewData);
    const ws2 = XLSX.utils.aoa_to_sheet(categoryData);
    const ws3 = XLSX.utils.aoa_to_sheet(expensesData);
    const ws4 = XLSX.utils.aoa_to_sheet(incomeData);
    
    // Set column widths
    ws1['!cols'] = [{ wch: 25 }, { wch: 30 }];
    ws2['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }];
    ws3['!cols'] = [{ wch: 15 }, { wch: 35 }, { wch: 15 }, { wch: 15 }];
    ws4['!cols'] = [{ wch: 15 }, { wch: 40 }, { wch: 15 }];
    
    XLSX.utils.book_append_sheet(wb, ws1, 'Project Overview');
    XLSX.utils.book_append_sheet(wb, ws2, 'Expenses by Category');
    XLSX.utils.book_append_sheet(wb, ws3, 'Detailed Expenses');
    XLSX.utils.book_append_sheet(wb, ws4, 'Income Details');
    
    // Generate filename
    const filename = `${project.name.replace(/[^a-z0-9]/gi, '_')}_Summary_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Download
    XLSX.writeFile(wb, filename);
  };

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Projects", href: "/Dashboard/Projects" },
    { name: project?.name || "Project", href: `/Dashboard/Projects/${projectId}` },
    { name: "Summary", href: "#" },
  ];

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
  const expensesByCategory = getExpensesByCategory();
  const budgetUtilization = project.estimatedBudget 
    ? (totals.totalExpenses / project.estimatedBudget) * 100 
    : 0;

  return (
    <>
      <DashboardPageHeader breadData={breadData} heading={" Summary Report"} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Link href={`/Dashboard/Projects/${projectId}`} className="flex-1 sm:flex-initial">
          <button className="btn btn-sm bg-base-200 text-gray-700 w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </button>
        </Link>
        <button 
          onClick={downloadExcelSummary}
          className="btn btn-sm bg-[var(--primary-color)] text-white flex-1 sm:flex-initial"
        >
          <Download className="w-4 h-4 mr-1" />
          Download Excel Report
        </button>
      </div>

      {/* Main Content Card */}
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6">
        <h2 className="text-lg font-bold mb-6">Project Overview</h2>
        
        {/* Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">Project Name</p>
            </div>
            <p className="font-semibold text-gray-900">{project.name}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">Client Name</p>
            </div>
            <p className="font-semibold text-gray-900">{project.clientName || 'N/A'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">Location</p>
            </div>
            <p className="font-semibold text-gray-900">{project.location}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">Start Date</p>
            </div>
            <p className="font-semibold text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">Status</p>
            </div>
            <p className="font-semibold text-gray-900 capitalize">{project.status.replace('_', ' ')}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">Progress</p>
            </div>
            <p className="font-semibold text-gray-900">{project.progress}%</p>
          </div>
        </div>

        {/* Financial Summary */}
        <h3 className="text-lg font-bold mb-4">Financial Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-gradient-to-br from-error/10 to-error/5 border border-error/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-error" />
                <span className="text-sm font-medium text-gray-700">Total Expenses</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-error">${totals.totalExpenses.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">{project.expenses.length} transactions recorded</p>
          </div>

          <div className="p-5 bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-gray-700">Total Income</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-success">${totals.totalIncome.toLocaleString()}</p>
            <p className="text-xs text-gray-600 mt-1">{project.income.length} payments received</p>
          </div>

          <div className={`p-5 bg-gradient-to-br rounded-lg border ${
            totals.balance >= 0 
              ? 'from-[var(--primary-color)]/10 to-[var(--primary-color)]/5 border-[var(--primary-color)]/20' 
              : 'from-warning/10 to-warning/5 border-warning/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Activity className={`w-5 h-5 ${totals.balance >= 0 ? 'text-[var(--primary-color)]' : 'text-warning'}`} />
              <span className="text-sm font-medium text-gray-700">Net Profit/Loss</span>
            </div>
            <p className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-[var(--primary-color)]' : 'text-warning'}`}>
              {totals.balance >= 0 ? '+' : ''}${totals.balance.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {totals.balance >= 0 ? 'Project is profitable' : 'Project has a loss'}
            </p>
          </div>

          <div className="p-5 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--primary-color)]/5 border border-[var(--primary-color)]/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-[var(--primary-color)]" />
              <span className="text-sm font-medium text-gray-700">Budget Utilization</span>
            </div>
            <p className="text-2xl font-bold text-[var(--primary-color)]">{budgetUtilization.toFixed(1)}%</p>
            <p className="text-xs text-gray-600 mt-1">
              Remaining: ${(project.estimatedBudget - totals.totalExpenses).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Expenses by Category */}
        <h3 className="text-lg font-bold mb-4">Expenses Breakdown by Category</h3>
        <div className="overflow-x-auto mb-8">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Category</th>
                <th className="text-right">Amount</th>
                <th className="text-right">Percentage</th>
                <th className="text-right">Transactions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(expensesByCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([category, amount]) => {
                  const percentage = ((amount / totals.totalExpenses) * 100).toFixed(1);
                  const count = project.expenses.filter(e => e.category === category).length;
                  return (
                    <tr key={category}>
                      <td>
                        <span className="badge badge-sm capitalize">{category}</span>
                      </td>
                      <td className="text-right font-semibold text-error">
                        ${amount.toLocaleString()}
                      </td>
                      <td className="text-right">{percentage}%</td>
                      <td className="text-right text-gray-600">{count}</td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td>TOTAL</td>
                <td className="text-right text-error text-lg">
                  ${totals.totalExpenses.toLocaleString()}
                </td>
                <td className="text-right">100%</td>
                <td className="text-right">{project.expenses.length}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Recent Transactions */}
        <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Category</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[...project.expenses.map(e => ({...e, type: 'expense'})), 
                ...project.income.map(i => ({...i, type: 'income'}))]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 15)
                .map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>{item.description}</td>
                    <td>
                      <span className={`badge badge-sm ${item.type === 'expense' ? 'badge-error' : 'badge-success'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td>
                      {item.category ? (
                        <span className="text-xs capitalize">{item.category}</span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className={`text-right font-semibold ${item.type === 'expense' ? 'text-error' : 'text-success'}`}>
                      {item.type === 'expense' ? '-' : '+'}${item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}