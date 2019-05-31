import React, { Component } from 'react';
import axios from 'axios';

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureURL: '',
    };
  }

  handleInput(e) {
    this.setState({ treasureURL: e.target.value });
  }

  async addTreasure() {
    // post to /api/treasure/user here
    const response = await axios.post("/api/treasure/user",{image_url: this.state.treasureURL}).catch(error => alert(error.response.request.response))
    console.log(response);
    this.props.addMyTreasure(response.data);
    this.setState({ treasureURL: '' })
  }

  render() {
    return (
      <div className="addTreasure">
        <input
          type="text"
          placeholder="Add image URL"
          onChange={e => this.handleInput(e)}
          value={this.state.treasureURL}
        />
        <button onClick={() => this.addTreasure()}>Add</button>
      </div>
    );
  }
}
