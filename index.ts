
import { createClient } from '@supabase/supabase-js'
import { Request, Response} from "express"

import express from 'express'
const app = express()
const port = 3000
const supabase = createClient('https://ntiumkdcisinslmqjmsm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aXVta2RjaXNpbnNsbXFqbXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA0MzUzNDMsImV4cCI6MTk5NjAxMTM0M30.K-31hijATTCnWv6M5Qh3LwqwtmrTjwTIgLs1KjvkVRA')
//const cors = require('cors')
import cors from 'cors'
app.use(cors())
app.use(express.json())

//endpoints

app.post('/create', async (req: Request, res: Response) => {
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

})

app.delete('/delete', async (req: Request, res: Response) => {
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
)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ "message": "working" })
})

app.get('/question', async (req: Request, res: Response) => {
  const { data, error } = await supabase.rpc('get_random_question')
  if (error) {
    console.log(error)
    throw new Error("get error");
  }
  res.status(200).json(data)
}


);

app.patch('/vote', async (req: Request, res: Response) => {
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


});


app.listen(port, () => {
  console.log(`Yep! ${port}`)
})

