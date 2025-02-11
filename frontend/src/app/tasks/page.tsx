"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  List,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { Task, TaskCreate } from "@/types/Task";
import { taskStatusColorMapper } from "@/utils/taskStatusColorMapper";
import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from "@/lib/tasks/tasks";
import { taskStatusNameMapper } from "@/utils/taskStatusNameMapper";
import { taskStatusIconMapper } from "@/utils/taskStatusIconMapper";

const { Text, Title } = Typography;
const { Option } = Select;

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await listTasks();
      setTasks(response.tasks);
    } catch {
      message.error("Erro ao carregar tarefas");
    } finally {
      setIsLoading(false);
    }
  };

  const showAddModal = () => {
    form.resetFields();
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const showEditModal = (task: Task) => {
    form.setFieldsValue(task);
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
      message.success("Tarefa excluída com sucesso");
    } catch {
      message.error("Erro ao excluir tarefa");
    }
  };

  const handleStatusChange = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchTasks();
      message.success("Status atualizado com sucesso");
    } catch {
      message.error("Erro ao atualizar status");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        await updateTask(editingTask.id, values);
        fetchTasks();
        message.success("Tarefa atualizada com sucesso");
      } else {
        await createTask(values as TaskCreate);
        fetchTasks();
        message.success("Tarefa criada com sucesso");
      }
      setIsModalVisible(false);
    } catch {
      message.error("Erro ao salvar tarefa");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card
          title={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-5">
              <Title
                level={2}
                className="text-gray-800 text-center sm:text-left mt-5"
              >
                Lista de Tarefas
              </Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showAddModal}
                className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
              >
                Nova Tarefa
              </Button>
            </div>
          }
          className="shadow-lg rounded-lg overflow-hidden"
          bodyStyle={{ padding: "24px" }}
        >
          <List
            itemLayout="horizontal"
            dataSource={tasks}
            loading={isLoading}
            renderItem={(task) => (
              <List.Item
                key={task.id}
                className="bg-white rounded-md shadow-sm mb-4 p-4 hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <div className="flex items-start mb-4 sm:mb-0 w-full sm:w-auto">
                  <div className="mr-4 mt-1 ml-5">
                    {taskStatusIconMapper(task.status)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Text strong className="text-lg">
                        {task.title}
                      </Text>
                      <Tag
                        color={taskStatusColorMapper[task.status]}
                        className="rounded-full px-2 py-1 text-xs"
                      >
                        {taskStatusNameMapper[task.status]}
                      </Tag>
                    </div>
                    <Text className="text-gray-600 block mb-2">
                      {task.description}
                    </Text>
                    <Text type="secondary" className="text-xs">
                      Criado em:{" "}
                      {new Date(task.created_at).toLocaleDateString("pt-br")}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <Select
                    defaultValue={task.status}
                    onChange={(value) => handleStatusChange(task.id, value)}
                    className="w-36"
                    bordered={false}
                  >
                    <Option value="pending">Pendente</Option>
                    <Option value="in_progress">Em Progresso</Option>
                    <Option value="done">Concluído</Option>
                  </Select>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => showEditModal(task)}
                    className="text-blue-500 hover:text-blue-600"
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(task.id)}
                    className="!mr-8 hover:text-red-600"
                  />
                </div>
              </List.Item>
            )}
          />
        </Card>

        <Modal
          title={
            <Title level={3}>
              {editingTask ? "Editar Tarefa" : "Nova Tarefa"}
            </Title>
          }
          open={isModalVisible}
          onOk={handleSubmit}
          onCancel={() => setIsModalVisible(false)}
          okText={editingTask ? "Atualizar" : "Criar"}
          cancelText="Cancelar"
          okButtonProps={{ className: "bg-blue-500 hover:bg-blue-600" }}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Título"
              rules={[{ required: true, message: "Por favor insira o título" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Descrição"
              rules={[
                { required: true, message: "Por favor insira a descrição" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item name="status" label="Status" initialValue="pending">
              <Select>
                <Option value="pending">Pendente</Option>
                <Option value="in_progress">Em Progresso</Option>
                <Option value="done">Concluído</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default TasksPage;
