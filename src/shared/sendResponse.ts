export const sendResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({
        success: statusCode < 400,
        message: message || null,
        data: data || null,
    });
};

export const sendError = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        message: message || 'An error occurred',
    });
};