import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
// import { Users } from './components/Users'
import { DisplayBoard } from './components/DisplayBoard'
// import { CreateUser } from './components/CreateUser'
import { getAllUsers, createUser } from './services/UserService'
import { getProgramList } from './services/FileService'
import { sendProgram } from './services/TransferService'
import { ProgramList } from './components/ProgramList'
//import Paperbase from './theme/Paperbase';


class App extends Component {

  state = {
    user: {},
    users: [],
    numberOfUsers: 0,
    files: []
  }

  createUser = (e) => {
      createUser(this.state.user)
        .then(response => {
          console.log(response);
          this.setState({numberOfUsers: this.state.numberOfUsers + 1})
      });
  }

  getAllUsers = () => {
    getAllUsers()
      .then(users => {
        console.log(users)
        this.setState({users: users, numberOfUsers: users.length})
      });
  }

  getProgramList = () => {
    getProgramList()
      .then(files => {
        //console.log(files)
        
        console.log('length: ' + files.length)
        this.setState({files: files})
      });
  } 

  sendProgram = (e) => {
    sendProgram(e).then(resp => {
      console.log('Result: ' + resp)
    });
  }

  onChangeForm = (e) => {
      let user = this.state.user
      if (e.target.name === 'firstname') {
          user.firstName = e.target.value;
      } else if (e.target.name === 'lastname') {
          user.lastName = e.target.value;
      } else if (e.target.name === 'email') {
          user.email = e.target.value;
      }
      this.setState({user})
  }

  render() {
    
    return (
      <div className="App">
        <Header></Header>
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
                {/* <CreateUser 
                  user={this.state.user}
                  onChangeForm={this.onChangeForm}
                  createUser={this.createUser}
                  >
                </CreateUser> */}
            </div>
            <div className="col-md-4">
                <DisplayBoard
                  getProgramList={this.getProgramList}
                >
                </DisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">
          {/* <Users users={this.state.users}></Users> */}
          <ProgramList
                  files={this.state.files}
                  sendProgram={this.sendProgram}
                >                  
                </ProgramList>
        </div>
      </div>
    );
  }
}

export default App;
