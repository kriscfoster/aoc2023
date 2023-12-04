const fs = require('fs');

(async function main() {
  console.log('PUZZLE ONE\n===========')
  console.log(await one()) // 531932
  console.log('')
  console.log('PUZZLE TWO\n===========')
  console.log(await two()) // 73646890
})()

const numbers = Array.from(Array(10).keys())

function before(twoD, i, j) {
  // we've encountered the end of a number
  number = ''
  jEnd = j-1
  jTemp = j-1
  while (jTemp>=0 && twoD[i][jTemp] in numbers) {
    number = twoD[i][jTemp] + number
    jTemp--
  }

  return number
}

function after(twoD, i, j) {
    // we've encountered the start of a number
    number = ''
    j = j+1
    while (j<twoD[i].length && twoD[i][j] in numbers) {
      number += twoD[i][j]
      j++
    }

    return number
}

function scanRow(twoD, i, j) {
  if (twoD[i][j] in numbers) {
    number = ''
    number = `${before(twoD, i, j)}${twoD[i][j]}${after(twoD, i, j)}`
    return number
  } else {
    const before1 = before(twoD, i, j);
    const after1 = after(twoD, i, j);
    const nums = []
    if (before1.length) {
      nums.push(before1)
    }

    if (after1.length) {
      nums.push(after1)
    }

    return nums;

  }
}

async function two() {
  const data = await fs.readFileSync('input.txt', 'utf8');
  const line = data.split('\n');
  const twoD = [];
  line.forEach((l) => {
    twoD.push(l.split(''))
  })

  let total = 0;
  for (let i=0; i<twoD.length; i++) {
    for (let j=0; j<twoD[i].length; j++) {
      const cur = twoD[i][j];
      if (cur == '*') {
        // we've encountered a gear
        let AdjNumbers = [];

        // before
        if (j>0 && twoD[i][j-1] in numbers) {
          AdjNumbers.push(before(twoD, i, j))
        }

        // after
        if (j+1 < twoD[i].length && twoD[i][j+1] in numbers) {
          AdjNumbers.push(after(twoD, i, j))
        }

        // above
        if (i>0) {
          AdjNumbers = AdjNumbers.concat(scanRow(twoD, i-1, j))
        }

        // below
        if (i+1 < twoD.length) {
          AdjNumbers = AdjNumbers.concat(scanRow(twoD, i+1, j))
        }

        if (AdjNumbers.length == 2) {
          total += AdjNumbers[0] * AdjNumbers[1]
        }
      }
    }
  }

  return total
}


async function one() {
  const data = await fs.readFileSync('input.txt', 'utf8');
  const line = data.split('\n');
  const twoD = [];
  line.forEach((l) => {
    twoD.push(l.split(''))
  })

  let total = 0;
  for (let i=0; i<twoD.length; i++) {
    for (let j=0; j<twoD[i].length; j++) {
      const cur = twoD[i][j];
      if (twoD[i][j] in numbers) {
        // we've encountered the start of a number..
        number = ''
        jStart = j
        while (j<twoD[i].length && twoD[i][j] in numbers) {
          number += twoD[i][j]
          j++
        }

        jEnd = j-1

        let found = false;

        if (jEnd+1<twoD[i].length && !(twoD[i][jEnd+1] in numbers) && twoD[i][jEnd+1] != '.' && !found) {
          // after
          found = true
        }
        
        if (jStart>0 && !(twoD[i][jStart-1] in numbers) && twoD[i][jStart-1] != '.' && !found) {
          // before
          found = true
        }
        
        if (i-1>0 && !found) {
          // line above
          for (let j2=jStart-1; j2<=jEnd+1; j2++) {
            if (j2 >= 0 && j2 < twoD[i-1].length) {
              if (!(twoD[i-1][j2] in numbers) && twoD[i-1][j2] != '.') {
                found = true;
              }
            }
          }
        }
        
        if (i+1 < twoD.length && !found) {
          // line below
          for (let j2=jStart-1; j2<=jEnd+1; j2++) {
            if (j2 >= 0 && j2 < twoD[i+1].length) {
              if (!(twoD[i+1][j2] in numbers) && twoD[i+1][j2] != '.') {
                found = true
              }
            }
          }
        }

        if (found) {
          total += +number
        }
      }
    }
  }

  return total
}
