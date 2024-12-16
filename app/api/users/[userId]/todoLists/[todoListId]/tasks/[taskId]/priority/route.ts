import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type PriorityRequestBody = {
  priority: number;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string; todoListId: string; taskId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    const todoListId = parseInt(params.todoListId, 10);
    const taskId = parseInt(params.taskId, 10);

    if (isNaN(userId) || isNaN(todoListId) || isNaN(taskId)) {
      return NextResponse.json({ success: false, message: 'Invalid IDs' }, { status: 400 });
    }

    const body: PriorityRequestBody = await request.json();
    const priority = parseInt(body.priority as any, 10);

    if (isNaN(priority)) {
      return NextResponse.json({ success: false, message: 'Invalid priority value' }, { status: 400 });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        todoListId: todoListId,
        todoList: {
          userId: userId,
        },
      },
    });

    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        priority: priority,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Task priority updated successfully',
      data: {
        id: updatedTask.id,
        description: updatedTask.description,
        isCompleted: updatedTask.isCompleted,
        dueDate: updatedTask.dueDate,
        priority: updatedTask.priority,
        todoListId: updatedTask.todoListId,
        createdAt: updatedTask.createdAt,
        updatedAt: updatedTask.updatedAt,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating task priority:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}