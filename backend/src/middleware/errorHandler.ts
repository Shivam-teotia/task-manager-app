import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.statusCode || 500;
    res.status(status).json({
        message:
            err.message || "An unknown error occurred, please try again later",
    });
};
