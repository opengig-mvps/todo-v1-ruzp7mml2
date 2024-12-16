import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type DueDateRequestBody = {
  dueDate: string;
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
      return NextResponse.json({ success: false, message: 'Invalid parameters' }, { status: 400 });
    }

    const body: DueDateRequestBody = await request.json();
    const dueDate = new Date(body.dueDate).toISOString();

    const task = await prisma.task.updateMany({
      where: { id: taskId, todoListId: todoListId },
      data: { dueDate: new Date(dueDate) },
    });

    if (task.count === 0) {
      return NextResponse.json({ success: false, message: 'Task not found or not updated' }, { status: 404 });
    }

    const updatedTask = await prisma.task.findFirst({
      where: { id: taskId, todoListId: todoListId },
    });

    return NextResponse.json({
      success: true,
      message: 'Task due date updated successfully',
      data: {
        id: updatedTask?.id,
        description: updatedTask?.description,
        isCompleted: updatedTask?.isCompleted,
        dueDate: updatedTask?.dueDate?.toISOString(),
        priority: updatedTask?.priority,
        todoListId: updatedTask?.todoListId,
        createdAt: updatedTask?.createdAt.toISOString(),
        updatedAt: updatedTask?.updatedAt.toISOString(),
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating task due date:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}