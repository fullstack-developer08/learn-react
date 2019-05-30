import React, { Component } from 'react';
import firebase from 'firebase';

const INITIAL_STATE = {
    noteForm: {
        title: '',
        note: ''
    },
    error: '',
    success: ''
};

class NotesForm extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onChangeHandler = (evt, key) => {
        const value = evt.target.value;
        this.setState((prevState) => ({
            noteForm: {
                ...prevState.noteForm,
                [key]: value
            }
        })
        )
    }

    createNote = () => {
        if (this.state.noteForm.title && this.state.noteForm.note) {
            let res = firebase.database().ref('notes').push({
                title: this.state.noteForm.title,
                note: this.state.noteForm.note
            }).then((res) => {
                this.setState(INITIAL_STATE);
                this.setState({success: 'Note added successfully!'});
            });
            setTimeout(() => {this.setState({success: ''})}, 3000)
        } else if (this.state.noteForm.title === '') {
            this.setState({
                error: 'title field can not be empty'
            });
        } else if (this.state.noteForm.note === '') {
            this.setState({
                error: 'note field can not be empty'
            });
        }
    }

    render() {
        let error = null;
        let success = null;
        if(this.state.error !== '') {
            error = <div className="alert alert-danger">{this.state.error}</div>;
        }
        if(this.state.success !== '') {
            success = <div className="alert alert-success">{this.state.success}</div>;
        }
        return (
            <div className="container border mT20 p15">
                {error}
                {success}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="Title for notes"
                        placeholder="Enter Title"
                        value={this.state.noteForm.title ? this.state.noteForm.title : ''}
                        onChange={(event) => this.onChangeHandler(event, 'title')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="note">Note</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="note"
                        aria-describedby="Note"
                        placeholder="Enter Note"
                        value={this.state.noteForm.note ? this.state.noteForm.note : ''}
                        onChange={(event) => this.onChangeHandler(event, 'note')}
                    />
                </div>
                <button className="btn btn-success" onClick={this.createNote}>Create Note</button>
            </div>
        )
    }
}

export default NotesForm;