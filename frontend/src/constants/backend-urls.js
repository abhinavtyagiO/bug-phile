export const API_ROOT = () => `/api/`;

export const PROJECTS = () => `${API_ROOT()}projects/`;
export const PROJECT = (id) => `${PROJECTS()}${id}/`;

export const ISSUES = () => `${API_ROOT()}issues/`;
export const ISSUE = (id) => `${ISSUES()}${id}/`;

export const TAGS = () => `${API_ROOT()}tags/`;
export const TAG = (id) => `${TAGS()}${id}/`;

export const ISSUE_PRIORITIES = () => `${API_ROOT()}issue_priority/`;
export const ISSUE_PRIORITY = (id) => `${ISSUE_PRIORITIES()}${id}/`;

export const ISSUE_STATUSES = () => `${API_ROOT()}issue_status/`;
export const ISSUE_STATUS = (id) => `${ISSUE_STATUSES()}${id}/`;

export const USERS = () => `${API_ROOT()}users/`;
export const USER = (id) => `${USERS()}${id}/`;

export const COMMENTS = () => `${API_ROOT()}comments/`;
export const COMMENT = (id) => `${COMMENTS()}${id}/`;
 
export const PROJECT_STATUSES = () => `${API_ROOT()}project_status/`;
export const PROJECT_STATUS = (id) => `${PROJECT_STATUSES()}${id}/`;
