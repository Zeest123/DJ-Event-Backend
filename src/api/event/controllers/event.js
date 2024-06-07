"use strict";

// const { sanitizeEntity } = require("strapi-utils");

/**
 * event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // Create an event
  async create(ctx) {
    console.log("creating!!!!!!");

    return await super.create(ctx);
  },

  // Update event
  async update(ctx) {
    console.log("updating!!!!!!");
    return await super.update(ctx);
  },

  //   // Delete event
  async delete(ctx) {
    console.log("Deleting!!!!!!");
    return await super.delete(ctx);
    // const { id } = ctx.params;

    // const user = await strapi.entityService.findOne("api::event.event", id, {
    //   populate: { user: true },
    // });

    // if (user.user.id === ctx.state.user.id) {
    //   const deletedEvent = await strapi.entityService.delete(
    //     "api::event.event",
    //     id
    //   );
    //   const sanitizedDeletedEvent = await this.sanitizeOutput(deletedEvent);
    //   return this.transformResponse(sanitizedDeletedEvent);
    // } else {
    //   return ctx.unauthorized(`You can only delete events you own`);
    // }
  },

  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        {
          messages: [
            {
              id: "No authorization header was found",
            },
          ],
        },
      ]);
    }
    const data = await strapi.db.query("api::event.event").findMany({
      where: {
        user: { id: user.id },
      },
      populate: { user: true, image: true },
    });

    if (!data) {
      return ctx.notFound();
    }
    const res = await this.sanitizeOutput(data, ctx);
    return res;
  },
}));
