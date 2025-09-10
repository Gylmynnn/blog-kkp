import { swaggerUI } from '@hono/swagger-ui'
import { Hono } from 'hono'


const errorResponse = {
    "400": {
        "description": "Field required tidak lengkap",
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "success": { "type": "boolean", "example": false },
                        "statusCode": { "type": "number", "example": 400 },
                        "message": { "type": "string" }
                    }
                }
            }
        }
    },
    "401": {
        "description": "Unauthorized (token tidak valid)",
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "success": { "type": "boolean", "example": false },
                        "statusCode": { "type": "number", "example": 401 },
                        "message": { "type": "string" }
                    }
                }
            }
        }
    },
    "500": {
        "description": "Server error",
        "content": {
            "application/json": {
                "schema": {
                    "type": "object",
                    "properties": {
                        "success": { "type": "boolean", "example": false },
                        "statusCode": { "type": "number", "example": 500 },
                        "message": { "type": "string", }
                    }
                }
            }
        }
    }

}


const postsEndpoint = {
    "/api/v1/posts": {
        get: {
            tags: ["Posts"], // 👈 ini yang bikin swagger grouping bukan "default"
            summary: "Get all posts",
            responses: {
                "200": {
                    description: "Berhasil mengambil semua data postingan",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    statusCode: { type: "number", example: 200 },
                                    message: { type: "string", example: "Get all posts successfully" },
                                    data: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: { type: "string" },
                                                title: { type: "string" },
                                                content: { type: "string" },
                                                image: { type: "string" },
                                                image_id: { type: "string" },
                                                author_id: { type: "string" },
                                                created_at: { type: "string" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ...errorResponse
            }
        },
        post: {
            tags: ["Posts"], // 👈 juga di sini
            summary: "Create post",
            responses: {
                "201": {
                    description: "Post berhasil dibuat",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    statusCode: { type: "number", example: 201 },
                                    message: { type: "string", example: "Create post successfully" },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            title: { type: "string" },
                                            content: { type: "string" },
                                            image: { type: "string" },
                                            image_id: { type: "string" },
                                            author_id: { type: "string" },
                                            created_at: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ...errorResponse
            }
        }
    },
    "/api/v1/posts/{id}": {
        put: {
            tags: ["Posts"], // 👈
            summary: "Update post",
            responses: {
                "200": {
                    description: "Post berhasil diupdate",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    statusCode: { type: "number", example: 200 },
                                    message: { type: "string", example: "Update post successfully" },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            title: { type: "string" },
                                            content: { type: "string" },
                                            image: { type: "string" },
                                            image_id: { type: "string" },
                                            author_id: { type: "string" },
                                            updated_at: { type: "string" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                ...errorResponse
            }
        },
        delete: {
            tags: ["Posts"],
            summary: "Delete post",
            responses: {
                "200": {
                    description: "Post berhasil dihapus",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    statusCode: { type: "number", example: 200 },
                                    message: { type: "string", example: "Delete post successfully" }
                                }
                            }
                        }
                    }
                },
                ...errorResponse
            }
        }
    }
}

const authEndoint = {
    "api/v1/register": {
        post: {
            tags: ["Authentication"],
            summary: "Register user",
            description: "Buat akun baru dengan username, email, dan password",
            responses: {
                "201": {
                    description: "Registrasi berhasil",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: "true" },
                                    statusCode: { type: "number", example: "201" },
                                    message: { type: "string", example: "Registrasi berhasil" },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            username: { type: "string" },
                                            email: { type: "string" },
                                            avatar: { type: "string" },
                                            createdAt: { type: "string" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                ...errorResponse
            },
        },
    },
    "api/v1/login": {
        post: {
            tags: ["Authentication"],
            summary: "Login user",
            description: "Login dengan email dan password untuk mendapatkan JWT token",
            responses: {
                "200": {
                    description: "Login berhasil",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: "true" },
                                    statusCode: { type: "number", example: "200" },
                                    message: { type: "string", example: "Login berhasil" },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            username: { type: "string" },
                                            avatar: { type: "string" },
                                            email: { type: "string" },
                                            token: { type: "string" },
                                            createdAt: { type: "string" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                ...errorResponse
            },
        },
    },
}

const openApiDoc = {
    openapi: "3.0.0",
    info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation for your service",
    },
    // components: {
    // },
    paths: {
        ...postsEndpoint,
        ...authEndoint
    },
};

const app = new Hono()
    .get('/doc', (c) => c.json(openApiDoc))
    .get('/ui', swaggerUI({ url: '/swagger/doc' }))
    .get('/health', (c) => c.text('Hallo world'))

export default app
