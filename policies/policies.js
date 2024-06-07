module.exports = {
  // Replace the default isAuthenticated policy with isOwner
  "*": ["isOwner"],

  // Or add it as a new policy
  "users-permissions": {
    find: ["isAuthenticated"],
    findone: ["isAuthenticated"],
    create: [],
    update: ["isAuthenticated", "isOwner"],
    delete: ["isAuthenticated", "isOwner"],
  },
  // Allow any authenticated user to view events
  event: {
    find: ["isAuthenticated"],
    findOne: ["isAuthenticated"],
  },

  // Only allow the owner to update or delete events
  "event/**": ["isAuthenticated", "isOwner"],
};
