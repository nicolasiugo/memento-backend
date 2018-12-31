
function nextCardLevel(currentLevel, answer) {
  if (answer == 'NOT_OK') {
    return 1
  } else if (answer == 'OK') {
    return currentLevel + 1
  }
}

const levelsPerDay = [
  [1, 2],
  [1, 3],
  [1, 2],
  [1, 4],
  [1, 2],
  [1, 3],
  [1, 2],
  [1],
  [1, 2],
  [1, 3],
  [1, 2],
  [1, 5],
  [1, 2, 4],
  [1, 3],
  [1, 2],
  [1]
]

exports.levelsPerDay = levelsPerDay;
exports.nextCardLevel = nextCardLevel;
