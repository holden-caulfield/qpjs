const defaultData = {
  teams: ['Team 1', 'Team 2']
}

const defaultOptions = {
  fullResult: true,
  awayGoalsRule: true
}

const parseData = (data) => ({
  team1: data.teams[0],
  team2: data.teams[1],
  team1Score: data.games[0].home + data.games[1].away,
  team2Score: data.games[1].home + data.games[0].away,
  team1Away: data.games[1].away,
  team2Away: data.games[0].away
})

const analyzeLeg = (data, awayGoalsRule) => {
  const { team1, team2, team1Score, team2Score, team1Away, team2Away } = data
  let winner, reason

  if (team1Score === team2Score) {
    if (team1Away === team2Away || !awayGoalsRule) {
      winner = false
      reason = awayGoalsRule ? 'FULL_TIE' : 'TIE'
    } else {
      winner = (team1Away > team2Away) ? team1 : team2,
      reason = 'AWAY_GOALS'
    }
  } else {
    winner = (team1Score > team2Score) ? team1 : team2
    reason = 'AGGREGATE'
  }

  return { winner, reason }
}

module.exports = (dataParam, optionsParam) => {
    const data = {...defaultData, ...dataParam}
    const options = {...defaultOptions, ...optionsParam}

    const result = analyzeLeg(parseData(data), options.awayGoalsRule)

    return (options.fullResult) ? result : result.winner
}
