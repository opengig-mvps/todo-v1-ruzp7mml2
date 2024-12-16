"use client";
import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X, Plus, LoaderCircleIcon } from "lucide-react";

const TodoPage = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<any>({ description: "", dueDate: undefined, priority: 1 });
  const [editingTask, setEditingTask] = useState<any>(null);

  useEffect(() => {
    if (!session) return;
    fetchTasks();
  }, [session]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${session?.user?.id}/todoLists`);
      setTasks(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask?.description || !newTask?.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        description: newTask?.description,
        dueDate: newTask?.dueDate?.toISOString(),
        priority: newTask?.priority,
      };
      const res = await axios.post(`/api/users/${session?.user?.id}/todoLists/1/tasks`, payload);
      if (res?.data?.success) {
        toast.success("Task added successfully!");
        fetchTasks();
        setNewTask({ description: "", dueDate: undefined, priority: 1 });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async () => {
    if (!editingTask?.description || !editingTask?.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        description: editingTask?.description,
        dueDate: editingTask?.dueDate?.toISOString(),
        priority: editingTask?.priority,
        isCompleted: editingTask?.isCompleted,
      };
      const res = await axios.patch(`/api/users/${session?.user?.id}/todoLists/1/tasks/${editingTask?.id}`, payload);
      if (res?.data?.success) {
        toast.success("Task updated successfully!");
        fetchTasks();
        setEditingTask(null);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/users/${session?.user?.id}/todoLists/1/tasks/${taskId}`);
      if (res?.data?.success) {
        toast.success("Task deleted successfully!");
        fetchTasks();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompletion = async (task: any) => {
    try {
      setLoading(true);
      const payload = { isCompleted: !task?.isCompleted };
      const res = await axios.patch(`/api/users/${session?.user?.id}/todoLists/1/tasks/${task?.id}/completion`, payload);
      if (res?.data?.success) {
        toast.success("Task completion status updated successfully!");
        fetchTasks();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Todo Management</h2>
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Task Description</Label>
            <Textarea
              id="description"
              value={newTask?.description}
              onChange={(e: any) => setNewTask({ ...newTask, description: e?.target?.value })}
              placeholder="Enter task description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <DateTimePicker
              date={newTask?.dueDate}
              setDate={(date: any) => setNewTask({ ...newTask, dueDate: date })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Input
              id="priority"
              type="number"
              value={newTask?.priority}
              onChange={(e: any) => setNewTask({ ...newTask, priority: Number(e?.target?.value) })}
              placeholder="Enter task priority"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleAddTask} disabled={loading}>
            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Add Task"}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Tasks</h3>
        {tasks?.map((task: any) => (
          <Card key={task?.id} className="mb-4">
            <CardContent className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">{task?.description}</h4>
                <p className="text-sm text-muted-foreground">Due: {new Date(task?.dueDate).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Priority: {task?.priority}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={task?.isCompleted}
                  onCheckedChange={() => handleToggleCompletion(task)}
                />
                <Button variant="ghost" size="icon" onClick={() => setEditingTask(task)}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task?.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingTask && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editDescription">Task Description</Label>
                <Textarea
                  id="editDescription"
                  value={editingTask?.description}
                  onChange={(e: any) => setEditingTask({ ...editingTask, description: e?.target?.value })}
                  placeholder="Enter task description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editDueDate">Due Date</Label>
                <DateTimePicker
                  date={editingTask?.dueDate}
                  setDate={(date: any) => setEditingTask({ ...editingTask, dueDate: date })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editPriority">Priority</Label>
                <Input
                  id="editPriority"
                  type="number"
                  value={editingTask?.priority}
                  onChange={(e: any) => setEditingTask({ ...editingTask, priority: Number(e?.target?.value) })}
                  placeholder="Enter task priority"
                />
              </div>
            </div>
            <CardFooter>
              <Button className="w-full" onClick={handleEditTask} disabled={loading}>
                {loading ? <LoaderCircleIcon className="animate-spin" /> : "Update Task"}
              </Button>
            </CardFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TodoPage;