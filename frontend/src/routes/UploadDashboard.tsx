import { BestResult } from "@/components/BestResult";
import { NotesList } from "@/components/NoteList";
import { useGetNoteObjects } from "@/hooks/useGetNoteObjects";
import { useCreateNote } from "@/mutations/notes";
import {
  Button,
  ScrollArea,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export const UploadDashboard = () => {
  const { mutate: notesMutation, isPending } = useCreateNote();
  const noteObjects = useGetNoteObjects();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const updateInputValidity = () => {
    setIsInputValid(title.trim() !== "" && content.trim() !== "");
  };

  const handleUpload = () => {
    notesMutation({ title, content });

    setTitle("");
    setContent("");
  };

  return (
    <>
      <div className="w-full flex flex-col space-y-2">
        <div className="flex items-center space-x-6">
          <h1 className="text-lg font-bold text-blue-500 text-right pr-8">
            Title:
          </h1>
          <TextField.Root
            className="w-full"
            placeholder="add english title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value), updateInputValidity();
            }}
          />
        </div>
        <div className="flex items-center space-x-8">
          <h1 className="text-lg font-bold text-blue-500 text-right">
            Content:
          </h1>

          <ScrollArea type="always" scrollbars="vertical">
            <TextArea
              size="3"
              resize="both"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="add english content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                updateInputValidity();
              }}
            />
          </ScrollArea>
        </div>

        <Button
          className="cursor-pointer"
          disabled={isPending || !isInputValid}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>

      <BestResult />

      <Text weight="bold" size={"5"}>
        <span>Uploaded Articles:</span>
      </Text>

      {noteObjects && <NotesList dynamic_field_page={noteObjects} />}
    </>
  );
};
