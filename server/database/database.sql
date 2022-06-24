CREATE TABLE people (
  "_id" serial NOT NULL,
  "name" varchar NOT NULL,
  CONSTRAINT "people_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE tasks (
  "_id" serial NOT NULL,
  "description" varchar NOT NULL,
  "completed" BOOLEAN NOT NULL,
  "worker_id" bigint,
  CONSTRAINT "tasks_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);


/* Establishing the tasks.worker_id as a foreign key which references the primary key of people._id */
ALTER TABLE tasks ADD CONSTRAINT "tasks_fk0" FOREIGN KEY ("worker_id") REFERENCES people("_id");

ALTER TABLE tasks
ALTER COLUMN completed
SET DEFAULT FALSE;