 export const errorMiddleWare=(err,req,res,next)=>
{
    err.statusCode=err.statusCode||500;
    err.message=err.message|| "enternal server error";

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}