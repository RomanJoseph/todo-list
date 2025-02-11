import { Joi, Segments, celebrate } from 'celebrate';

const validateCreateTask = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('done','pending','in_progress').required()
  }),
});

const validateUpdateTask = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().uuid(),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('done','pending','in_progress').optional()
  }),
});

const validateDeleteTask = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().uuid(),
  })
});

const valdiateShowTask = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().uuid(),
  })
});

export { validateCreateTask, validateUpdateTask, valdiateShowTask, validateDeleteTask };