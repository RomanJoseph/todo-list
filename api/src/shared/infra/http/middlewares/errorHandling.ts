import ErrorsApp from '@shared/errors/ErrorsApp';
import { errorsMessageCelebrate } from '@shared/utils/errorsMessageCelebrate';
import { getErrorResponse } from '@shared/utils/getErrorResponse';
import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

const errorHandling = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: Error | any,
  request: Request,
  response: Response,
  _next: NextFunction,
): Promise<void> => {
  console.error(err);
  if (err instanceof ErrorsApp) {
    response
      .status(err.statusCode)
      .json({ success: false, message: err.message });
    return
  }

  if (isCelebrateError(err)) {
    response.status(400).json(errorsMessageCelebrate(err));
    return
  }

  const mappedError = getErrorResponse(err.message || err.toString());

  response.status(mappedError.code).json({
    success: false,
    title: mappedError.title,
    message: mappedError.message,
  });
  return
};

export default errorHandling;
