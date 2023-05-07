import { Request, Response} from "express"
import { Question as QuestionDatabase, Altenative as AltenativeDatabase, Comment as CommentDatabase } from "../database";
import { alternative_v2 } from "@prisma/client";


export class Question {
    constructor(
        private question: QuestionDatabase = new QuestionDatabase(),
        private alternative: AltenativeDatabase = new AltenativeDatabase(),
        private comment: CommentDatabase = new CommentDatabase()
    ) { }

    getRandomQuestion = async (req: Request, res: Response) => {
        const question_id = await this.question.getRandomQuestionId()
        const alternatives = await this.alternative.getAlternativesByQuestionId(question_id)
        const comment = await this.comment.getCommentsByQuestionId(question_id)
        return res.json({ "question": question_id, "alternatives": alternatives, "comment": comment }).status(200)
    }
    createQuestion = async (req: Request, res: Response) => {

        const { alternative_one, alternative_two } = req.body
        const question = await this.question.createQuestion(alternative_one, alternative_two)
        return res.json({ "question": question }).status(200)

    }
    deleteQuestion = async (req: Request, res: Response) => {

        const { question_id, pwd } = req.body
        if (pwd != '12345') {
            return res.json({ "error": "invalid PWD" }).status(400)
        }

        const question = await this.question.deleteQuestionById(question_id)
        return res.json({ "question": question }).status(200)

    }
}

export class Comment {
    constructor(
        private comment: CommentDatabase = new CommentDatabase()
    ) { }
    createComment = async (req: Request, res: Response) => {

        const { comment, question_id } = req.body
        const comment_result = await this.comment.createComment(comment, question_id)
        return res.json({ "comment": comment_result }).status(200)

    }
    deleteComment = async (req: Request, res: Response) => {

        const { comment_id, pwd } = req.body

        if (pwd != '12345') {
            return res.json({ "error": "invalid PWD" }).status(400)
        }

        const question = await this.comment.deleteCommentById(comment_id)
        return res.json({ "question": question }).status(200)


    }
}

export class Altenative {
    constructor(
        private altenative: AltenativeDatabase = new AltenativeDatabase()
    ) { }

    vote = async (req: Request, res: Response) => {

        const { id } = req.body
        const alternative: alternative_v2 = await this.altenative.increaseAlternativeByOne(id)
        return res.json({ "alternative": alternative }).status(200)


    }
}