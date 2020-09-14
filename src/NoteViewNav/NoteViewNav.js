import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NoteContext from '../NoteContext';
import './NoteViewNav.css';
import {findNote, findFolder} from '../note-helpers.js';

export default class NotePageNav extends React.Component {
    static contextType = NoteContext;
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    render() {
        const { notes, folders } = this.context;
        const { noteId } = this.props.match.params;
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
      return (
        <div className='NoteViewNav'>
            <CircleButton
                tag='button'
                role='link'
                onClick={() => this.props.history.goBack()}
                className='NoteViewNav__back-button'
            >
            <br />
            Back
          </CircleButton>
          {folder && (
            <h3 className='NoteViewNav__folder-name'>
              {folder.name}
            </h3>
          )}
        </div>
      )
}
}
