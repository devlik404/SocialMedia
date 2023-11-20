import { useState, FormEvent, ChangeEvent, useEffect } from "react";

import { ApiData } from "../../../hooks/api";
import { IReplies, IReply} from "../../../interface/interfaceData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/types/rootState";
import { SET_THREADS } from "../../../stores/rootReducer";

export function useReplies() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threads = useSelector((state:RootState)=>state.thread.threads);
  const [replies, setReplies] = useState<IReply[]>([]);


  const [form,setform] = useState<IReplies>({
    articel:"",
    thread_id:Number(id),
  });

  async function postReplies(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
     await ApiData.post("/reply",form);
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
      dispatch(
        SET_THREADS({
          thread: response.data,
        })
      );
    } catch (error) {
      console.info(error);
    }
  };


  useEffect(() => {
    fetchData();
    getReplies();
  }, []);

  const element = threads.find((el) => el.id === Number(id));



  return {
    threads,
    replies,
    form,
    handleChange,
    postReplies,
    element
  };
}
