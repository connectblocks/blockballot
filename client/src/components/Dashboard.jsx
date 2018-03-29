import React from 'react';
import Poll from './Poll.jsx';
import axios from 'axios';
import { Link, Route, Redirect } from 'react-router-dom';
import {
  Card,
  Button,
  Container,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import cookie from 'react-cookie';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: samplePolls,
      currentPoll: {},
      loggedIn: false,
      currentUser: '',
    };
    this.retrieveOrgPolls = this.retrieveOrgPolls.bind(this);
  }

  componentDidMount() {
    this.retrieveOrgPolls();
    this.timer = setInterval(this.retrieveOrgPolls, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updatePoll(res) {
    this.setState({
      polls: res.data,
    });
  }

  retrieveOrgPolls() {
    axios.get('/polls')
    .then(polls => {
      this.updatePoll(polls);
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const polls = this.state.polls;
    if (cookie.load('loggedIn') !== 'true') {
      return (<Redirect to='/' />)
    } 
    return (
      <div>

        <div>
          <h2 style={{ marginLeft: 50, marginTop: 50 }}>Polls</h2>
          <Link to="/createpoll">
            <button
              style={{ marginLeft: 50 }}
              className="ui button"
            >
              Create Poll
            </button>
          </Link>
        </div>


        <div style={{ marginLeft: 50, marginRight: 50, marginTop: 50 }}>
          <div className="ui four link cards">

            {polls.map(poll =>
              (<Poll
              poll={poll}
              handlePollClick = {this.props.handlePollClick}
              />),)}

          </div>
        </div>
      </div>
    );
  }
}


const samplePolls = [
  {
    pollName: 'Election for Board of Trustees',
    date: '5/13/18',
    voteCount: 127,
    options: [{ red: 20 }, { blue: 48 }, { green: 40 }, { purple: 19 }],
  },
  {
    pollName: 'Poll 2',
    date: '5/12/18',
    voteCount: 30,
  },
  {
    pollName: 'Poll 3',
    date: '4/12/18',
    voteCount: 40,
  },
  {
    pollName: 'Poll 4',
    date: '3/11/18',
    voteCount: 38,
  },
  {
    pollName: 'Poll 5',
    date: '3/5/18',
    voteCount: 61,
  },
  {
    pollName: 'Poll 6',
    date: '2/14/18',
    voteCount: 52,
  },
  {
    pollName: 'Poll 5',
    date: '3/5/18',
    voteCount: 61,
  },
  {
    pollName: 'Poll 6',
    date: '2/14/18',
    voteCount: 52,
  },
  {
    pollName: 'Poll 5',
    date: '3/5/18',
    voteCount: 61,
  },
  {
    pollName: 'Poll 6',
    date: '2/14/18',
    voteCount: 52,
  },
  {
    pollName: 'Poll 5',
    date: '3/5/18',
    voteCount: 61,
  },
  {
    pollName: 'Poll 6',
    date: '2/14/18',
    voteCount: 52,
  },
];


export default Dashboard;
