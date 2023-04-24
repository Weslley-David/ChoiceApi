import { Request, Response } from "express"

import express from 'express'
import { Question, Comment } from './database'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const question = new Question()
const comment = new Comment()
//endpoints


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ "message": "working" })
})

app.post('/create', question.create)
app.get('/questions', question.getAllQuestion)
app.delete('/delete', question.delete)
app.get('/question', question.getRandomQuestion);
app.patch('/vote', question.vote);
app.get('/specificquestion', question.getQuestion);
app.get('/comment/:id', comment.getComments)
app.post('/comment', comment.writeComment)

app.listen(port, () => {
  console.log(`We are running on: ${port}⊂(◉‿◉)つ`)
})