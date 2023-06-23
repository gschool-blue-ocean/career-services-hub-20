DROP TABLE IF EXISTS student, service_manager, calendar, notification_message;
CREATE TYPE status AS ENUM ('In-Progress', 'Completed', 'Un-Satisfactory');
CREATE TYPE education AS ENUM ('Undetermined',
  'None',
  'Associate in CS/STEM',
  'Associate Not in CS/STEM',
  'Bachelor in CS/STEM',
  'Bachelor Not in CS/STEM',
  'Masters in CS/STEM',
  'Masters Not in CS/STEM');

CREATE TYPE career AS ENUM ('Searching', 'Hired', 'Not Currently Searching');

CREATE TYPE course AS ENUM ('Student', 'Graduate');

CREATE TABLE service_manager (
  tscm_id SERIAL PRIMARY KEY NOT NULL,
  tscm_first VARCHAR(50) NOT NULL,
  tscm_last VARCHAR(50) NOT NULL,
  login_id VARCHAR(50) NOT NULL,
  tscm_password TEXT NOT NULL,
  tscm_email TEXT NOT NULL,
  tscm_avatar TEXT,
  tscm_code VARCHAR(15) NOT NULL
);
CREATE TABLE notification_message (
  id serial PRIMARY KEY NOT NULL,
  message TEXT,
  read BOOLEAN,
  student_id INT,
  admin_id INT
);

CREATE TABLE student (
  student_id SERIAL PRIMARY KEY NOT NULL,
  student_first VARCHAR(50) NOT NULL,
  student_last VARCHAR(50) NOT NULL,
  student_email TEXT NOT NULL,
  student_password TEXT NOT NULL,
  cohort VARCHAR(50) NOT NULL,
  sec_clearance TEXT,
  career_status career,
  course_status course,
  college_degree education,
  cover_letter status,
  resume status,
  linkedin status,
  personal_narrative status,
  hunter_access status,
  tscm_id INTEGER NOT NULL,
  FOREIGN KEY (tscm_id) REFERENCES service_manager (tscm_id)
);

CREATE TABLE calendar (
  event_id SERIAL PRIMARY KEY NOT NULL,
  event_name VARCHAR(50) NOT NULL,
  tscm_id INTEGER NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  speak_con TEXT,
  event_descrip TEXT NOT NULL,
  FOREIGN KEY (tscm_id) REFERENCES service_manager (tscm_id)
);
