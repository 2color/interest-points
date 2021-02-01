-- CreateTable
CREATE TABLE "berlin-pois" (
    "gid" SERIAL NOT NULL,
    "osm_id" VARCHAR(10),
    "code" SMALLINT,
    "fclass" VARCHAR(28),
    "name" VARCHAR(100),
    "geom" geometry,

    PRIMARY KEY ("gid")
);

-- CreateIndex
CREATE INDEX "berlin_poi_idx" ON "berlin-pois"("geom");
