import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // Get the plain http request object formatting for context received
    const req = context.switchToHttp().getRequest()
    let authHeader = req.headers['authorization']
    req.user = {id: 24}
    // WE CAN CONDUCT OUR OWN CUSTOMIZED AUTHENTICATION HERE
    console.log("formatted request object =>", authHeader);
    return true;
  }
}
