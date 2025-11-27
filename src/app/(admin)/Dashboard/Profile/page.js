"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Upload, User, Loader2, CheckCircle2, X } from "lucide-react";
import DashboardPageHeader from "@/Components/DashboardPageHeader";

export default function ProfileSettings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch user profile data on mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsFetching(true);
      
      // REPLACE WITH YOUR API ENDPOINT
      // const response = await axios.get('/api/user/profile');
      // const data = response.data;
      
      // Mock data for demonstration
      const data = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        profileImage: null
      };
      
      setFormData(prev => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || ""
      }));
      
      if (data.profileImage) {
        setProfileImage(data.profileImage);
      }
      
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage({ type: "error", text: "Failed to load profile data" });
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
    // Clear field-specific error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: "Image size should be less than 5MB" });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setMessage({ type: "error", text: "Please upload a valid image file" });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
      setImageFile(file);
      setMessage({ type: "", text: "" });
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImageFile(null);
    const fileInput = document.getElementById("photo-upload");
    if (fileInput) fileInput.value = "";
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (showPasswordSection) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      }
      
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the errors below" });
      return;
    }
    
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Prepare form data for API (multipart for image upload)
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      
      // Add image file if selected - backend will upload to Cloudinary
      if (imageFile) {
        submitData.append("profileImage", imageFile);
      }
      
      if (showPasswordSection && formData.newPassword) {
        submitData.append("currentPassword", formData.currentPassword);
        submitData.append("newPassword", formData.newPassword);
      }

      // REPLACE WITH YOUR API ENDPOINT
      // Backend should handle Cloudinary upload and return the URL
      // const response = await axios.put('/api/user/profile', submitData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
      // Mock successful response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ type: "success", text: "Profile updated successfully!" });
      
      // Reset password fields
      if (showPasswordSection) {
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
        setShowPasswordSection(false);
      }
      
      // Clear image file reference
      setImageFile(null);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to update profile. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const breadData = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Profile Settings", href: "Dashboard/profile" },
  ];

  return (
    <>
    <DashboardPageHeader breadData={breadData} heading="Profile Settings" />
    <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 lg:p-6 mt-6">
      <div className=" mx-auto">
        <div className="bg-base-100  rounded-lg overflow-hidden">
          
        
          {/* Profile Image Section */}
          <div className="px-4 py-5 sm:px-6 bg-base-200/50 border-b border-base-300 rounded-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-[var(--primary-color)] ring-offset-base-100 ring-offset-2">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-base-300 flex items-center justify-center">
                        <User size={40} className="text-base-content/40" />
                      </div>
                    )}
                  </div>
                </div>
                
                <label 
                  htmlFor="photo-upload" 
                  className="btn bg-[var(--primary-color)] text-white btn-sm btn-circle absolute bottom-0 right-0 shadow-lg"
                  title="Upload photo"
                >
                  <Upload size={16} />
                  <input 
                    type="file" 
                    id="photo-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                    disabled={isLoading}
                  />
                </label>
              </div>

              <div className="flex-1 m-auto text-center sm:text-left space-y-1">
                <h2 className="text-xl font-semibold text-base-content">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-xs text-base-content/60">
                  JPG, PNG or GIF • Max 5MB
                </p>
                {profileImage && (
                  <button 
                    onClick={handleRemoveImage}
                    type="button" 
                    disabled={isLoading}
                    className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                  >
                    <X size={14} />
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-4 py-5 sm:px-6">
            
            {/* Alert Message */}
            {message.text && (
              <div role="alert" className={`alert ${
                message.type === "success" ? "alert-success" : 
                message.type === "info" ? "alert-info" : 
                "alert-error"
              } mb-4 text-sm py-3`}>
                <CheckCircle2 size={18} />
                <span className="text-sm">{message.text}</span>
                <button 
                  onClick={() => setMessage({ type: "", text: "" })}
                  className="btn btn-ghost btn-xs btn-circle"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-semibold text-base-content border-b border-base-300 pb-2">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* First Name */}
                <div className="form-control">
                  <label htmlFor="firstName" className="label py-1">
                    <span className="label-text text-sm font-medium text-base-content">
                      First Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`input input-sm input-bordered w-full text-sm focus:outline-none transition-colors ${
                      errors.firstName ? 'input-error' : 'focus:input-neutral'
                    }`}
                  />
                  {errors.firstName && (
                    <label className="label py-1">
                      <span className="label-text-alt text-error text-sm">{errors.firstName}</span>
                    </label>
                  )}
                </div>

                {/* Last Name */}
                <div className="form-control">
                  <label htmlFor="lastName" className="label py-1">
                    <span className="label-text text-sm font-medium text-base-content">
                      Last Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`input input-sm input-bordered w-full text-sm focus:outline-none transition-colors ${
                      errors.lastName ? 'input-error' : 'focus:input-neutral'
                    }`}
                  />
                  {errors.lastName && (
                    <label className="label py-1">
                      <span className="label-text-alt text-error text-sm">{errors.lastName}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label htmlFor="email" className="label py-1">
                  <span className="label-text text-sm font-medium text-base-content">
                    Email Address <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`input input-sm input-bordered w-full text-sm focus:outline-none transition-colors ${
                    errors.email ? 'input-error' : 'focus:input-neutral'
                  }`}
                />
                {errors.email && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error text-sm">{errors.email}</span>
                  </label>
                )}
              </div>

              {/* Phone */}
              <div className="form-control">
                <label htmlFor="phone" className="label py-1">
                  <span className="label-text text-sm font-medium text-base-content">
                    Phone Number
                  </span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`input input-sm input-bordered w-full text-sm focus:outline-none transition-colors ${
                    errors.phone ? 'input-error' : 'focus:input-neutral'
                  }`}
                />
                {errors.phone && (
                  <label className="label py-1">
                    <span className="label-text-alt text-error text-sm">{errors.phone}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Password Section */}
            <div className="pt-4 border-t border-base-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-base-content">Security</h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordSection(!showPasswordSection);
                    if (showPasswordSection) {
                      // Clear password fields and errors when closing
                      setFormData(prev => ({
                        ...prev,
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                      }));
                      setErrors(prev => {
                        const { currentPassword, newPassword, confirmPassword, ...rest } = prev;
                        return rest;
                      });
                    }
                  }}
                  disabled={isLoading}
                  className="btn btn-ghost btn-xs text-white bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 transition-colors rounded-sm"
                >
                  {showPasswordSection ? "Cancel" : "Change Password"}
                </button>
              </div>

              {showPasswordSection && (
                <div className="space-y-3 bg-base-200/30 p-4 rounded-lg">
                  {/* Current Password */}
                  <div className="form-control">
                    <label htmlFor="currentPassword" className="label py-1">
                      <span className="label-text text-sm font-medium text-base-content">
                        Current Password <span className="text-error">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className={`input input-sm input-bordered w-full text-sm focus:outline-none transition-colors ${
                          errors.currentPassword ? 'input-error' : 'focus:input-neutral'
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        disabled={isLoading}
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <label className="label py-1">
                        <span className="label-text-alt text-error text-sm">{errors.currentPassword}</span>
                      </label>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="form-control">
                    <label htmlFor="newPassword" className="label py-1">
                      <span className="label-text text-sm font-medium text-base-content">
                        New Password <span className="text-error">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Min 8 characters"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className={`input input-sm input-bordered w-full text-sm focus:outline-none transition-colors ${
                          errors.newPassword ? 'input-error' : 'focus:input-neutral'
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        disabled={isLoading}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <label className="label py-1">
                        <span className="label-text-alt text-error text-sm">{errors.newPassword}</span>
                      </label>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="form-control">
                    <label htmlFor="confirmPassword" className="label py-1">
                      <span className="label-text text-sm font-medium text-base-content">
                        Confirm New Password <span className="text-error">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter new password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className={`input input-sm input-bordered w-full text-sm focus:outline-none transition-colors ${
                          errors.confirmPassword ? 'input-error' : 'focus:input-neutral'
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <label className="label py-1">
                        <span className="label-text-alt text-error text-sm">{errors.confirmPassword}</span>
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-base-300 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
              <button 
                type="button" 
                onClick={() => {
                  fetchProfileData();
                  setShowPasswordSection(false);
                  setErrors({});
                  setMessage({ type: "", text: "" });
                }}
                disabled={isLoading}
                className="btn btn-ghost btn-sm text-xs rounded-sm"
              >
                Reset Changes
              </button>
              <button 
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                className="btn btn-ghost btn-sm text-white bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 transition-colors rounded-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}