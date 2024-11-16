export const THIRD_PARTY_URL = "url";
export const QUEUE_URL = "queueURL";


export const HTTP_RESPONSES = {
    INTERNAL_SERVER_ERROR:{
        httpCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: "Error interno del servidor"
    },

    SUCCESSFUL:{
        httpCode: 200,
        code: "SUCCESSFUL",
        message: "Exitoso"
    },

    BAD_REQUEST:{
        httpCode: 400,
        code: "BAD_REQUEST",
        message: "Error en los parametros de solicitud"
    }
}