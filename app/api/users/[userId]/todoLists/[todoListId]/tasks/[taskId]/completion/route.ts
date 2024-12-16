import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type TaskCompletionRequestBody = {
  isCompleted: boolean;
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
      return NextResponse.json({ success: false, message: 'Invalid ID(s)' }, { status: 400 });
    }

    const body: TaskCompletionRequestBody = await request.json();
    const { isCompleted } = body;

    const task = await prisma.task.updateMany({
      where: { id: taskId, todoListId: todoListId },
      data: { isCompleted, updatedAt: new Date() },
    });

    const updatedTask = await prisma.task.findFirst({
      where: { id: taskId },
    });

    if (!updatedTask) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Task completion status updated successfully',
      data: {
        id: updatedTask.id,
        description: updatedTask.description,
        isCompleted: updatedTask.isCompleted,
        dueDate: updatedTask.dueDate?.toISOString(),
        priority: updatedTask.priority,
        todoListId: updatedTask.todoListId,
        createdAt: updatedTask.createdAt.toISOString(),
        updatedAt: updatedTask.updatedAt.toISOString(),
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating task completion status:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}