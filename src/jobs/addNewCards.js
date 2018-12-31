const db = require('../db');

async function addNewCards() {
  try {
    const cardsToAdd = await db.query.cards(
      { 
        where: { level: 0, isActive: true },
        first: 5
      },
      '{ id }'
    );

    const newCards = await db.mutation.updateManyCards(
      {
        data: {
          level: 1
        },
        where: {
          id_in: cardsToAdd.map(c => c.id),
        },
      },
      '{ count }'
    );
    return true
  } catch (e) {
    throw e
  }
}

exports.addNewCards = addNewCards;