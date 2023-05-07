export class InteralServerError extends Error{
    statusCode: number
    constructor(msg: string){
        super(msg)
        this.name = 'InteralServerError'
        this.statusCode = 500
    }
}