-- CreateTable
CREATE TABLE "user" (
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "token" VARCHAR(1000),

    CONSTRAINT "user_pkey" PRIMARY KEY ("username")
);
