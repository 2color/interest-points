-- CreateTable
CREATE TABLE "Events" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "organiserId" INTEGER,

    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "_attendance" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);
-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
-- CreateIndex
CREATE UNIQUE INDEX "_attendance_AB_unique" ON "_attendance"("A", "B");
-- CreateIndex
CREATE INDEX "_attendance_B_index" ON "_attendance"("B");
-- AddForeignKey
ALTER TABLE "Events" ADD FOREIGN KEY("organiserId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_attendance" ADD FOREIGN KEY("A")REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "_attendance" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
