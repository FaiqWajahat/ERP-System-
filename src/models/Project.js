import mongoose from "mongoose";


const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Expense description is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Expense amount is required"],
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },

}, { timestamps: true }); 

// 2. Define Income Sub-Schema
const IncomeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Income description is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Income amount is required"],
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
}, { timestamps: true });


const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: false, // Optional based on your UI
      trim: true,
    },
    clientName: {
      type: String,
      required: false,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    estimatedBudget: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
     enum: ['active', 'completed', 'on_hold'],
    default: 'active',
    },
    details:{
        type:String,
        required:false
    },
    
    expenses: [ExpenseSchema],
    income: [IncomeSchema],
  },
  {
    timestamps: true, 
  }
);

// Prevent model overwrite error in Next.js hot reloading
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;