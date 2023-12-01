const fs = require('fs');

(async function main() {
  console.log('PUZZLE ONE\n===========')
  console.log(await one())
  console.log('')
  console.log('PUZZLE TWO\n===========')
  console.log(await two())
})()

async function one() {
  const data = await fs.readFileSync('input.txt', 'utf8');
  const split = data.split('\n');
  let total = 0;
  split.forEach((split) => {
    const regex = /\d+/g;
    const matches = split.match(regex)
    const number = matches[0][0] + matches[matches.length - 1][matches[matches.length - 1].length - 1]
    total += +number
  });

  return total;
}


async function two() {
  const valid = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ]
  
  const wordNumberMap = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
  }

  const data = await fs.readFileSync('input.txt', 'utf8');
  const split = data.split('\n');
  let total = 0;
  split.forEach((s) => {
    let firstWordNumber = null
    let firstWordNumberIndex = null
    let lastWordNumber = null
    let lastWordNumberIndex = null
    const wordNumbers = Object.keys(wordNumberMap);
    for (let i=0; i<wordNumbers.length; i++) {
      if (s.includes(wordNumbers[i])) {
        const firstIndex = s.indexOf(wordNumbers[i]);
        const lastIndex = s.lastIndexOf(wordNumbers[i]);

        if (!firstWordNumber || firstIndex < firstWordNumberIndex) {
          firstWordNumberIndex = firstIndex
          firstWordNumber = wordNumbers[i];
        }

        if (!lastWordNumber || lastIndex > lastWordNumberIndex) {
          lastWordNumberIndex = lastIndex
          lastWordNumber = wordNumbers[i];
        }
      }
    }

    s = s.replace(firstWordNumber, wordNumberMap[firstWordNumber] + firstWordNumber)
    s = s.replaceAll(lastWordNumber, wordNumberMap[lastWordNumber])

    let num = '';
    for (let i=0; i<s.length; i++) {
      if (valid.includes(s[i])) {
        num += s[i];
        break
      }
    }

    for (let i=s.length - 1; i>=0; i--) {
      if (valid.includes(s[i])) {
        num += s[i];
        break
      }
    }

    total += +num
  });

  return total;

}
