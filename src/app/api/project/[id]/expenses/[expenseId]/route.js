import connectDB from '@/lib/mongodb';
import Project from '@/models/project';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id, expenseId } = params;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $pull: { expenses: { _id: expenseId } } }, 
      { new: true }
    );

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}