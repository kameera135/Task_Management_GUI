import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token') ?? null;

  req = req.clone({
    setHeaders :{
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return next(req);
};
