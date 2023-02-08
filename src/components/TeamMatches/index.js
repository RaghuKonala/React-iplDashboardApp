import Loader from 'react-loader-spinner'
import {Component} from 'react'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatchesData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.renderTeamMatchesData()
  }

  renderTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    try {
      const formattedData = {
        teamBannerUrl: fetchedData.team_banner_url,
        latestMatchDetails: {
          id: fetchedData.latest_match_details.id,
          date: fetchedData.latest_match_details.date,
          venue: fetchedData.latest_match_details.venue,
          umpires: fetchedData.latest_match_details.umpires,
          result: fetchedData.latest_match_details.result,
          manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
          competingTeam: fetchedData.latest_match_details.competing_team,
          competingTeamLogo:
            fetchedData.latest_match_details.competing_team_logo,
          firstInnings: fetchedData.latest_match_details.first_innings,
          secondInnings: fetchedData.latest_match_details.second_innings,
          matchStatus: fetchedData.latest_match_details.match_status,
        },
        recentMatches: fetchedData.recent_matches.map(eachMatch => ({
          id: eachMatch.id,
          date: eachMatch.date,
          venue: eachMatch.venue,
          umpires: eachMatch.umpires,
          result: eachMatch.result,
          manOfTheMatch: eachMatch.man_of_the_match,
          competingTeam: eachMatch.competing_team,
          competingTeamLogo: eachMatch.competing_team_logo,
          firstInnings: eachMatch.first_innings,
          secondInnings: eachMatch.second_innings,
          matchStatus: eachMatch.match_status,
        })),
      }

      this.setState({
        teamMatchesData: formattedData,
        isLoading: false,
      })
    } catch (error) {
      console.log(fetchedData.error_message)
    }
  }

  renderMatchCard = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData
    return (
      <ul className="recent-matches-container">
        {recentMatches.map(eachMatch => (
          <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamMatchesData
    return (
      <div className="team-matches-container">
        <img className="banner-image" src={teamBannerUrl} alt="team banner" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {this.renderMatchCard()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getRouteBackground = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'sh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state

    const teamMatchesClass = `team-matches-route-container ${this.getRouteBackground()}`
    return (
      <div className={teamMatchesClass}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
