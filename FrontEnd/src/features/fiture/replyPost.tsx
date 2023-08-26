import { Input, useSteps, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useReplies } from "./hooks/useReplies";

export function ReplyPost() {
  const { handleChange, postReplies, element, replies } = useReplies();

  // Fungsi untuk mendapatkan fullname dari element.users

  const getFullName = () => element?.users.fullname;

  const steps = [
    { title: getFullName(), description: element?.articel },
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  //coment focus

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return {
    handleChange,
    postReplies,
    element,
    replies,
    steps,
    activeStep,
    isOpen,
    onOpen,
    onClose,
    initialRef,
    finalRef,
  };
}
