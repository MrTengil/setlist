import React, { FC } from 'react';
import { View } from '../native';
import { ActionButton } from './ActionButton';

// Import to get the animation
import './NoteLayout.scss';

// import { Note, ToneSequence } from "../sound/SoundSetup";
import { playSingleNote } from '../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import { SongId, StoreState } from '../state/types';
import { updateNote, deleteNote } from '../state/actions';

interface Props {
  edit: boolean;
  notes: string[];
  songId: SongId;
}
// Skapa style här
const noteLayoutStyle = {
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'center',
  width: '100%',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '15vh 0px',
  maxHeight: '100vh',
  height: '65vh',
  position: 'fixed',
  top: '0',
  left: '0',
  alignContent: 'center',
};
export const NoteLayout: FC<Props> = ({ edit, notes, songId }) => {
  const noteDuration = useSelector(
    (state: StoreState) => state.playingNote.duration
  );
  const playingNote = useSelector(
    (state: StoreState) => state.playingNote.note
  );

  const dispatch = useDispatch();

  const handleNoteClick = (note: string, index: number) => {
    if (!edit) {
      dispatch(playSingleNote(note));
      return;
    }
    const newNote = prompt(
      'What do you want to change the note to? Remove text to delete the note.',
      note
    );
    if (newNote === null) {
      return;
    }
    newNote
      ? dispatch(updateNote(newNote, index, songId))
      : dispatch(deleteNote(index, songId));
  };
  return (
    <View className="wrapper">
      {edit && (
        <p
          style={{
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            maxWidth: '100%',
            opacity: 0.6,
          }}
        >
          Click on the notes to edit them
        </p>
      )}
      <View style={noteLayoutStyle}>
        {notes.map((note, i) => (
          <ActionButton
            key={`${note}-${i}`}
            style={{
              animationDuration: `${noteDuration}s`,
              margin: '5px 5%',
            }}
            className={playingNote === note ? 'invertAnim' : ''}
            size="lg"
            onClick={() => handleNoteClick(note, i)}
            disableAnimation
          >
            {note}
          </ActionButton>
        ))}
      </View>
      {/* <View className="actionWrapper">
        <ActionButton
          icon={edit ? "plus" : "play"}
          inverted
          size="lg"
          onClick={handleClick}
        />
      </View> */}
    </View>
  );
};
