import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from '@fastify/jwt'
import dotenv from 'dotenv'

import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { poolRoutes } from "./routes/pool";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";

dotenv.config()

const secret = `${process.env.SECRET}`

async function bootstrap() {
    const fastify = Fastify({
        logger:true
    })

    await fastify.register(cors,{
        origin:true
    })

    await fastify.register(jwt,{
        secret:secret
    })
    
    await fastify.register(poolRoutes)
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(userRoutes)


    await fastify.listen({port:3333})
}

bootstrap()