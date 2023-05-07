-- CreateTable
CREATE TABLE "alternative_v2" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR,
    "quantity" INTEGER DEFAULT 0,
    "question_v2_fk" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alternative_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "content" VARCHAR,
    "question_fk" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_v2" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "content" VARCHAR,
    "question_v2_fk" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "option1" VARCHAR NOT NULL,
    "option2" VARCHAR NOT NULL,
    "vote1" INTEGER,
    "vote2" INTEGER,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_v2" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_v2_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alternative_v2" ADD CONSTRAINT "alternative_v2_question_v2_fk_fkey" FOREIGN KEY ("question_v2_fk") REFERENCES "question_v2"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_question_fk_fkey" FOREIGN KEY ("question_fk") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment_v2" ADD CONSTRAINT "comment_v2_question_v2_fk_fkey" FOREIGN KEY ("question_v2_fk") REFERENCES "question_v2"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

