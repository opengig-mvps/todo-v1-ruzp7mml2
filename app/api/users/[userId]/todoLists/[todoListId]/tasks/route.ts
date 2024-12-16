import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type TaskRequestBody = {
  description: string;
  dueDate: string;
  priority: number;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string; todoListId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const todoListId = parseInt(params.todoListId, 10);

    if (isNaN(userId) || isNaN(todoListId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID or todo list ID' }, { status: 400 });
    }

    const body: TaskRequestBody = await request.json();
    const { description, dueDate, priority } = body;

    if (!description || !dueDate || isNaN(priority)) {
      return NextResponse.json({ success: false, message: 'Missing required fields or incorrect format' }, { status: 400 });
    }

    const todoList = await prisma.todoList.findFirst({
      where: { id: todoListId, userId: userId },
    });

    if (!todoList) {
      return NextResponse.json({ success: false, message: 'Todo list not found' }, { status: 404 });
    }

    const task = await prisma.task.create({
      data: {
        description,
        dueDate: new Date(dueDate),
        priority,
        todoListId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Task added successfully',
      data: {
        id: task.id,
        description: task.description,
        isCompleted: task.isCompleted,
        dueDate: task.dueDate?.toISOString(),
        priority: task.priority,
        todoListId: task.todoListId,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding task:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}