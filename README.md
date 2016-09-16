# qpjs
Quien Pasa? - JS. A very silly library to tell who wins on two-legged knockout series

## Why doing this?

Short answer: just for fun.

Long answer: at [SCV](www.scvsoft.com) we love _fútbol_. We were having arguments
on a [Copa Libertadores](https://en.wikipedia.org/wiki/Copa_Sudamericana) knockout
leg about who will pass to the next stage considering the slightly convoluted
system they have. One of us mentioned it would be nice to have an app for it.
So this library would be useful for that.

Another (and maybe slightly more important) reason was this was a good excuse to
do a super simple example on how to publish an npm module with all the niceties
for a good dev environment (ES6, tests, linter)

## Installation

```
npm install qpjs
```

## Usage

```javascript
var qp = require('qpjs');

data = {
  teams: ['Blues', 'Reds'],
  games: [
    { home: 2, away: 1 }
    { home: 3, away: 2 }
  ]
};

options = {
  fullResult: false,
  awayGoalsRule: true
}

result = qp(data, options);
console.log(result); // "Blues"
```

This will return who would win on a two legged knockout stage according to data, Where:

- `data` is a plain javascript object with `teams` and `games`
  - `teams` is an array with two strings with the names of the two teams. The first team is the one that is the home team in the first game. If not given, it defaults to `Team 1` and `Team 2`
  - `games` is an array with the results of the two games. Each result is a plain javascript object with a `home` and an `away` property

- `options` is a plain javascript object with options. It can be ommited as all options have defaults. Currently the following options are supported
  - `fullResult`: defaults to `true`. If true, the result is returned as an object with both the winner (can be `undefined` in case of a tie) and the reason. If `false` only a simple `string` with the winner name is returned (or `undefined` in case of a tie)
  - `awayGoalsRule`: defaults to `true`. If true, away goals are taking into account in case of a tie in aggregate goals

- When `fullResult` is true, `reason` can take the following values:
  - `AGGREGATE`: winner just have more goals in aggregate
  - `AWAY_GOALS`: there is a tie on aggregate goals, but winner has more away goals
  - `FULL_TIE`: teams are tied on both aggregate goals and away goals
  - `TIE`: teams are tied on aggregate goals and away goals rule is not applied on this case

Refer to the tests for more usage examples. 


