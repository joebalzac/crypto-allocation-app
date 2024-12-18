import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => {
      const controller = new AbortController();
      setLoading(true);
      console.log("Fetching data from:", endpoint);
      apiClient
        .get<T>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          console.log("Data fetched successfully:", res.data);
          setData(res.data); 
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, loading, error };
};

export default useData;
