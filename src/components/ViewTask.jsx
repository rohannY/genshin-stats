import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";

import View from "../assets/view";
import Trash from "../assets/trash";

import Check from "./checkbox";
import { useTaskContext } from "../context/task.context";
import { useState } from "react";

export default function ViewTask() {
  const { tasks, deleteTask } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    closeModal();
  };

  return (
    <div>
      {tasks.map((task) => (
        <div className="text-black text-sm" key={task.id}>
          <div className="flex gap-4 justify-between items-center w-full px-4 py-3 bg-zinc-100 rounded-lg shadow-sm border font-semibold border-zinc-100 mb-2">
            <p>{task.title}</p>
            <div className="flex items-center gap-2">
              <div
                className="cursor-pointer p-1 rounded-md hover:bg-zinc-200"
                onClick={() => handleDelete(task.id)}
                >
                <Trash size={5} color="#FF5733"/>
              </div>
              <div
                className="cursor-pointer p-1 rounded-md hover:bg-zinc-200"
                onClick={() => openModal(task)}
              >
                <View />
              </div>
            </div>
          </div>
        </div>
      ))}

      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onOpenChange={closeModal}
          className="text-black"
          backdrop="opaque"
        >
          <ModalContent className="font-quicksand">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <Breadcrumbs className="font-quicksand font-bold">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Task</BreadcrumbItem>
                    <BreadcrumbItem>{selectedTask.title}</BreadcrumbItem>
                  </Breadcrumbs>
                </ModalHeader>
                <ModalBody className="">
                  <div className="flex gap-4 justify-between items-center">
                    <h1 className="font-bold text-lg">{selectedTask.title}</h1>
                    <Check />
                  </div>
                  <p className="text-zinc-600 text-sm">
                    {selectedTask.description}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="bordered"
                    startContent={<Trash size={4} />}
                    size="sm"
                    onPress={() => handleDelete(selectedTask.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    color="secondary"
                    variant="shadow"
                    onPress={() => {
                      onClose();
                      closeModal();
                    }}
                    size="sm"
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
