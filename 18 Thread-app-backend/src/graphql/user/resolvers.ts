import { prismaClient } from '../../lib/db.js';
import type { createUserPayload } from '../../services/user.js';
import userService from '../../services/user.js';

const queries = {
    getUserToken: async (_: any, payload: { email: string, password: string }) => {
        const token = await userService.getUserToken({
            email: payload.email,
            password: payload.password
        })
        return token
    },
    getCurrentLoggedInUser: async(_:any, parameters:any, context:any) => {
        //console.log(context)
        if(context && context.user) {
            const id = context.user.id
            const user = await userService.getUserById(id)
            return user
            //return context.user
        }
        throw new Error(`I don't know who are you!`)
    }
}

const mutations = {
    // createUser: async(_: { firstName, lastName, email, password }: 
    // { firstName: string; lastName: string; email: string; password: string }) => {

    //     await prismaClient.user.create({
    //         data: {
    //             email,
    //             firstName,
    //             lastName,
    //             password,
    //             salt: 'random_salt',
    //         }
    //     })

    //     return true;

    // }
    createUser: async(_: any, payload: createUserPayload ) => {
        const res = await userService.createUser(payload)
        return res.id
    }
}

export const resolvers = { queries, mutations }