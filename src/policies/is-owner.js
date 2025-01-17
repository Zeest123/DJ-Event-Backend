// the content type must have field named "user" that is a relation N-1 to users-permission
module.exports = async (policyContext, config, { strapi }) => {
  const ctx = policyContext;
  console.log("ctx.state.isAuthenticated", ctx);
  if (!ctx.state.isAuthenticated) return false;
  const api = ctx.state.route.info.apiName;
  const controller = api; // assume controller same as api name
  const service = strapi.service(`api::${api}.${controller}`);
  if (!service) return false;
  if (!ctx.params.id) return true;
  const {
    results: [content],
  } = await service.find({
    filters: {
      id: {
        $eq: ctx.params.id,
      },
      user: {
        id: {
          $eq: ctx.state.user.id,
        },
      },
    },
    publicationState: "preview",
  });

  return !!content;
};
