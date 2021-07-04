import dotenv from 'dotenv'
dotenv.config()

import { StartServer } from './server.js'

import next from 'next'
const app = next({ dev: true })

app.prepare().then(() => {
    StartServer()
})
