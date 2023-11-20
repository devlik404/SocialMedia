import { useState, FormEvent } from "react";
import { useToast } from "@chakra-ui/react";
import { ApiData } from "../../../hooks/api";
import { IthreadPost } from "../../../interface/interfaceData";



export function usePost() {
 
  const [content, setContent] = useState<IthreadPost>({
    article: "",
    picture: null,
  });
  const toast = useToast();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
       content.article?formData.append("articel", content.article as string):"";
      
      content.picture ?formData.append("picture", content.picture as File):null;

   

      const response = await ApiData.post("/threads", formData);
    
 
      console.log("response data", response);

      // Refresh data or perform other actions as needed
    } catch (error) {
      console.log("error submitting data", error);
    }
  };

  const handleArticelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent((prevContent) => ({
      ...prevContent,
      article: e.target.value,
    }));
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContent((prevContent) => ({
        ...prevContent,
        picture: file,
      }));
    }
  };

  const handleIconButtonClick = () => {
    if (content) {
      if (content.picture || content.article) {
        toast({
          title: "postingan ditambahkan",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Gambar Kosong",
          description: "Anda belum memilih gambar.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      console.log("posting terlebih dahulu dahulu");
    }
  };

  return {
    submitHandler,
    handleArticelChange,
    handlePictureChange,
    handleIconButtonClick,
    content,
  };
}
