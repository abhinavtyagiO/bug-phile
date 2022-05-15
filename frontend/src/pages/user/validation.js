import * as yup from "yup";

export const AddRoleSchema = yup.object().shape({
  role: yup.string().required("Please enter the role."),
});
