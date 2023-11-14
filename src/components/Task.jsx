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
  Input,
  Textarea,
} from "@nextui-org/react";

import Plus from "../assets/plus";
import ViewTask from "./ViewTask";
import { useState } from "react";
import { useTaskContext } from "../context/task.context";

export default function Task() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useTaskContext();

  const handleClick = (onClose) => { 
    if (title.trim() !== '' && description.trim() !== '') {
      addTask({ title, description });
      setTitle('');
      setDescription('');
    }   
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 100);
  };
  

  return (
    <>
      <div className="flex flex-col lg:w-2/3 w-full h-full relative bg-white font-quicksand">
        <div className="sticky top-0 lg:pt-24 pt-6 bg-white">
          <div className="flex gap-4 justify-between items-center w-full py-2 px-4 bg-zinc-100 rounded-lg shaodw-sm border border-zinc-100 mb-4">
            <Breadcrumbs className="font-bold">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Task</BreadcrumbItem>
            </Breadcrumbs>
            <Button onPress={onOpen} size="sm" startContent={<Plus />} className="font-bold text-sm">
              New Task
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <ViewTask />
        </div>
      </div>
      
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="text-black font-quicksand"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold">
                <Breadcrumbs>
                  <BreadcrumbItem>Home</BreadcrumbItem>
                  <BreadcrumbItem>New Task</BreadcrumbItem>
                </Breadcrumbs>
              </ModalHeader>
              <ModalBody className="space-y-2">
                <Input
                  isClearable
                  type="text"
                  variant="underlined"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  type="text"
                  variant="underlined"
                  placeholder="Description"
                  minRows={1}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className="font-bold">
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="shadow"
                  onPress={() => handleClick(onClose)}
                  isLoading={loading}
                  className="font-bold"
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
