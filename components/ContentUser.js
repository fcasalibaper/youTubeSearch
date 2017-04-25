// Libs
import React from 'react';

const API = 'https://api.github.com/users/';

export default class ContentUser extends React.Component {
  // default States
  constructor(props) {
    super(props);

    this.state = {
      username         : 'fcasalibaper',
      location         : '',
      name             : '',
      repositorios     : '',
      seguidores       : '',
      siguiendo        : '',
      url              : '',
      email            : '',
      imageProfile     : ''
    };

    this.changeUser = this.changeUser.bind(this);
  }

  // change User state
  changeUser(username) {
    this.setState({username})
  }

  // funcion llamada API
  dataSource(username) {
    let userUrl = API + username;

    fetch(userUrl)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({
        username        : data.login,
        location        : data.location,
        name            : data.name,
        repositorios    : data.public_repos,
        seguidores      : data.followers,
        siguiendo       : data.following,
        url             : data.html_url,
        email           : data.email,
        imageProfile    : data.avatar_url
      })
    })
  }

  // Monta la funcion antes de inicar el render()
  componentWillMount() {
    this.dataSource(this.state.username);
  }

  render() {
    return (

      <div className="app__profile">

        <Searchbox  changeUser={this.changeUser}
                    username={this.state.username}
                    dataSource={this.dataSource.bind(this)}/>



        <div className="app__profile__content">
          <hgroup className="app__title">
            <h3>Github profile</h3>
          </hgroup>

          <figure className="app__images">
            <aside className="app__bg"></aside>
            <picture className="app__profilePic">
              <img src={this.state.imageProfile} />
            </picture>
          </figure>

          <header className="app__name">
            <h1>
              {this.state.name}
              <small>
                {this.state.location}
              </small>
              <a  href={'mailto:'+this.state.email}
                  target="_self">{this.state.email}
              </a>
            </h1>
            <a  className="btn" href={this.state.url}
                target="_blank"><span>Profile</span>
            </a>
          </header>

          <ul className="app__data">
            <li className="app__data__features">
              <a  href={this.state.url+'?tab=followers'}
                  target="_blank">
                {this.state.seguidores}
                <span>Seguidores</span>
              </a>
            </li>
            <li className="app__data__features">
              <a  href={this.state.url+'?tab=repositories'}
                  target="_blank">
                {this.state.repositorios}
                <span>Repositorios</span>
              </a>

            </li>
            <li className="app__data__features">
              <a  href={this.state.url+'?tab=following'}
                  target="_blank">
                {this.state.siguiendo}
                <span>Siguiendo</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
