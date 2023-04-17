
import { createClient } from '@supabase/supabase-js'
import { Request, Response } from "express"
import * as dotenv from 'dotenv'
import express from 'express'
dotenv.config()
const app = express()
const port = 3000
const base_url: string = process.env.BASE_URL + ""
const secret_key: string = process.env.SECRET_KEY + ""
const supabase = createClient(base_url, secret_key)
//const cors = require('cors')
import cors from 'cors'
app.use(cors())
app.use(express.json())

class Question {
  create = async (req: Request, res: Response) => {
    try {
      const { option1, option2 } = req.body

      const { data, error } = await supabase
        .from('question')
        .insert({ option1: option1, option2: option2, vote1: 0, vote2: 0 })
        .select()

      if (error == null) {
        return res.json(data).status(200).send()
      } else {
        throw new Error()
      }

    } catch (error) {
      return res.status(400)
    }

  }
  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const { error } = await supabase
        .from('question')
        .delete()
        .eq('id', id)
      if (error) {
        console.log(error)
        throw new Error("delete error");
      }
      return res.send().status(200)
    } catch (error) {
      return res.send().status(400)
    }
  }
  getRandomQuestion = async (req: Request, res: Response) => {
    const { data, error } = await supabase.rpc('get_random_question')
    if (error) {
      console.log(error)
      throw new Error("get error");
    }


    res.status(200).json(data)
  }
  vote = async (req: Request, res: Response) => {
    try {
      const { id, option } = req.body
      if (option == 1) {

        const { data, error } = await supabase.rpc('update_votes', { id_p: id, field: 'first' })
        console.log(data, error)
        return res.status(200).send(data)
      } else {
        const { data, error } = await supabase.rpc('update_votes', { id_p: id, field: 'second' })
        console.log(data, error)
        return res.status(200).send(data)
      }
    } catch (error) {
      return res.status(400)
    }


  }
  getQuestion = async (req: Request, res: Response) => {
    try {
      const { id } = req.body

      const { data, error } = await supabase
        .from('question')
        .select()
        .eq('id', id)
      if (error) {
        return res.status(400).send(error)
      }
      return res.status(200).send(data)
    } catch (error) {
      return res.status(400)
    }
  }
}

class Comment {
  getComments = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      //console.log(id)
      const { data, error } = await supabase
        .from('comment')
        .select()
        .eq('question_fk', id)

      if (error) {
        console.log(error)
        return res.status(400)
        //throw new Error("");

      }
      return res.json(data).status(200)

    } catch (error) {
      console.log(error)
    }
  }

  writeComment = async (req: Request, res: Response) => {
    try {
      const { id, content } = req.body

      //console.log(id, content)

      const { data, error } = await supabase
        .from('comment')
        .insert({ 'question_fk': id, 'content': content})
        .select()


      if (error) {
        console.log(error)
        throw new Error("");

      }
      return res.status(200).json(data)

    } catch (error) {
      console.log(error)
    }

  }
}
const question = new Question()
const comment = new Comment()
//endpoints


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ "message": "working" })
})

app.post('/create', question.create)
app.delete('/delete', question.delete)
app.get('/question', question.getRandomQuestion);
app.patch('/vote', question.vote);
app.get('/specificquestion', question.getQuestion);
app.get('/comment/:id', comment.getComments)
app.post('/comment', comment.writeComment)


app.listen(port, () => {
  console.log(`Yep! ${port}`)
})