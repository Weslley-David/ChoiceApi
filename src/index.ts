import { InteralServerError } from "./errors/errors"
import { Request, Response } from "express"
// NextFunction
import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const app = express()
const port = 3000
import cors from 'cors'
import routes from './routes'
import { Prisma } from "@prisma/client"
app.use(cors())
app.use(express.json())
//   create = async (req: Request, res: Response) => {
//     try {
//       const { option1, option2 } = req.body

//       const { data, error } = await supabase
//         .from('question')
//         .insert({ option1: option1, option2: option2, vote1: 0, vote2: 0 })
//         .select()

//       if (error == null) {
//         return res.json(data).status(200).send()
//       } else {
//         throw new Error()
//       }

//     } catch (error) {
//       return res.status(400)
//     }

//   }
//   delete = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.body
//       const { error } = await supabase
//         .from('question')
//         .delete()
//         .eq('id', id)
//       if (error) {
//         console.log(error)
//         throw new Error("delete error");
//       }
//       return res.send().status(200)
//     } catch (error) {
//       return res.send().status(400)
//     }
//   }
//   getRandomQuestion = async (req: Request, res: Response) => {
//     const { data, error } = await supabase.rpc('get_random_question')
//     if (error) {
//       console.log(error)
//       throw new Error("get error");
//     }


//     res.status(200).json(data)
//   }
//   vote = async (req: Request, res: Response) => {
//     try {
//       const { id, option } = req.body
//       if (option == 1) {

//         const { data, error } = await supabase.rpc('update_votes', { id_p: id, field: 'first' })
//         console.log(data, error)
//         return res.status(200).send(data)
//       } else {
//         const { data, error } = await supabase.rpc('update_votes', { id_p: id, field: 'second' })
//         console.log(data, error)
//         return res.status(200).send(data)
//       }
//     } catch (error) {
//       return res.status(400)
//     }


//   }
//   getQuestion = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.body

//       const { data, error } = await supabase
//         .from('question')
//         .select()
//         .eq('id', id)
//       if (error) {
//         return res.status(400).send(error)
//       }
//       return res.status(200).send(data)
//     } catch (error) {
//       return res.status(400)
//     }
//   }
// }

// class Comment {
//   getComments = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params

//       //console.log(id)
//       const { data, error } = await supabase
//         .from('comment')
//         .select()
//         .eq('question_fk', id)

//       if (error) {
//         console.log(error)
//         return res.status(400)
//         //throw new Error("");

//       }
//       return res.json(data).status(200)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   writeComment = async (req: Request, res: Response) => {
//     try {
//       const { id, content } = req.body

//       //console.log(id, content)

//       const { data, error } = await supabase
//         .from('comment')
//         .insert({ 'question_fk': id, 'content': content})
//         .select()


//       if (error) {
//         console.log(error)
//         throw new Error("");

//       }
//       return res.status(200).json(data)

//     } catch (error) {
//       console.log(error)
//     }

//   }
// }
// const question = new Question()
// const comment = new Comment()
// const alternative = new Altenative()
//endpoints


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ "message": "working" })
})

app.use(routes)


app.listen(port, () => {
  console.log(`Yep! ${port}`)
})

app.use((error: Error, req: Request, res: Response) => {//, next: NextFunction
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(500).json({
      "msg": "Database Error."
    })
  } else if (error instanceof InteralServerError) {
    res.status(error.statusCode).json({
      "msg": error.message
    })
  }
  else {
    console.log('\n Error middleware ʕノ•ᴥ•ʔノ ︵ ┻━┻\n', error)
    return res.status(500).json({ "error": "could not fetch data" })
  }
})