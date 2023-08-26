import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ApiData } from "../../../hooks/api";
import { SET_THREADS } from "../../../stores/rootReducer";

export function UseThreads() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await ApiData.get("/threads", {
        headers: {
          Authorization: `
            Bearer ${localStorage.token}`,
        },
      });

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
  }, []);
}
