import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type TaskRequestBody = {
  description: string;
  isCompleted: boolean;
  dueDate: string;
  priority: number;
};

export async function PUT(
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

    const body: TaskRequestBody = await request.json();
    const { description, isCompleted, dueDate, priority } = body;

    const updatedTask = await prisma.task.updateMany({
      where: {
        id: taskId,
        todoListId: todoListId,
        todoList: {
          userId: userId,
        },
      },
      data: {
        description: String(description),
        isCompleted: Boolean(isCompleted),
        dueDate: new Date(dueDate),
        priority: parseInt(priority.toString(), 10),
        updatedAt: new Date(),
      },
    });

    if (updatedTask.count === 0) {
      return NextResponse.json({ success: false, message: 'Task not found or not updated' }, { status: 404 });
    }

    const task = await prisma.task.findFirst({
      where: { id: taskId },
    });

    return NextResponse.json({
      success: true,
      message: 'Task updated successfully',
      data: {
        id: task?.id,
        description: task?.description,
        isCompleted: task?.isCompleted,
        dueDate: task?.dueDate,
        priority: task?.priority,
        todoListId: task?.todoListId,
        createdAt: task?.createdAt,
        updatedAt: task?.updatedAt,
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating task:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}