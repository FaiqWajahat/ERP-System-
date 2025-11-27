'use client'

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardPageHeader from "@/Components/DashboardPageHeader";
import { ArrowLeft, Save } from "lucide-react";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id;

  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    startDate: '',
    details: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = savedProjects.find(p => p.id === projectId);
    
    if (project) {
      setFormData({
        projectName: project.projectName || '',
        location: project.location || '',
        startDate: project.startDate || new Date().toISOString().split('T')[0],
        details: project.details || '',
      });
    } else {
      router.push('/Dashboard/Projects');
    }
    setLoading(false);
  }, [projectId, router]);

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Projects", href: "/Dashboard/Projects" },
    { name: "Edit Project", href: `/Dashboard/Projects/${projectId}/edit` },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = savedProjects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          projectName: formData.projectName.trim(),
          location: formData.location.trim(),
          startDate: formData.startDate,
          details: formData.details.trim(),
        };
      }
      return p;
    });

    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    setTimeout(() => {
      router.push(`/Dashboard/Projects/${projectId}`);
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DashboardPageHeader heading="Edit Project" breadData={breadData} />

      <button
        className="btn btn-ghost btn-sm mb-6 gap-2"
        onClick={() => router.push(`/Dashboard/Projects/${projectId}`)}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Project
      </button>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Project Name <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  name="projectName"
                  className={`input input-bordered ${errors.projectName ? 'input-error' : ''}`}
                  value={formData.projectName}
                  onChange={handleChange}
                />
                {errors.projectName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.projectName}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Location <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  name="location"
                  className={`input input-bordered ${errors.location ? 'input-error' : ''}`}
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.location}</span>
                  </label>
                )}
              </div>

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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Project Details</span>
              </label>
              <textarea
                name="details"
                className="textarea textarea-bordered h-32"
                value={formData.details}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => router.push(`/Dashboard/Projects/${projectId}`)}
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
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
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
