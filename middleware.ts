export  {default} from 'next-auth/middleware'

export const config = {
    matcher: ['/users/:id*']

    //* : zero or more parameter
    //+: one or more parameter
    //?: zero or one parameter
}