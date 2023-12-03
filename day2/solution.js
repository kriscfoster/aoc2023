const fs = require('fs');

(async function main() {
  console.log('PUZZLE ONE\n===========')
  console.log(await one()) // 2913
  console.log('')
  console.log('PUZZLE TWO\n===========')
  console.log(await two()) // 55593
})()

async function two() {
  const data = await fs.readFileSync('input.txt', 'utf8');
  const games = data.split('\n');
  const minCubesPerColor = []
  games.forEach((game) => {
    const minCubesPerColorSingleGame = {
      blue: 1,
      red: 1,
      green: 1,
    }

    const split = game.split(';')
    split.forEach((s) => {
      s = s.replaceAll(',', '').replace(/(.*): /g, '')
      s = s.split(' ');
      for (i=0; i<s.length; i++) {
        el = s[i];
        if (el == 'blue' || el == 'red' || el == 'green') {

          if (+s[i-1] > minCubesPerColorSingleGame[el]) {
            minCubesPerColorSingleGame[el] = s[i-1];
          }
        }
      }
    })

    minCubesPerColor.push(minCubesPerColorSingleGame)
  });

  let sum = 0;
  minCubesPerColor.forEach((mcpc) => {
    let pow = mcpc.blue * mcpc.red * mcpc.green;
    sum += pow
  })

  return sum;
}

async function one() {
  const data = await fs.readFileSync('input.txt', 'utf8');
  const games = data.split('\n');
  const minCubesPerColor = []
  games.forEach((game) => {
    const minCubesPerColorSingleGame = {
      blue: 0,
      red: 0,
      green: 0,
    }

    const split = game.split(';')
    split.forEach((s) => {
      s = s.replaceAll(',', '').replace(/(.*): /g, '')
      s = s.split(' ');
      for (i=0; i<s.length; i++) {
        el = s[i];
        if (el == 'blue' || el == 'red' || el == 'green') {
          if (+s[i-1] > minCubesPerColorSingleGame[el]) {
            minCubesPerColorSingleGame[el] = s[i-1];
          }
        }
      }
    })

    minCubesPerColor.push(minCubesPerColorSingleGame)
  });

  const maxPerColor = {
    red: 12,
    green: 13,
    blue: 14,
  }
  const qualifyingGameIds = [];

  minCubesPerColor.forEach((s, i) => {
    if (s.blue <= maxPerColor.blue && s.red <= maxPerColor.red && s.green <= maxPerColor.green) {
      qualifyingGameIds.push(i+1);
    }
  });

  let sum = 0;
  qualifyingGameIds.forEach((qg) => {
    sum += qg;
  })

  return sum;
}
