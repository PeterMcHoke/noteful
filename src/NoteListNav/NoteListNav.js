import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './NoteListNav.css'
import CircleButton from '../CircleButton/CircleButton'
import NoteContext from '../NoteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { countNotesForFolder } from '../note-helpers';
import cfg from '../config'

function deleteFolderAPI(folderId) {
{
    //const notes = this.context.notes.filter(n => n.folderId === folderId)
}
    return fetch(`${cfg.API_ENDPOINT}/folders/${folderId}`, {
        method: 'DELETE',
    })
}
{
//
// function deleteFolderAPI(id).then(
//   const notes = this.context.notes.filter(n => n.folderId === id);
//   () => {
//     this.context.deleteFolder(id);
//     return Promise.all(
//       notes.map(
//         n => deleteNoteAPI(n.id)
//       );
//     );
//   }).then(
//     () => notes.forEach(n => this.context.deleteNote(n.id)
//   );
}


export default class NoteListNav extends React.Component {
    static contextType = NoteContext;

    handleClickDelete = id => {
        deleteFolderAPI(id).then( () => this.context.deleteFolder(id) );
    }

    render() {
        const { folders=[], notes=[] } = this.context;
      return (

            <div className='NoteListNav'>
              <ul className='NoteListNav__list'>
                {folders.map(folder =>
                  <li key={folder.id}>
                    <NavLink
                      className='NoteListNav__folder-link'
                      to={`/folder/${folder.id}`}
                    >
                      <span className='NoteListNav__num-notes'>
                        {countNotesForFolder(notes, folder.id)}
                      </span>
                      {folder.name}
                    </NavLink>
                  </li>
                )}
              </ul>
              <div className='NoteListNav__button-wrapper'>
                <CircleButton
                  tag={Link}
                  to='/add-folder'
                  type='button'
                  className='NoteListNav__add-folder-button'
                  aria-label="Add-Folder"
                >
                  <FontAwesomeIcon icon='fa-plus' />
                  <br />
                  Add Folder
                </CircleButton>
              </div>
            </div>
        )
    }
}
