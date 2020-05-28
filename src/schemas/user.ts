import Joi from "joi";

export default Joi.object().keys({
  email: Joi.string().email().required().label("Email"),
  username: Joi.string().alphanum().min(4).max(30).required().label("Username"),
  name: Joi.string().max(254).required().label("Name"),
  password: Joi.string()
    .min(8)
    .max(30)
    .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s]).*$/)
    .label("Password")
    .options({
      language: {
        string: {
          regex: {
            base:
              "must have atleast one lowercase, one uppercase, one digit and one special character",
          },
        },
      },
    }),
});
