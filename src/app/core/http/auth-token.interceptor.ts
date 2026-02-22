import { HttpInterceptorFn } from "@angular/common/http";


export const authTokenInterceptor: HttpInterceptorFn = (req,next)=>
{
    // checking the token from local storage if its available 
    const token = localStorage.getItem('access_token')
 // skip if no token exists or header is already is already set manually .
    if(!token || req.headers.has('Authorization'))
    {
        return next(req)
    }

    // clonw request (immutable) and attach bearer token.
    const newReq = req.clone({

        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
    return next(newReq)
}