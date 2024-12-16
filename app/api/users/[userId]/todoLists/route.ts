import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type TodoListRequestBody = {
  title: string;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body: TodoListRequestBody = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ success: false, message: 'Title is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const todoList = await prisma.todoList.create({
      data: {
        title,
        userId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Todo list created successfully',
      data: {
        id: todoList.id,
        title: todoList.title,
        userId: todoList.userId,
        createdAt: todoList.createdAt.toISOString(),
        updatedAt: todoList.updatedAt.toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating todo list:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}