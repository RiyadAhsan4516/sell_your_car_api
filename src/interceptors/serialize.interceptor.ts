import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToInstance } from "class-transformer";

interface ClassConstructor{
  // THIS INTERFACE DENOTES ANY KIND OF CLASS
  new (...args : any[]) : {}
}

// THIS IS OUR OWN CUSTOM DECORATOR
export function Serialize(dto: ClassConstructor){
  // When returning another decorator, do not use '@'
  return UseInterceptors(new SerializeInterceptor(dto))
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto : any) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // DO SOMETHING HERE BEFORE A REQUEST IS HANDLED
    return next.handle().pipe(
      // DO SOMETHING HERE BEFORE THE RESPONSE IS SENT OUT
      map((data: any)=>{
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues : true
        })
      })
    );
  }
}
