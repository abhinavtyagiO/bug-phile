export const pages = Object.freeze({
  DASHBOARD: "/",
  USERS: "/users",
  USER: "/users/:id",
  PROJECT: "/projects/:id",
  ISSUE: "/projects/:projectId/issues/:issueId",
});

export const links = Object.freeze({
  DASHBOARD: () => `/`,
  USERS: () => `/users`,
  USER: (id) => `/users/${id}`,
  PROJECT: (id) => `/projects/${id}`,
  ISSUE: (projectId, issueId) => `/projects/${projectId}/issues/${issueId}`,
});
