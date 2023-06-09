import pg from "pg";

//Migration for a deployed env.

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function migration() {
  // Service_manager table
  await db.query(`DROP TABLE IF EXISTS service_manager CASCADE`);
  await db.query(`CREATE TABLE service_manager (
            tscm_id SERIAL PRIMARY KEY NOT NULL,
            tscm_first VARCHAR(50) NOT NULL,
            tscm_last VARCHAR(50) NOT NULL,
            login_id VARCHAR(50) NOT NULL,
            tscm_password text NOT NULL,
            tscm_email text NOT NULL,
            tscm_avatar text
        )`);
  console.log("TSCM table created");

  const queryTSCMString = `INSERT INTO service_manager (tscm_first, tscm_last, login_id, tscm_password, tscm_email) 
                    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  await db.query(queryTSCMString, [
    "tscm_admin",
    "tscm_last",
    "admin_id",
    "admin",
    "admin@admin.com",
  ]);
  console.log("TSCM admin created");
  //   await delay(2000); // 2-second delay


  // Student table
  await db.query(`DROP TABLE IF EXISTS student CASCADE`);
  await db.query(`CREATE TABLE student (
            student_id SERIAL PRIMARY KEY NOT NULL,
            student_first VARCHAR(50) NOT NULL,
            student_last VARCHAR(50) NOT NULL,
            student_email text NOT NULL,
            student_password text NOT NULL,
            cohort VARCHAR(50) NOT NULL,
            sec_clearance VARCHAR(50),
            career_status VARCHAR(50),
            course_status VARCHAR(50),
            college_degree VARCHAR(50),
            tscm_id INTEGER NOT NULL REFERENCES service_manager (tscm_id)
        )`);
  console.log("Student table created");

  const queryStudentString = `INSERT INTO student (student_first, student_last, student_email, student_password, cohort, 
    sec_clearance, career_status, course_status, college_degree, tscm_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
  await db.query(queryStudentString, [
    "test",
    "student",
    "student@student.com",
    "student",
    "MCSP-16",
    "Undetermined",
    "Searching",
    "Student",
    "Undetermined",
    1,
  ]);
  console.log("Student data created");
  //   await delay(2000); // 2-second delay


  // Calendar table
  await db.query(`DROP TABLE IF EXISTS calendar CASCADE`);
  await db.query(`CREATE TABLE calendar (
            event_id SERIAL PRIMARY KEY NOT NULL,
            event_name VARCHAR(50) NOT NULL,
            tscm_id INTEGER NOT NULL REFERENCES service_manager (tscm_id),
            event_date DATE NOT NULL,
            event_time TIME NOT NULL,
            speak_con VARCHAR(50) NOT NULL,
            event_descrip text NOT NULL
        )`);
  console.log("Calendar table created");

  //   await delay(2000); // 2-second delay


  // Milestone table
  await db.query(`DROP TABLE IF EXISTS milestone CASCADE`);
  await db.query(`CREATE TABLE milestone (
            mile_id SERIAL PRIMARY KEY NOT NULL,
            mile_name TEXT NOT NULL,
            progress_stat TEXT NOT NULL,
            student_id INTEGER REFERENCES student (student_id)
        )`);
  console.log("Milestone table created");

  const studentMilestone = [
    "Cover Letter",
    "Resume",
    "LinkedIn",
    "Personal Narrative",
    "Hunter Access",
  ];
  const progress_stat = ["In-Progress", "Completed", "Un-Satisfactory"];
  const queryMilestoneString = `INSERT INTO milestone (mile_name, progress_stat, student_id) 
                    VALUES ($1, $2, $3) RETURNING *`;
  for (let i = 0; i < studentMilestone.length; i++) {
    let randomNumber = Math.floor(Math.random() * 3); // Randomly generate a number between 0-2
    await db.query(queryMilestoneString, [
      studentMilestone[i],
      progress_stat[randomNumber],
      1,
    ]); // Insert milestone into SQL database
  }

}

migration();

// The following is to reference a migration.sql file. Didn't use for deployment process, but may be useful later

// import pg from "pg";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// db.connect((err, client, release) => {
//     if (err) {
//         return console.error('Error acquiring client', err.stack)
//     }
//     console.log(process.env.DATABASE_URL)
//     console.log('Connected to database')
// })

// console.log("Running SQL migrate...")

// const sqlFilePath = path.join(__dirname, 'migration.sql');
// const migrateQuery = fs.readFileSync(sqlFilePath, { encoding: 'utf8' });

// const runMigration = async () => {
//     try {
//     await db.query(migrateQuery);
//     console.log('Migration Completed!');
//     } catch (err) {
//     console.error('Error running migration', err.stack);
//     } finally {
//     await db.end();
//     }
// };

// runMigration();
