import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400';

interface GetMetaImageResponse {
  metaImage: string;
}

const useGetMetaImage = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get<never, AxiosResponse<GetMetaImageResponse>>(
        `/api/get-meta-image?url=${url}`,
      )
      .then((res) => {
        setImageUrl(res.data.metaImage);
      })
      .catch(() => {
        setImageUrl(PLACEHOLDER_IMAGE);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { imageUrl, isLoading };
};

export default useGetMetaImage;
