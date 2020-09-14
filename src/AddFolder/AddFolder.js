import React from 'react';
import NoteContext from '../NoteContext'
import './AddFolder.css'
import cfg from '../config.js'
//import ValidationError from './ValidationError';


function addFolderAPI(folder) {
    return fetch(`${cfg.API_ENDPOINT}/folders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(folder)
    }).then(r => r.json())
}

function deleteFolderAPI(folderID) {
    return fetch(`${cfg.API_ENDPOINT}/folders/${folderID}`,{
        method: 'DELETE'
        }
    ).then(r => r.json())
}

export default class AddFolder extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: '',
        touched: false
        }
      }
    }

    static contextType = NoteContext;

    updateName(name) {
        this.setState({folderName: {value: name, touched: true}});
    }


    handleSubmit(event) {
        event.preventDefault();
        const { folderName } = this.state;
        addFolderAPI({name: folderName.value}).then(folder => {
            console.log(folder);
            this.context.addFolder(folder);
            this.props.history.push('/');
        })
    }

    validateName() {
        const name = this.state.folderName.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
    }


    render() {
        return (
             <form className="addFolder" onSubmit={e => this.handleSubmit(e)}>
               <h2 className="AddFolder_header">Create A New Folder</h2>
               <div className="form-group">
                    { this.state.folderName.touched && <h4 style={{color:"#e37400"}}> {this.validateName() }</h4>}
                 <label htmlFor="name">Name </label>
                 <input type="text" className="addFolder__control"
                   name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
               </div>
               <div className="registration__button__group">
                <button type="reset" className="registration__button" id="cancel" onClick={ () => this.props.history.goBack()}>
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
