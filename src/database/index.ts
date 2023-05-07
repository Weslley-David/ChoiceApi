import { Prisma, PrismaClient, alternative_v2, comment_v2, question_v2 } from '@prisma/client'

const prisma = new PrismaClient()

export class Question {
    getRandomQuestionId = async (): Promise<string> => {
        const randomQuestion: question_v2[] = await prisma.$queryRaw(Prisma.sql`SELECT id FROM question_v2 ORDER BY random() LIMIT 1`);
        return randomQuestion[0].id
    }

    deleteQuestionById = async (id: string): Promise<question_v2> => {
        const deleted_question: question_v2 = await prisma.question_v2.delete({
            where: {
                id: id,
            },
        })
        return deleted_question
    }
    createQuestion = async (alternative_one: string, alternative_two: string): Promise<question_v2> => {
        const question: question_v2 = await prisma.question_v2.create({
            data: {
                alternative_v2: {
                    create: [
                        { description: alternative_one },
                        { description: alternative_two }
                    ]
                }
            },
        })
        return question

    }
}

export class Comment {
    createComment = async (content: string, question_fk: string): Promise<comment_v2> => {
        const comment: comment_v2 = await prisma.comment_v2.create({
            data: {
                content: content,
                question_v2_fk: question_fk
            }
        })

        return comment
    }
    //No return type
    deleteCommentById = async (id: string) => {
        const comment = await prisma.comment_v2.delete({
            where: {
                id: id
            },
        })
        return comment
    }
    getCommentsByQuestionId = async (id: string): Promise<comment_v2[]> => {
        const comments_v2: comment_v2[] = await prisma.comment_v2.findMany({ where: { question_v2_fk: id } })
        return comments_v2
    }
}
export class Altenative {
    //No return type
    increaseAlternativeByOne = async (id: string) => {


        const alternative_v2: alternative_v2 = await prisma.alternative_v2.update({
            where: { id: id },
            data: { quantity: { increment: 1 } }
        });

        if (!alternative_v2) {
            throw new Error("coud not write data");
        }
        return alternative_v2

    }

    getAlternativesByQuestionId = async (id: string): Promise<alternative_v2[]> => {
        const alternatives_v2: alternative_v2[] = await prisma.alternative_v2.findMany({ where: { question_v2_fk: id } })
        return alternatives_v2
    }
}

