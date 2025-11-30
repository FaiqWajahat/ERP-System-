import connectDB from '@/lib/mongodb';
import Project from '@/models/project';
import { NextResponse } from 'next/server';


export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();
    console.log(body.date, body.description, body.amount)

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { 
        $push: { 
          expenses: {
            description: body.description,
            amount: body.amount,
            date: body.date,
            createdAt: new Date()
          } 
        } 
      },
      { new: true } 
    );

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}