import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { isAdmin?: boolean } | undefined;
    if (user?.isAdmin) return true;
    throw new UnauthorizedException('Not authorized as an admin');
  }
}
