import { Input, useSteps, useDisclosure } from "@chakra-ui/react";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { ApiData } from "../../hooks/api";
import { ThreadsCards, IReplies } from "../../interface/interfaceData";

export function Replythreads() {
  const [selectedThread, setSelectedThread] = useState<ThreadsCards | null>(
    null
  );

  const [form, setform] = useState<IReplies>({
    articel: "",
    thread_id: 0,
  });

  async function postReplies(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      await ApiData.post("/reply", form);
    } catch (error) {
      console.log("gagal menambahkan reply", error);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setform({
      ...form,
      [name]: value,
    });
  }
  //Threads home replies
  const getFullName = () => selectedThread?.users.fullname;
  const steps = [
    { title: getFullName(), description: selectedThread?.articel },
    {
      title: "Your Replies:",
      description: (
        <Input variant="flushed" name="articel" onChange={handleChange} />
      ),
    },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  //coment focus

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (thread: ThreadsCards) => {
    setSelectedThread(thread);
    setform({
      ...form,
      thread_id: thread.id,
    });
    onOpen();
  };

  return {
    selectedThread,
    postReplies,
    handleChange,
    steps,
    activeStep,
    initialRef,
    finalRef,
    isOpen,
    onOpen,
    onClose,
    handleOpen,
  };
}
