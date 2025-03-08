export const THIRD_PARTY_ERRORS = {
    SERVICE_UNAVAILABLE: {
        httpCode: 503,
        code: "SERVICE_UNAVAILABLE",
        message: "Api no disponible"
    },

    FORBIDDEN:{
        httpCode: 403,
        code: "FORBIDDEN",
        message: "Forbidden"
    },

    INTERNAL_SERVER_ERROR: {
        httpCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: "Error interno del servidor"
    }
}