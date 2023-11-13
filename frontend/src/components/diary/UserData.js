import React from 'react';
import rectangle from "../../img/rectangle.png";

class UserData extends React.Component {

  render() {
    return (
        <div className="diary-container-icon-name-user">
            <img className="diary-icon-user" src={rectangle} alt="foto1" />
            <p className="diary-name-user">{this.props.profile['username']}</p>
        </div>
    )
  }
}

export default UserData;