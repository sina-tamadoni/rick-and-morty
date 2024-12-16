import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useCharacters(query) {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    // console.log(controller); //! AbortController {signal: AbortSignal}
    const signal = controller.signal;
    // console.log(signal); //! AbortSignal {aborted: false, reason: undefined, onabort: null}
    async function fetchData() {
      setisLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        // console.log(response);
        setcharacters(data.results);
        toast.success("all of data recieved successfully");
      } catch (error) {
        // console.log(error.response.data.error);
        // console.log(error.name); //! CanceledError ارورهای مرتبط با کنسل کردن ریکوئست
        // if (error.name !== "AbortError") { //! زمانی که از fetch استفاده کرده باشیم
        //   setcharacters([]);
        //   toast.error(error.response.data.error);
        // }
        //!  axios.isCancel() =====>> اگر true باشد یعنی عمل فتچ را کنسل کرده‌ایم
        if (axios.isCancel()) {
          toast.error(error.config.signal.reason);
          console.log(error);
        } else {
          setcharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setisLoading(false);
      }
    }
    // if (query.length < 3) {
    //   setcharacters([]);
    //   setselectedID(null);
    //   return;
    // }
    fetchData();
    return () => {
      controller.abort("doos dashtam");
    };
  }, [query]);
  return { isLoading, characters };
}

export default useCharacters;
