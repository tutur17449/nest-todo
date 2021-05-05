import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
