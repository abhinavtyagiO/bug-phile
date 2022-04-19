import * as yup from "yup";

export const AddCommentSchema = yup.object().shape({
  text: yup.string().required("Comment text should not be empty."),
  issue: yup.number().required("Issue Id is required.")
});
