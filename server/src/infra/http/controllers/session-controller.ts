import { Request, Response } from 'express';

import { AuthenticateUser } from '@application/session/use-cases/authenticate-user';
import { GetAuthenticatedUser } from '@application/session/use-cases/get-authenticated-user';

export class SessionController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUser();

    const { token, user } = await authenticateUser.execute({ email, password });

    return response.status(200).json({ token, user });
  }

  async me(request: Request, response: Response) {
    const { id } = request.user;

    const getAuthenticatedUser = new GetAuthenticatedUser();

    const { user } = await getAuthenticatedUser.execute({ userId: id });

    return response.status(200).json({ user });
  }
}
