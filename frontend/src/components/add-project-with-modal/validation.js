import * as yup from "yup";

export const AddProjectSchema = yup.object().shape({
  name: yup.string().nullable().required("Name is required."),
  description: yup.string().nullable(),
  members: yup.array().of(yup.number().positive().integer()),
  status: yup.number().nullable().required("Status is required.").positive().integer(),
  link: yup.string().nullable().url("Invalid URL."),
  // logo: yup.mixed().required("Project Logo is required."),
});
