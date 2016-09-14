import { expect } from 'chai'
import qp from '../src'

describe('qpjs', () => {
  it('declares winner the team with most aggregate goals', () => {
    const data = {
      teams: ['foo', 'bar'],
      games: [{home: 2, away: 1}, {home: 1, away: 1}]
    }
    const expected = { winner: 'foo', reason: 'AGGREGATE' }
    expect(qp(data)).to.deep.equal(expected)
  }),
  it('considers away goals in case of a tie in aggregate score', () => {
    const data = {
      teams: ['foo', 'bar'],
      games: [{home: 2, away: 1}, {home: 3, away: 2}]
    }
    const expected = { winner: 'foo', reason: 'AWAY_GOALS' }
    expect(qp(data)).to.deep.equal(expected)
  }),
  it('declares a tie if both aggregate and away goals are equal', () => {
    const data = {
      teams: ['foo', 'bar'],
      games: [{home: 2, away: 1}, {home: 2, away: 1}]
    }
    const expected = { winner: false, reason: 'FULL_TIE' }
    expect(qp(data)).to.deep.equal(expected)
  }),
  it('accepts option to return scalar result', () => {
    const data = {
      teams: ['foo', 'bar'],
      games: [{home: 2, away: 3}, {home: 4, away: 2}]
    }
    const options = { fullResult: false }
    expect(qp(data, options)).to.equal('bar')
  }),
  it('defaults team names if not given', () => {
    const data1 = {
      games: [{home: 3, away: 1}, {home: 2, away: 1}]
    }
    const data2 = {
      games: [{home: 3, away: 3}, {home: 2, away: 1}]
    }
    const options = { fullResult: false }
    expect(qp(data1, options)).to.equal("Team 1")
    expect(qp(data2, options)).to.equal("Team 2")
  }),
  it('accepts an option to ignore away goals rule', () => {
    const data = {
      teams: ['foo', 'bar'],
      games: [{home: 2, away: 1}, {home: 3, away: 2}]
    }
    const options = { awayGoalsRule: false }
    const expected = { winner: false, reason: 'TIE' }
    expect(qp(data, options)).to.deep.equal(expected)
  })
})
