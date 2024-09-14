import { getData } from "@/utils/walrusService";
import { useEffect, useState } from "react";

export function useGetNote(
  blob_id: string,
  onContentFetched: (content: string) => void,
) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await getData(blob_id);
        if (content === null) {
          console.error(`${blob_id} not found`);
        }

        setContent(content);
        onContentFetched(content);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (blob_id) {
      fetchData();
    } else {
      setContent("");
      onContentFetched("");
    }
  }, [blob_id, onContentFetched]);

  return content;
}
