-- CreateTable
CREATE TABLE "Clip" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
