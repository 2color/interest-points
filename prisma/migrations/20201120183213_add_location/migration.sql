CREATE EXTENSION postgis;

ALTER TABLE "Events" ADD COLUMN "location" GEOGRAPHY(POINT,4326);