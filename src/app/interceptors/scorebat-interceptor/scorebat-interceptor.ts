import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class FormatInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter(event => event instanceof HttpResponse && this.isScorebatUrl(event.url)),
      map((event: HttpResponse<any>) => event.clone({ body: event.body.data.users.list }))
    );
  }

  private isScorebatUrl(url: string): boolean {
      return !!url;
  }
}