import React from 'react'
import Note from '../Note/Note'
import './NoteViewMain.css'

export default function NoteViewMain(props) {
  return (
    <section className='NoteViewMain'>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
      />
      <div className='NoteViewMain__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NoteViewMain.defaultProps = {
  note: {
    content: '',
  }
}
