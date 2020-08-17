import React from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NoteListMain from '../NoteListMain/NoteListMain'
import NoteViewNav from '../NoteViewNav/NoteViewNav';
import NoteViewMain from '../NoteViewMain/NoteViewMain';
import dummyStore from '../dummy-store';
import {getNotesForFolder, findNote, findFolder} from '../note-helpers.js';
import './App.css'

class App extends React.Component {
    state = {
        notes: [],
        folders: []
    };

  componentDidMount() {
      setTimeout(() => this.setState(dummyStore), 300);
  }

  renderNav() {
      const { notes, folders } = this.state;
      const folderViewPath = ['/', '/folder/:folderId'];

    return (
            <>
                <header className="AppHeader">
                  <h1> <Link to="/"> Noteful </Link></h1>
                </header>
                {folderViewPath.map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NoteViewNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NoteViewNav} />
                <Route path="/add-note" component={NoteViewNav} />
            </>
        );
    }

    renderMain() {
        const folderViewPath = ['/', '/folder/:folderId'];
        const { notes } = this.state;

        return (
            <>
            {folderViewPath.map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NoteViewMain {...routeProps} note={note} />;
                    }}
                />
            </>
        )


    }

  render() {
    return (
        <div className="App">
            <nav className="AppNav"> {this.renderNav()} </nav>
            <main className="AppMain"> {this.renderMain()} </main>
        </div>
    )
  }

};

export default App;
