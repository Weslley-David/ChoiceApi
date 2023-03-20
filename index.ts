import { Request, Response, json} from "express"
const express = require('express')
const app = express()
const port = 3000



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/test', function (req: Request, res: Response) {
    res.status(200).json({ "sucess": true })
  });

// app.get('/message', (req: Request, res: Response) => {
//     res.status(200).json({ "message": `Wellcome, see all the methods in: (i will put the url here later)<(O-O)>${port}` })
// })  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

