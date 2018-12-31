const { levelsPerDay } = require('../calendarUtils');

const Query = {
  cardsForToday(parent, args, ctx, info) {
    const userDay = ctx.request.user.currentStudyingDay
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1) // da
    return ctx.db.query.cards(
      {
         where: {
          user: { id: ctx.request.user.id },
          level_in: levelsPerDay[userDay],
          isActive: true,
          OR: [
            { lastReviewed: null },
            { lastReviewed_lte: yesterday.toISOString().split('T')[0] }
          ]
        },
      },
      info
    );
  }
};

module.exports = Query;
