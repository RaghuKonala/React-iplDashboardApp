import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    manOfTheMatch,
    secondInnings,
    umpires,
  } = latestMatchDetails
  return (
    <div className="latest-match-container">
      <h1 className="latest-match-heading">Latest Matches</h1>
      <div className="latest-match-card-container">
        <div className="latest-match-details-logo-container">
          <div className="latest-match-text-details-1">
            <p className="latest-match-team-name">{competingTeam}</p>
            <p className="match-date">{date}</p>
            <p className="match-details">{venue}</p>
            <p className="match-details">{result}</p>
          </div>
          <img
            className="latest-match-team-logo"
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
          />
        </div>
        <hr className="separator" />
        <div className="latest-match-text-details-2">
          <p className="details-label">First Innings</p>
          <p className="details-value">{firstInnings}</p>
          <p className="details-label">Second Innings</p>
          <p className="details-value">{secondInnings}</p>
          <p className="details-label">Man of the match</p>
          <p className="details-value">{manOfTheMatch}</p>
          <p className="details-label">Umpires</p>
          <p className="details-value">{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
