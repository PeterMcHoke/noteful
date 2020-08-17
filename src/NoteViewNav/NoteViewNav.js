import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NoteViewNav.css'

export default function NoteViewNav(props) {
  return (
    <div className='NoteViewNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NoteViewNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {props.folder && (
        <h3 className='NoteViewNav__folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

NoteViewNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
