import { Joi, Segments, celebrate } from 'celebrate';

const validateRegisterUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  }),
});

const validateLoginUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export { validateRegisterUser, validateLoginUser };
