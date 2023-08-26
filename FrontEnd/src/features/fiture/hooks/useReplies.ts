import { useState, FormEvent, ChangeEvent, useEffect } from "react";

import { ApiData } from "../../../hooks/api";
import { IReplies, IReply, ThreadsCards} from "../../../interface/interfaceData";
import { useParams } from "react-router-dom";

export function useReplies() {
  const { id } = useParams();

  const [Threads, setThreads] = useState<ThreadsCards[]>([]);
  const [replies, setReplies] = useState<IReply[]>([]);


  const [form,setform] = useState<IReplies>({
    articel:"",
    thread_id:Number(id),
  });

  async function postReplies(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      const response =await ApiData.post("/reply",form);
      console.log("berhasil menambahkan reply:",response.data)
      getReplies();
    } catch (error) {
      console.log("gagal menambahkan reply",error)
    }
  }

  function handleChange(event:ChangeEvent<HTMLInputElement>){
    const{name,value} =event.target;
    setform({
      ...form,
      [name]:value,
    });
  }

async function getReplies() {
  try {
    const response = await ApiData.get(`/replies/?thread_id=${id}`);
    setReplies(response.data)

  } catch (error) {
    console.log("gagal replies by id",error)
  }
}

  const fetchData = async () => {
    try {
      const response = await ApiData.get("/threads");
      setThreads(response.data);
    } catch (error) {
      console.info(error);
    }
  };


  useEffect(() => {
    fetchData();
    getReplies();
  }, []);

  const element = Threads.find((el) => el.id === Number(id));



  return {
    Threads,
    replies,
    form,
    handleChange,
    postReplies,
    element
  };
}
