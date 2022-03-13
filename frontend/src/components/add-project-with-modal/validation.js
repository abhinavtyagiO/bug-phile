import * as yup from "yup";

export const AddProjectSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  description: yup.string(),
  members: yup.array().of(yup.number().positive().integer()),
  status: yup.number().required("Status is required.").positive().integer(),
  link: yup.string().url("Invalid URL."),
});
