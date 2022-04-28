import * as yup from "yup";

export const EditIssueDetailsSchema = yup.object().shape({
  assignees: yup.array().of(yup.number().positive().integer()),
  status: yup.number().nullable().positive().integer(),
  priority: yup.number().nullable().positive().integer(),
});
