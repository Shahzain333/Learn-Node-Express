import { createHmac, randomBytes } from 'node:crypto'
import { prismaClient } from "../lib/db.js";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = 'khan@123';

export interface createUserPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface getUserTokenPayload {
    email: string,
    password: string
}

class userService {

    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac('sha256',salt).update(password).digest('hex')
        return hashedPassword
    }

    public static createUser(payload: createUserPayload) {
        const {firstName, lastName, email, password} = payload
        const salt = randomBytes(32).toString('hex')
        const hashedPassword = userService.generateHash(salt, password) 
        return prismaClient.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                salt
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } })
    }

    public static async getUserToken(payload: getUserTokenPayload) {
        const { email, password } = payload
        const user = await userService.getUserByEmail(email)

        if(!user) {
            throw new Error("User Not Found")
        }

        const userSalt = user.salt
        const userHasedPassword = userService.generateHash(userSalt, password)

        if(userHasedPassword !== user.password) {
            throw new Error("Incorrect Password")
        }

        // Generate Token
        const token = JWT.sign({ id: user.id , email: user.email }, JWT_SECRET)
        return token
        
    }
}

export default userService; 