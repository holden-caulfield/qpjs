const defaultData = {
  teams: ['Team 1', 'Team 2']
}

const defaultOptions = {
  fullResult: true,
  awayGoalsRule: true
}

const parseData = data => ({
  team1: data.teams[0],
  team2: data.teams[1],
  team1Score: data.games[0].home + data.games[1].away,
  team2Score: data.games[1].home + data.games[0].away,
  team1Away: data.games[1].away,
  team2Away: data.games[0].away
})

const analyzeLeg = (data, awayGoalsRule) => {
  const { team1, team2, team1Score, team2Score, team1Away, team2Away } = data
  let winner
  let reason

  if (team1Score === team2Score) {
    if (team1Away === team2Away || !awayGoalsRule) {
      winner = undefined
      reason = awayGoalsRule ? 'FULL_TIE' : 'TIE'
    } else {
      winner = (team1Away > team2Away) ? team1 : team2
      reason = 'AWAY_GOALS'
    }
  } else {
    winner = (team1Score > team2Score) ? team1 : team2
    reason = 'AGGREGATE'
  }

  return { winner, reason }
}

const validateData = (data) => {
  if (!(Array.isArray(data.teams) && data.teams.length === 2)) {
    throw new Error('Need to provide info for exactly two teams')
  }

  if (!data.teams.every(team => typeof team === 'string')) {
    throw new Error('Invalid team data')
  }

  if (data.games === undefined ||
      !Array.isArray(data.games)) {
    throw new Error('Missing games info')
  }

  if (data.games.length !== 2) {
    throw new Error('Need to provide info for exactly two games')
  }

  if (!data.games.every(game =>
    (
      ('home' in game) &&
      ('away' in game) &&
      Number.isInteger(game.home) &&
      Number.isInteger(game.away)
    )
  )) {
    throw new Error('Invalid games data')
  }
}

module.exports = (dataParam, optionsParam) => {
  const data = { ...defaultData, ...dataParam }
  const options = { ...defaultOptions, ...optionsParam }

  validateData(data)

  const result = analyzeLeg(parseData(data), options.awayGoalsRule)

  return (options.fullResult) ? result : result.winner
}
