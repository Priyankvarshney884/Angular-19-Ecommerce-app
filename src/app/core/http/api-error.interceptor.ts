import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError } from "rxjs";


export const apiErrorInterceptor: HttpInterceptorFn =( req,next)=>
next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        const message = error.error?.message ?? error.message ?? 'An unknown error occurred';
        console.error('[API Error]', { status: error.status, message, details: error.error });  
        
        throw new Error(message);
    })
)