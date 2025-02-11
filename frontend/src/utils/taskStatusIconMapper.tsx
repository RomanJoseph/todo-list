import { Task } from "@/types/Task"
import { ExclamationCircleOutlined, ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons"

export const taskStatusIconMapper = (status: Task["status"]) => {
    switch (status) {
      case "pending":
        return <ExclamationCircleOutlined className="text-yellow-500" />
      case "in_progress":
        return <ClockCircleOutlined className="text-blue-500" />
      case "done":
        return <CheckCircleOutlined className="text-green-500" />
      default:
        return null
    }
  }