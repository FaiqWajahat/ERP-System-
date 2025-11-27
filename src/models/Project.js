import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  location: String,
  startDate: {
    type: Date,
    required: true,
  },
  details: String,

  // DAILY EXPENSES
  expenses: [
    {
      date: { type: Date, required: true },
      title: { type: String, required: true },
      amount: { type: Number, required: true },
      notes: String,
    },
  ],

  // AMOUNT RECEIVED DAILY
  payments: [
    {
      date: { type: Date, required: true },
      amount: { type: Number, required: true },
      notes: String,
    },
  ],

  // LABOUR ASSIGNED DAILY
  labourAssigned: [
    {
      date: { type: Date, required: true },
      employees: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
      ],
    },
  ],

  // AUTO CALCULATED SUMMARY
  summary: {
    totalExpenses: { type: Number, default: 0 },
    totalReceived: { type: Number, default: 0 },
    remaining: { type: Number, default: 0 },
    profitOrLoss: { type: Number, default: 0 },
  }
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
