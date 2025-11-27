'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardPageHeader from "@/Components/DashboardPageHeader";
import { ArrowLeft, Save } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    startDate: new Date().toISOString().split('T')[0],
    details: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Projects", href: "/Dashboard/Projects" },
    { name: "New Project", href: "/Dashboard/Projects/new" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Get existing projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Create new project
    const newProject = {
      id: `proj-${Date.now()}`,
      projectName: formData.projectName.trim(),
      location: formData.location.trim(),
      startDate: formData.startDate,
      details: formData.details.trim(),
      expenses: [],
      payments: [],
      labourAssigned: [],
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    savedProjects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(savedProjects));

    // Redirect to project detail page
    setTimeout(() => {
      router.push(`/Dashboard/Projects/${newProject.id}`);
    }, 500);
  };

  return (
    <div className="w-full">
      <DashboardPageHeader heading="Create New Project" breadData={breadData} />

      {/* Back Button */}
      <button
        className="btn btn-ghost btn-sm mb-6 gap-2"
        onClick={() => router.push('/Dashboard/Projects')}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </button>

      {/* Form */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Project Name <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  name="projectName"
                  className={`input input-bordered ${errors.projectName ? 'input-error' : ''}`}
                  placeholder="e.g., Residential Building - Block A"
                  value={formData.projectName}
                  onChange={handleChange}
                />
                {errors.projectName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.projectName}</span>
                  </label>
                )}
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Location <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  name="location"
                  className={`input input-bordered ${errors.location ? 'input-error' : ''}`}
                  placeholder="e.g., Sector 12, Sialkot"
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.location}</span>
                  </label>
                )}
              </div>

              {/* Start Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Start Date <span className="text-error">*</span></span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={`input input-bordered ${errors.startDate ? 'input-error' : ''}`}
                  value={formData.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.startDate}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Project Details</span>
              </label>
              <textarea
                name="details"
                className="textarea textarea-bordered h-32"
                placeholder="Describe the project, work details, scope, etc..."
                value={formData.details}
                onChange={handleChange}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => router.push('/Dashboard/Projects')}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
