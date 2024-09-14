module bityoume::typing_hero {
    use std::ascii::String;
    use sui::dynamic_object_field::{Self as dof};
    use sui::event;

    public struct Notes has key, store {
        id: UID,
        best_result: u64,  // WPM(Words per Minute)
        winner: address,
    }

    public struct Note has key, store {
        id: UID,
        title: String,
        blob_id: String,
        owner: address,
    }

    public struct EventNoteCreated has copy, drop {
        note_id: ID,
        title: String,
        blob_id: String,
        owner: address,
    }

    public struct EventNoteDeleted has copy, drop {
        note_id: ID,
        title: String,
        blob_id: String,
        owner: address,
    }

    const ENoteAlreadyExists: u64 = 101;
    const ENotNoteOwner: u64 = 102;

    fun init(ctx: &mut TxContext) {
        let notes = Notes{
            id: object::new(ctx),
            best_result: 0,
            winner: @0x0,
        };
        transfer::share_object(notes)
    }

    public fun create_note(notes: &mut Notes, title: String, blob_id: String, ctx: &mut TxContext) {
        let note = Note {
            id: object::new(ctx),
            title,
            blob_id,
            owner: ctx.sender(),
        };

        assert!(!dof::exists_(&notes.id, title), ENoteAlreadyExists);

        event::emit(EventNoteCreated {
            note_id: object::id(&note),
            title,
            blob_id,
            owner: note.owner,
        });

        dof::add(&mut notes.id, title, note);
    }

    public fun delete_note(notes: &mut Notes, title: String, ctx: &mut TxContext) {

        let note = dof::remove(&mut notes.id, title);

        let Note {id, title, blob_id, owner} = note;

        event::emit(EventNoteDeleted {
            note_id: id.uid_to_inner(),
            title,
            blob_id,
            owner,
        });

        assert!(owner == ctx.sender(), ENotNoteOwner);

        object::delete(id)
    }

    public fun upload_my_result(notes: &mut Notes, my_result: u64, ctx: &mut TxContext) {
        if (notes.best_result < my_result) {
            notes.best_result = my_result;
            notes.winner = ctx.sender();
        }
    }
}
