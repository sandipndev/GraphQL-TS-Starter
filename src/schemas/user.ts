import Joi from "joi";

const email = Joi.string().email().required().label("Email");
const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label("Username");
const name = Joi.string().max(254).required().label("Name");
const password = Joi.string()
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
  });

export const signUp = Joi.object().keys({
  email,
  username,
  name,
  password,
});

export const signIn = Joi.object().keys({
  username,
  password,
});
