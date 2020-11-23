# Berlin POI

## Dev Setup

### 1. Start the PostgreSQL with PostGIS Docker image:

```
docker-compose up -d
```
> **Note:** The PostgreSQL container will bind to port **5433** as defined in the [docker-compose.yml](./docker-compose.yml)
### 2. Create the database schema with Prisma Migrate

```
npx prisma migrate deploy --early-access-feature
```

### 3. Load the Open Street Maps data set for Berlin

```
psql postgresql://test-user:test-password@localhost:5433/interest-points -f berlin-pois.sql
```


## Useful information

### Adding location column

```sql
CREATE EXTENSION postgis;

ALTER TABLE "Events" ADD COLUMN "location" GEOGRAPHY(POINT,4326);
```
### Getting the data set

1. Download Berlin shp shape file from: https://download.geofabrik.de/europe/germany/berlin-latest-free.shp.zip
2. Run `shp2pgsql gis_osm_pois_free_1.shp public.berlin-pois > berlin-pois.sql` to convert the `shp` file to `sql` so that it can be imported into PostgreSQL.
