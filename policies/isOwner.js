module.exports = async (ctx, next) => {
  // Get the ID of the resource from the request parameters
  const resourceId = ctx.params.id;

  // Get the ID of the current user from the authenticated user object
  const userId = ctx.state.user.id;

  // Get the name of the model from the request URL
  const model = ctx.request.url.split("/")[1];

  // Find the resource in the database
  const resource = await strapi.query(model).findOne({ id: resourceId });

  // Check if the current user is the owner of the resource
  if (resource && resource.user === userId) {
    // If the user is the owner, allow the request to proceed
    return next();
  } else {
    // If the user is not the owner, return a 403 Forbidden error
    return ctx.forbidden("You are not the owner of this resource");
  }
};
