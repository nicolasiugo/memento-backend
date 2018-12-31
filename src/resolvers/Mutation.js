const { nextCardLevel } = require('../calendarUtils');

const mutations = {
  async createCard(parent, args, ctx, info) {
    const card = await ctx.db.mutation.createCard(
      {
        data: {
          ...args,
        },
      },
      info
    );

    console.log(card);

    return card;
  },
  async updateCard(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the card
    const card = await ctx.db.query.card({ where }, `{ id title user { id }}`);
    // 2. Check if they own that card, or have the permissions
    const ownsCard = card.user.id === ctx.request.user.id;
    
    if (!ownsCard) {
      throw new Error("You don't have permission to do that!");
    }

    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateCard(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updateCardAnswer(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const card = await ctx.db.query.card({ where }, `{ id level }`);
    
    const nextLevel = nextCardLevel(card.level, args.answer)
    // run the update method
    console.log("next level: ", card, nextLevel)
    return ctx.db.mutation.updateCard(
      {
        data: {
          level: nextLevel,
          lastReviewed: new Date(),
        },
        where: {
          id: args.id,
        },
      },
      info
    );
  }
};

module.exports = mutations;
