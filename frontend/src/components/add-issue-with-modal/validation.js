import * as yup from "yup";

export const AddIssueSchema = yup.object().shape({
  title: yup.string().nullable().required("Title is required."),
  description: yup.string().nullable(),
  assignees: yup.array().of(yup.number().positive().integer()),
  status: yup.number().nullable().positive().integer(),
  tags: yup.number().required("Tag is required").positive().integer(),
  priority: yup.number().required("Priority is required.").positive().integer(),
});
