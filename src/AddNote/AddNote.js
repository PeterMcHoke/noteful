import React from 'react';
import NoteContext from '../NoteContext'
import './AddNote.css'
import cfg from '../config';
//import ValidationError from './ValidationError';

function addNoteAPI(note) {
    return fetch(`${cfg.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(note)
    }).then(r => r.json())
}

export default class AddNote extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      noteName: {
        value: '',
        touched: false
    },
        content: {
            value: '',
            touched: false,
        },
        folderId: {
            value: '',
            touched: false
        }
      }
    }

    static contextType = NoteContext;

    updateName(name) {
        this.setState({noteName: {value: name, touched: true}});
    }

    updateContent(content) {
        this.setState({content: {value: content, touched: true}});
    }

    updateFolder(folderId) {
        this.setState({folderId: {value: folderId, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const { noteName, folderId, content } = this.state;
        const note = {
            name: noteName.value, folderId: folderId.value, content: content.value, modified: new Date()
        }
        addNoteAPI(note).then((note) => {
           this.context.addNote(note);
           this.props.history.push('/');
        });
    }

    validateName() {
        const name = this.state.noteName.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
    }


    render() {
        return (
             <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
               <h2>Add Note</h2>
 {//               <div className="addNote__hint">* required field</div>
}               <div className="form-group">
                <div className="input-group">
                     <label htmlFor="name" className="addNote__label">Name </label><br />
                     <input type="text" className="addNote__control"
                       name="name" id="name" onChange={e => this.updateName(e.currentTarget.value)} value={this.state.noteName.value}/>
                      <br />
                </div>
                 <div className="input-group">
                     <label htmlFor="content" className="addNote__label">Content </label><br />
                     <textarea className="addNote__control"
                       name="content" id="content" onChange={e => this.updateContent(e.currentTarget.value)} style={{margin:"10px 0 0 0"}}>
                       {this.state.content.value}
                      </textarea>
                      <br />
                </div>
                <div className="input-group">
                  <label htmlFor="folderId" className="addNote__label"> Folder </label><br />
                  <select id="folderId" name="folderId" onChange={e =>  this.updateFolder(e.currentTarget.value) } value={this.state.folderId.value}>
                      <option value="">-</option>
                      {this.context.folders.map(f => <option value={f.id}>{f.name}</option>)}
                  </select>
                </div>
               </div>
               <div className="registration__button__group">
                <button type="reset" className="registration__button" onClick={() => this.props.history.goBack()}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="registration__button"
                    disabled= {
                        this.validateName()
                    }
                    >
                    Save
                </button>
               </div>
             </form>
         )
    }
}
