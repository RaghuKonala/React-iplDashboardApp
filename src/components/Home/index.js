import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsData: [], isLoading: true}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data

    const formattedData = teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamsData: formattedData, isLoading: false})
  }

  renderTeamCards = () => {
    const {teamsData} = this.state
    return (
      <ul className="team-cards-container">
        {teamsData.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderAppBody = () => (
    <div className="home-container">
      <div className="app-title-container">
        <img
          className="app-logo"
          alt="ipl logo"
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
        />
        <h1 className="app-title">IPL Dashboard</h1>
      </div>
      {this.renderTeamCards()}
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-route-container">
        {isLoading ? this.renderLoader() : this.renderAppBody()}
      </div>
    )
  }
}

export default Home
