import { CONSTANTS } from "@/constants/constants";
import { useGetObject } from "@/hooks/useGetObject";
import { Box, Card, Text, Flex } from "@radix-ui/themes";

export const BestResult = () => {
  const { data: notesObject } = useGetObject({
    objectId: CONSTANTS.TYPING_HERO_CONTRACT.NOTES_OBJECT_ID,
  });

  const best_result =
    notesObject?.data?.content?.dataType === "moveObject"
      ? (notesObject.data.content.fields as any).best_result
      : "unknown best_result";

  const winner =
    notesObject?.data?.content?.dataType === "moveObject"
      ? (notesObject.data.content.fields as any).winner
      : "unknown winner";

  return (
    <Box className="w-full py-2 text-red-500">
      <Card>
        <Flex gap="3" align="center">
          <Box>
            <span>Best Score: </span>
            <Text as="span" weight="bold">
              {best_result} WPM (Words per Minute)
            </Text>
            <br />
            <span>Record Creator: </span>
            <Text as="span" weight="bold">
              {winner}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};
