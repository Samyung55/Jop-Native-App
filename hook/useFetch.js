import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`https://remote-jobs-api.p.rapidapi.com/${endpoint}`, {
          params: { ...query },
          headers: {
            'X-RapidAPI-Key': '7b63a42ed4msha215d4e2fb17099p17ae62jsn0f42bd187691',
            'X-RapidAPI-Host': 'remote-jobs-api.p.rapidapi.com'
          }
        });

        if (isMounted) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setIsLoading(false);
        }
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, query]);

  const refetch = () => {
    setIsLoading(true);
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
