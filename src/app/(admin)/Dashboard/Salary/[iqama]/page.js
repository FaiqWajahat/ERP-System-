'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, Plus, X, Save, Calculator, DollarSign, Calendar, FileText, TrendingUp, Trash2, ArrowLeft } from 'lucide-react';
import DashboardPageHeader from "@/Components/DashboardPageHeader";
import DashboardSearch from "@/Components/DashboardSearch";
import CustomDropdown from "@/Components/CustomDropdown";

export default function EmployeeSalaryPage() {
  const params = useParams();
  const router = useRouter();
  const iqamaNumber = params?.iqama;

  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  const statusMenu = ['All', 'Paid', 'Pending'];

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Employees Profile", href: "/Dashboard/Employees" },
    { name: "Salary Management", href: `/Dashboard/Employees/${iqamaNumber}/Salary` },
  ];
  
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    baseSalary: '',
    absentDays: '0',
    expenses: [],
    deductions: '0',
    allowances: '0',
    notes: ''
  });

  const [calculatedData, setCalculatedData] = useState(null);

  useEffect(() => {
    if (iqamaNumber) {
      fetchEmployeeData();
      fetchSalaryRecords();
    }
  }, [iqamaNumber]);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        const dummyEmployee = {
          iqamaNumber: iqamaNumber || '2345678901',
          name: 'Ahmed Hassan',
          position: 'Senior Developer',
          baseSalary: 5000,
          department: 'Engineering',
          profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
        };
        setEmployee(dummyEmployee);
        setFormData(prev => ({ ...prev, baseSalary: dummyEmployee.baseSalary }));
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const fetchSalaryRecords = async () => {
    try {
      setTimeout(() => {
        setSalaryRecords([
          {
            id: 1,
            month: 'October 2024',
            fromDate: '2024-10-01',
            toDate: '2024-10-31',
            baseSalary: 5000,
            deductions: 850,
            allowances: 0,
            netSalary: 4150,
            paidDate: '2024-11-01',
            status: 'Paid',
            expenses: [{ description: 'Loan Payment', amount: 500 }],
            absentDays: 2
          },
          {
            id: 2,
            month: 'September 2024',
            fromDate: '2024-09-01',
            toDate: '2024-09-30',
            baseSalary: 5000,
            deductions: 650,
            allowances: 200,
            netSalary: 4550,
            paidDate: '2024-10-01',
            status: 'Paid',
            expenses: [],
            absentDays: 3
          },
          {
            id: 3,
            month: 'August 2024',
            fromDate: '2024-08-01',
            toDate: '2024-08-31',
            baseSalary: 5000,
            deductions: 450,
            allowances: 0,
            netSalary: 4550,
            paidDate: null,
            status: 'Pending',
            expenses: [],
            absentDays: 1
          }
        ]);
      }, 300);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCalculate = () => {
    const { baseSalary, absentDays, expenses, deductions, allowances } = formData;
    
    if (!formData.fromDate || !formData.toDate) {
      alert('Please select date range');
      return;
    }

    const base = parseFloat(baseSalary) || 0;
    const absent = parseInt(absentDays) || 0;
    const extraDeduct = parseFloat(deductions) || 0;
    const extraAllow = parseFloat(allowances) || 0;

    const absentDeduction = (base / 30) * absent;
    const expensesTotal = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
    const totalDeductions = absentDeduction + expensesTotal + extraDeduct;
    const netSalary = base + extraAllow - totalDeductions;

    setCalculatedData({
      baseSalary: base,
      absentDays: absent,
      absentDeduction,
      expenses: [...expenses],
      expensesTotal,
      extraDeductions: extraDeduct,
      extraAllowances: extraAllow,
      totalDeductions,
      netSalary
    });
  };

  const handleSaveDraft = async () => {
    try {
      setPaying(true);
      setTimeout(() => {
        alert('Salary record saved as draft');
        setPaying(false);
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      setPaying(false);
    }
  };

  const handleMarkPaid = async () => {
    try {
      setPaying(true);
      setTimeout(() => {
        alert('Salary marked as paid successfully');
        fetchSalaryRecords();
        resetForm();
        setPaying(false);
      }, 800);
    } catch (error) {
      console.error('Error:', error);
      setPaying(false);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (!confirm('Are you sure you want to delete this salary record?')) return;
    
    try {
      setTimeout(() => {
        setSalaryRecords(prev => prev.filter(r => r.id !== recordId));
        alert('Record deleted successfully');
      }, 300);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const downloadExcel = (record) => {
    const data = [
      ['Employee Salary Statement'],
      [],
      ['Employee Name:', employee?.name || ''],
      ['Iqama Number:', employee?.iqamaNumber || ''],
      ['Position:', employee?.position || ''],
      ['Period:', `${formatDate(record.fromDate)} - ${formatDate(record.toDate)}`],
      [],
      ['Description', 'Amount (SAR)'],
      ['Base Salary', record.baseSalary],
      ['Allowances', record.allowances],
      ['Absent Days Deduction', record.deductions],
      ...(record.expenses || []).map(exp => [exp.description, -exp.amount]),
      [],
      ['Net Salary', record.netSalary],
      [],
      ['Paid Date:', formatDate(record.paidDate)],
      ['Status:', record.status]
    ];

    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `salary_${employee?.name}_${record.month}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllRecords = () => {
    const headers = ['Period', 'From Date', 'To Date', 'Base Salary', 'Allowances', 'Deductions', 'Net Salary', 'Paid Date', 'Status'];
    const rows = salaryRecords.map(record => [
      record.month,
      record.fromDate,
      record.toDate,
      record.baseSalary,
      record.allowances,
      record.deductions,
      record.netSalary,
      record.paidDate || 'N/A',
      record.status
    ]);

    const csvContent = [
      ['Employee Salary History'],
      ['Employee:', employee?.name || ''],
      ['Iqama:', employee?.iqamaNumber || ''],
      [],
      headers,
      ...rows
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `salary_history_${employee?.name}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setFormData({
      fromDate: '',
      toDate: '',
      baseSalary: employee?.baseSalary || '',
      absentDays: '0',
      expenses: [],
      deductions: '0',
      allowances: '0',
      notes: ''
    });
    setCalculatedData(null);
    setShowCalculator(false);
    setEditingRecord(null);
  };

  const addExpense = () => {
    setFormData(prev => ({
      ...prev,
      expenses: [...prev.expenses, { description: '', amount: '' }]
    }));
  };

  const updateExpense = (index, field, value) => {
    const updated = [...formData.expenses];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, expenses: updated }));
  };

  const removeExpense = (index) => {
    setFormData(prev => ({
      ...prev,
      expenses: prev.expenses.filter((_, i) => i !== index)
    }));
  };

  const formatCurrency = (amount) => {
    return `${parseFloat(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR`;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB');
  };

  const filteredRecords = selectedStatus === 'All' 
    ? salaryRecords 
    : salaryRecords.filter(record => record.status === selectedStatus);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[var(--primary-color)]"></span>
      </div>
    );
  }

  return (
    <>
      <DashboardPageHeader breadData={breadData} heading={`Salary Management - ${employee?.name || ''}`} />

      {/* Stats Section - Matching Employee Page Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Base Salary</div>
            <div className="stat-value text-2xl">{formatCurrency(employee?.baseSalary)}</div>
            <div className="stat-desc">Monthly Base</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Total Records</div>
            <div className="stat-value text-2xl text-[var(--primary-color)]">
              {salaryRecords.length}
            </div>
            <div className="stat-desc text-[var(--primary-color)]">Salary Records</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Paid</div>
            <div className="stat-value text-2xl text-success">
              {salaryRecords.filter(r => r.status === 'Paid').length}
            </div>
            <div className="stat-desc text-success">Completed Payments</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-title text-xs">Pending</div>
            <div className="stat-value text-2xl text-error">
              {salaryRecords.filter(r => r.status === 'Pending').length}
            </div>
            <div className="stat-desc text-error">Awaiting Payment</div>
          </div>
        </div>
      </div>

      {/* Employee Info Card - Matching Employee Page Style */}
      <div className="w-full bg-base-100 rounded-md p-4 lg:p-6 mt-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-[var(--primary-color)] ring-offset-base-100 ring-offset-2">
                {employee?.profilePic ? (
                  <img src={employee.profilePic} alt={employee.name} />
                ) : (
                  <div className="bg-[var(--primary-color)] text-white flex items-center justify-center">
                    <span className="text-2xl">{employee?.name?.charAt(0) || 'A'}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{employee?.name}</h2>
              <p className="text-xs opacity-60">{employee?.position} • {employee?.department}</p>
              <p className="text-xs opacity-50 mt-1">Iqama: {employee?.iqamaNumber}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => router.back()}
              className="btn btn-sm btn-outline rounded-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            {salaryRecords.length > 0 && (
              <button 
                onClick={downloadAllRecords}
                className="btn btn-sm btn-outline rounded-sm"
              >
                <Download className="w-4 h-4 mr-1" />
                Export All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Salary Calculator - Matching Employee Page Style */}
      {showCalculator && (
        <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Calculator className="text-[var(--primary-color)]" size={24} />
              <h2 className="text-xs font-bold">Salary Calculator</h2>
            </div>
            <button 
              onClick={resetForm}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-semibold">From Date</span>
                </label>
                <input
                  type="date"
                  value={formData.fromDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, fromDate: e.target.value }))}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-semibold">To Date</span>
                </label>
                <input
                  type="date"
                  value={formData.toDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, toDate: e.target.value }))}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Salary & Attendance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-semibold">Base Salary (SAR)</span>
                </label>
                <input
                  type="number"
                  value={formData.baseSalary}
                  onChange={(e) => setFormData(prev => ({ ...prev, baseSalary: e.target.value }))}
                  className="input input-bordered w-full"
                  placeholder="5000"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-semibold">Absent Days</span>
                </label>
                <input
                  type="number"
                  value={formData.absentDays}
                  onChange={(e) => setFormData(prev => ({ ...prev, absentDays: e.target.value }))}
                  className="input input-bordered w-full"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Expenses */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-semibold">Expenses & Loans</span>
                <button onClick={addExpense} className="btn bg-[var(--primary-color)] text-white btn-xs gap-1 rounded-sm">
                  <Plus size={14} />
                  Add Expenses
                </button>
              </label>
              <div className="space-y-2">
                {formData.expenses.map((exp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={exp.description}
                      onChange={(e) => updateExpense(index, 'description', e.target.value)}
                      placeholder="Description"
                      className="input input-bordered input-sm flex-1"
                    />
                    <input
                      type="number"
                      value={exp.amount}
                      onChange={(e) => updateExpense(index, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="input input-bordered input-sm w-32"
                    />
                    <button
                      onClick={() => removeExpense(index)}
                      className="btn btn-sm btn-square btn-error btn-outline"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-semibold">Other Deductions (SAR)</span>
                </label>
                <input
                  type="number"
                  value={formData.deductions}
                  onChange={(e) => setFormData(prev => ({ ...prev, deductions: e.target.value }))}
                  className="input input-bordered w-full"
                  placeholder="0"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-semibold">Allowances (SAR)</span>
                </label>
                <input
                  type="number"
                  value={formData.allowances}
                  onChange={(e) => setFormData(prev => ({ ...prev, allowances: e.target.value }))}
                  className="input input-bordered w-full"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-semibold block ">Notes (Optional)</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="textarea block w-full textarea-bordered h-2"
                placeholder="Add any additional notes here..."
              />
            </div>

            <button onClick={handleCalculate} className="btn bg-[var(--primary-color)] text-white w-full gap-2 rounded-sm">
              <Calculator size={18} />
              Calculate Salary
            </button>

            {/* Result */}
            {calculatedData && (
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body p-6">
                  <h3 className="font-bold text-xs mb-4">Salary Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-base-300">
                      <span className="opacity-70">Base Salary</span>
                      <span className="font-bold text-xs">{formatCurrency(calculatedData.baseSalary)}</span>
                    </div>
                    
                    {calculatedData.extraAllowances > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b border-base-300">
                        <span className="opacity-70">Allowances</span>
                        <span className="font-bold text-success text-xs">+{formatCurrency(calculatedData.extraAllowances)}</span>
                      </div>
                    )}

                    {calculatedData.absentDays > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b border-base-300">
                        <span className="opacity-70">Absent ({calculatedData.absentDays} days)</span>
                        <span className="font-bold text-error text-xs">-{formatCurrency(calculatedData.absentDeduction)}</span>
                      </div>
                    )}

                    {calculatedData.expenses.map((exp, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-3 border-b border-base-300">
                        <span className="opacity-70">{exp.description}</span>
                        <span className="font-bold text-error text-xs">-{formatCurrency(exp.amount)}</span>
                      </div>
                    ))}

                    {calculatedData.extraDeductions > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b border-base-300">
                        <span className="opacity-70">Other Deductions</span>
                        <span className="font-bold text-error text-xs">-{formatCurrency(calculatedData.extraDeductions)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-[var(--primary-color)]">
                      <span className="text-xs font-bold">Net Salary</span>
                      <span className="text-3xl font-bold text-[var(--primary-color)]">{formatCurrency(calculatedData.netSalary)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button 
                      onClick={handleSaveDraft}
                      disabled={paying}
                      className="btn btn-outline flex-1 gap-2 rounded-sm"
                    >
                      {paying ? <span className="loading loading-spinner loading-sm"></span> : <Save size={18} />}
                      Save Draft
                    </button>
                    <button 
                      onClick={handleMarkPaid}
                      disabled={paying}
                      className="btn bg-[var(--primary-color)] text-white flex-1 gap-2 rounded-sm"
                    >
                      {paying ? <span className="loading loading-spinner loading-sm"></span> : <DollarSign size={18} />}
                      Mark as Paid
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Salary History - Matching Employee Page Style */}
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6 mt-6">
        <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-between mb-6 md:px-2">
          <div className="w-full md:w-auto justify-center md:justify-start flex">
            <DashboardSearch placeholder={"Search Salary Records"} />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="font-medium text-xs mr-2">Status:</label>
              <CustomDropdown value={selectedStatus} setValue={setSelectedStatus} dropdownMenu={statusMenu} />
            </div>
            {!showCalculator && (
              <button 
                onClick={() => setShowCalculator(true)}
                className="btn btn-sm bg-[var(--primary-color)] text-white rounded-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                New Salary
              </button>
            )}
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-16">
              <FileText size={64} className="mx-auto opacity-30 mb-4" />
              <p className="opacity-60 text-xs">No salary records found</p>
            </div>
          ) : (
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Duration</th>
                  <th className="text-right">Base</th>
                  <th className="text-right">Allowances</th>
                  <th className="text-right">Deductions</th>
                  <th className="text-right">Net Salary</th>
                  <th>Paid Date</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover">
                    <td className="font-semibold">{record.month}</td>
                    <td className="opacity-60 text-xs">
                      {formatDate(record.fromDate)} - {formatDate(record.toDate)}
                    </td>
                    <td className="text-right font-medium">{formatCurrency(record.baseSalary)}</td>
                    <td className="text-right text-success font-medium">
                      {record.allowances > 0 ? formatCurrency(record.allowances) : '-'}
                    </td>
                    <td className="text-right text-error font-medium">{formatCurrency(record.deductions)}</td>
                    <td className="text-right font-bold text-xs text-[var(--primary-color)]">{formatCurrency(record.netSalary)}</td>
                    <td>{formatDate(record.paidDate)}</td>
                    <td>
                      <span className={`badge ${
                        record.status === 'Paid' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1 justify-center">
                        <button
                          onClick={() => downloadExcel(record)}
                          className="btn btn-ghost btn-xs btn-square text-[var(--primary-color)]"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(record.id)}
                          className="btn btn-ghost btn-xs btn-square text-error"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}