import { Request, Response, json } from "express"
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())
app.use(express.json())

class Question {
  id: number
  first_alternative: string
  second_alternative: string
  prefer_first: number
  prefer_second: number
  constructor(id: number, first_alterrnative: string, second_alternative: string, prefer_first: number, prefer_second: number) {
    this.id = id
    this.first_alternative = first_alterrnative
    this.second_alternative = second_alternative
    this.prefer_first = prefer_first
    this.prefer_second = prefer_second
  }
}

class BankOfQuestion {
  questions: Question[] = []

  choice_reandom_question() {
    const indiceAleatorio = Math.floor(Math.random() * this.questions.length);
    return this.questions[indiceAleatorio];
  }

  increment_first_alternative_by_id(id: number) {
    this.questions[id].prefer_first = this.questions[id].prefer_first + 1
  }

  increment_second_alternative_by_id(id: number) {
    this.questions[id].prefer_second = this.questions[id].prefer_second + 1
  }
}

//microbanco

let question: Question = new Question(0, 'dormir', 'programar', 3, 4)
let question2: Question = new Question(1, 'dart', 'typescript', 50, 50)
let question3: Question = new Question(2, 'ser', 'não ser', 3, 2)
let question4: Question = new Question(3, 'lol', 'cs go', 100, 2)

let bankOfQuestion: BankOfQuestion = new BankOfQuestion();
bankOfQuestion.questions.push(question)
bankOfQuestion.questions.push(question2)
bankOfQuestion.questions.push(question3)
bankOfQuestion.questions.push(question4)

//endpoints
app.get('/question', (req: Request, res: Response) => {
  res.status(200).json(bankOfQuestion.choice_reandom_question())
})

app.post('/vote', (req: Request, res: Response) => {
  try {
    const { id, option } = req.body
    if (option == 1) {
      bankOfQuestion.increment_first_alternative_by_id(id)
    }
    else {
      bankOfQuestion.increment_second_alternative_by_id(id)
    }
    res.status(200).json(bankOfQuestion.questions[id])
  } catch (error) {
    res.status(400)
  }
});


app.listen(port, () => {
  console.log(`Yep! ${port}`)
})

