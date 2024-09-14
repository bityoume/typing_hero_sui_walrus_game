import { DynamicFieldPage } from "@mysten/sui/client";
import { NoteItem } from "./NoteItem";

export interface NotesListProps {
  dynamic_field_page: DynamicFieldPage;
}

export const NotesList = ({ dynamic_field_page }: NotesListProps) => {
  return (
    <div>
      {dynamic_field_page.data.map((note) => (
        <NoteItem key={note.objectId} dynamic_field_name={note.name} />
      ))}
    </div>
  );
};
