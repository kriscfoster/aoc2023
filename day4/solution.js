const fs = require('fs');

(async function main() {
  console.log('PUZZLE ONE\n===========')
  console.log(await one()) // 25651
  console.log('')
  console.log('PUZZLE TWO\n===========')
  console.log(await two()) // 19499881
})()

function parseCards(data) {
  const cards = data.split('\n');
  const parsedCards = []
  cards.forEach((card) => {
    card = card.replace(/.*:/, '');
    const split = card.split('|');
    const c = {
      winningNumbers: split[0].trim().split(' '),
      yourNumbers: split[1].trim().split(' ')
    }

    parsedCards.push(c)
  });

  return parsedCards;
}

async function two() {
  const data = await fs.readFileSync('input.txt', 'utf8');
  const parsedCards = parseCards(data);
  let total = 0;
  let winningArr = [];
  parsedCards.forEach((pc) => {
    let winners = 0;
    pc.winningNumbers.forEach((wn) => {
      if (pc.yourNumbers.includes(wn) && wn.length) {
        winners++
      }
    })

    winningArr.push(winners);
  })

  const numbers = Array.from(Array(10))
  const totalCards = Array(parsedCards.length).fill(1);
  winningArr.forEach((wa, i) => {
    for (let j=i+1; j<=i+wa; j++) {
      if (j<totalCards.length) {
        totalCards[j] = totalCards[j] + (1 * totalCards[i])
      }
    }
  })

  return totalCards.reduce((a,b) => a+b)
}

async function one() {
  const data = await fs.readFileSync('input.txt', 'utf8');
  const parsedCards = parseCards(data);

  let total = 0;
  parsedCards.forEach((pc) => {
    let cTotal = 0;

    pc.winningNumbers.forEach((wn) => {
      if (pc.yourNumbers.includes(wn) && wn.length) {
        cTotal = cTotal == 0 ? 1 : cTotal * 2
      }
    })

    total += cTotal
  })

  return total;
}
