import { Request, Response, json } from "express"
import { createClient } from '@supabase/supabase-js'
const express = require('express')
const app = express()
const port = 3000
const supabase = createClient('https://ntiumkdcisinslmqjmsm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aXVta2RjaXNpbnNsbXFqbXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA0MzUzNDMsImV4cCI6MTk5NjAxMTM0M30.K-31hijATTCnWv6M5Qh3LwqwtmrTjwTIgLs1KjvkVRA')
var cors = require('cors')
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
      return res.status(200).json(data)
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
    if(error){
      throw new Error("delete error");
      
    }
    return res.status(200)
  } catch (error) {
    return res.status(400)
  }
}
)

app.get('/question', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('question')
      .select('*')
      .order('random', { ascending: false })
      .limit(1)

    if (error) {
      console.log(error)
      return res.status(400)
    } else {
      console.log(data[0])
    }
  } catch (error) {
    return res.status(400)
  }
});

// app.patch('/vote', (req: Request, res: Response) => {

// });


app.listen(port, () => {
  console.log(`Yep! ${port}`)
})

