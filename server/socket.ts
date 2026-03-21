import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io"

const httpServer = createServer()

const io = new SocketIOServer(httpServer, {
    cors: {
        origin: "*"
    }
})

const createJobCode = () => {
    let code = "XXXX"
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    while (code.includes("X")) {
        code = code.replace("X", chars.charAt(Math.floor(Math.random() * chars.length)))
    }
    return code
}

const createUserIdentifier = () => {
    return Math.random().toString(36).substring(2, 15)
}

type JobOptions = {
    jobCode: string,
    participants: string[],
    jobStart: number,
    jobStatus: string,
    jobItems: {name: string, completed: boolean}[]
}

let openJobs: {participants: []}[] = []

io.on("connection", (socket) => {
    console.log("New client connected")
    socket.on("createJob", (data) => {
        // CREATE A JOB ID WITH ATTENDEES STARTING WITH THE MECHANIC WHO CREATED THE JOB
        const jobCode = createJobCode()
        const thisUser = createUserIdentifier()
        const newJob = {
            participants: [thisUser],
            jobCode: jobCode,
            jobItems: [],
            jobStart: null,
            jobStatus: null
        }
    })
})