import { Router } from 'express'
import { Question, Comment, Altenative } from '../controller'
import { resolver } from '../routeAdapter'
const question = new Question()
const comment = new Comment()
const alternative = new Altenative()
const routes = Router()


routes.get('/question', resolver(question.getRandomQuestion))
routes.post('/question', resolver(question.createQuestion))
routes.delete('/question', resolver(question.deleteQuestion))

routes.post('/comment', resolver(comment.createComment))
routes.delete('/comment', resolver(comment.deleteComment))

routes.patch('/vote', resolver(alternative.vote))

export default routes