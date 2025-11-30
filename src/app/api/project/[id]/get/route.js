import connectDB from '@/lib/mongodb';
import Project from '@/models/project';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    
    await connectDB();

    const { id } = params;

    
    const project = await Project.findById(id);

    
    if (!project) {
      return NextResponse.json(
        { message: "Project not found", success:true }, 
        { status: 404 }
      );
    }

    // 4. Return the project data
    return NextResponse.json(project, { status: 200 });

  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Server error while fetching project" }, 
      { status: 500 }
    );
  }
}

