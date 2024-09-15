import { CONSTANTS } from "@/constants/constants";
import { useGetNote } from "@/hooks/useGetNote";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { DynamicFieldName } from "@mysten/sui/client";
import {
  Box,
  Card,
  Text,
  Flex,
  HoverCard,
  Strong,
  Button,
} from "@radix-ui/themes";
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDeleteNote } from "@/mutations/notes";

interface NoteID {
  id: string;
}

export interface Note {
  blob_id: string;
  id: NoteID;
  owner: string;
  title: string;
}

interface NoteItemProps {
  dynamic_field_name: DynamicFieldName;
}

export const NoteItem = ({ dynamic_field_name }: NoteItemProps) => {
  const account = useCurrentAccount();
  const { data } = useSuiClientQuery(
    "getDynamicFieldObject",
    {
      parentId: CONSTANTS.TYPING_HERO_CONTRACT.NOTES_OBJECT_ID,
      name: {
        type: dynamic_field_name.type,
        value: dynamic_field_name.value,
      },
    },
    {
      enabled: !!account,
    },
  );

  const [content, setContent] = useState<string | null>("");
  const blob_id =
    data?.data?.content?.dataType === "moveObject"
      ? (data.data.content.fields as any).blob_id
      : "unknown blob_id";

  const title =
    data?.data?.content?.dataType === "moveObject"
      ? (data.data.content.fields as any).title
      : "unknown title";

  const owner =
    data?.data?.content?.dataType === "moveObject"
      ? (data.data.content.fields as any).owner
      : "unknown owner";

  const handleContentFetched = useCallback((fetchedContent: string | null) => {
    setContent(fetchedContent);
  }, []);

  useGetNote(blob_id, handleContentFetched);

  const { mutate: deleteNoteMutation } = useDeleteNote();

  const handleDelete = () => {
    deleteNoteMutation(title);
  };

  return (
    <Box className="w-full py-2">
      <Card>
        <Flex gap="3" align="center">
          <Box>
            <Text as="div" weight="bold">
              {title}
            </Text>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <NavLink
                  to={`/typing/${blob_id}`}
                  onMouseEnter={() => useGetNote(blob_id, handleContentFetched)}
                >
                  Blob ID: <Strong>{blob_id}</Strong>
                </NavLink>
              </HoverCard.Trigger>
              <HoverCard.Content size="3" maxWidth="500px">
                <Text as="div" size="3" trim="both">
                  {content}
                </Text>
              </HoverCard.Content>
            </HoverCard.Root>
            <Box>
              {account?.address === owner && (
                <Button onClick={handleDelete}>delete</Button>
              )}
            </Box>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};
