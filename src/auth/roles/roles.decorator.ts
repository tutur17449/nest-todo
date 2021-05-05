import { CustomDecorator, SetMetadata } from '@nestjs/common';

export function Roles(...roles: string[]): CustomDecorator<string> {
  return SetMetadata('roles', roles);
}
