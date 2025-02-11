"use client";

import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { App } from "antd";
import { Task } from "@/types/Task";
import { listTasks } from "@/lib/tasks/tasks";

interface ITaskResponseHook {
  tasks: Task[] | [];
  tasksLoading: boolean;
  tasksRefresh: () => void;
}

export const useTasks = (): ITaskResponseHook => {
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { message } = App.useApp()

  const fetchData = () => {
    if (loading) return;

    setLoading(true);

    listTasks()
      .then((res) => {
        setData(res.tasks);
      })
      .catch((err: AxiosError<{ message: string }>) => {
        if (
          !!err?.response &&
          !!err?.response?.data &&
          !!err?.response?.data?.message
        ) {
            message.error("err.response?.data?.message");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData()
  }, [])

  return {
    tasks: data,
    tasksLoading: loading,
    tasksRefresh: fetchData
  };
};
