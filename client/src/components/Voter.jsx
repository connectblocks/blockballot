import React from 'react';
import axios from 'axios';
import PasswordInput from 'grommet/components/PasswordInput';
import VoterVote from './VoterVote.jsx'
import VoterResult from './VoterResult.jsx'

class Voter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId: '',
      isLogin: false,
      isVoteSubmitted: false,
      isBallotCompleted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({
        uniqueId: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'POST',
      url: '/api/Voter',
      data: {
        uniqueId: this.state.uniqueId
      }
    }) 
    .then(function (res) {
      console.log('found unique ID', res);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    if(this.state.isLogin) {
      if(this.state.isBallotCompleted) {
        return (
          <div>ballot result visual</div>
        )
      } else {
        if(this.state.isVoteSubmitted) {
          return (
            <VoterResult />
          )
        } else {
          return (
            <VoterVote />
          )
        }
      }
    } else {
      return (
        <form>
            <label>
            <div>ENTER YOUR UNIQUE CODE</div>
            <input type="password" name="uniqueId" value={this.state.uniqueId} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
      )
    }
  }
}
module.exports = Voter;