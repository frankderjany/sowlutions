function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const data = [];

  for (let i = 1; i < lines.length; i++) { // skip header
      const row = lines[i].split(",");

      data.push({
          suit: row[0],
          animal: row[1],
          fruit: row[2],
          won: row[3] === "true"
      });
  }

  return data;
}


function probabilityToBeatBoss(data, suit, animal, fruit) {
  let totalGames = 0;
  let totalWins = 0;

  const suitWins = {};
  const animalWins = {};
  const fruitWins = {};

  const suits = new Set();
  const animals = new Set();
  const fruits = new Set();

  for (const row of data) {
      totalGames++;

      suits.add(row.suit);
      animals.add(row.animal);
      fruits.add(row.fruit);

      if (row.won) {
          totalWins++;

          suitWins[row.suit] = (suitWins[row.suit] || 0) + 1;
          animalWins[row.animal] = (animalWins[row.animal] || 0) + 1;
          fruitWins[row.fruit] = (fruitWins[row.fruit] || 0) + 1;
      }
  }

  if (totalGames === 0 || totalWins === 0) {
      return "0.0%";
  }

  const pWin = totalWins / totalGames;

  const pSuit =
      ((suitWins[suit] || 0) + 1) / (totalWins + suits.size);

  const pAnimal =
      ((animalWins[animal] || 0) + 1) / (totalWins + animals.size);

  const pFruit =
      ((fruitWins[fruit] || 0) + 1) / (totalWins + fruits.size);

  const probability = pWin * pSuit * pAnimal * pFruit;

  return (probability * 100).toFixed(1) + "%";
}