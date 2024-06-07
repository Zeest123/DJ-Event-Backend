"use strict";

/**
 * `assign-owner` middleware.
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.request.body.data.user = ctx.state.user.id;

    await next();
  };
};
