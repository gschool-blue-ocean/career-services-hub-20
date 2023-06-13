import faker from 'faker';
import pg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
dotenv.config();
console.log(process.env.PASSWD)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { Pool } = pg;

let db;
// If we are currently in a development (local) node enviroment, then use env variables in local file
if (process.env.NODE_ENV === "development") {
  db = new Pool({
    user: process.env.POSTGRES_USER,
    host: "database",
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  });
} else {
  // If the app is not running in the development environment, use the render deployed database URL
  db = new Pool({ connectionString: process.env.DATABASE_URL });
}

// Initiliaze all possible values for each field
const cohorts = [
  "MCSP-16",
  "MCSP-17",
  "MCSP-18",
  "MCSP-19",
  "MCSP-20",
  "MCSP-21",
  "MCSP-22",
];
const careerStatus = ["Searching", "Hired", "Not Currently Searching"];
const courseStatus = ["Student", "Graduate"];
const secClearance = [
  "Undetermined",
  "None",
  "SECRET",
  "TOP SECRET",
  "TOP SECRET//SCI",
];
const collegeDegree = [
  "Undetermined",
  "None",
  "Associate in CS/STEM",
  "Associate Not in CS/STEM",
  "Bachelor in CS/STEM",
  "Bachelor Not in CS/STEM",
  "Masters in CS/STEM",
  "Masters Not in CS/STEM",
];
const studentMilestone = [
  "Cover Letter",
  "Resume",
  "LinkedIn",
  "Personal Narrative",
  "Hunter Access",
];
const progress_stat = ["In-Progress", "Completed", "Un-Satisfactory"];

const SEED_CAREER_MANAGER = 7; // Set the number of service managers we want generated
const SEED_STUDENT_ROWS = 100; // Set the number of students we want generated
const SEED_EVENTS_ROWS = 15; // Set the number of events we want generated

const seedStudents = async () => {
  const studentList = []; // Initialize array that will temp hold all the fake students before SQL insertion

  // Generate multiple student objects and push it to studentList Array
  for (let i = 0; i < SEED_STUDENT_ROWS; i++) {
    let randomNumber = Math.floor(Math.random() * 3); // Generates a random number between 0-2
    let randomNumber2 = Math.floor(Math.random() * 2); // Generates a random number between 0-1
    let randomNumber3 = Math.floor(Math.random() * 5); // Generates a random number between 0-4
    let randomNumber4 = Math.floor(Math.random() * 8); // Generates a random number between 0-7
    let randomNumber5 = Math.floor(Math.random() * 7); // Generates a random number between 0-6

    studentList.push({
      student_first: faker.name.firstName(), // Use faker method to generate fake student first name
      student_last: faker.name.lastName(), // Use faker method to generate fake student last name
      student_email: faker.internet.email(),  // Use faker method to generate fake student email
      student_password: await generateBcrypt(faker.internet.password(10)), // Use faker method to generate fake student password
      cohort: cohorts[randomNumber5], // Randomly pick a element in the self-defined cohorts array
      sec_clearance: secClearance[randomNumber3], // Randomly pick a element in the self-defined secClearance array
      career_status: careerStatus[randomNumber], // Randomly pick a element in the self-defined careerStatus array
      course_status: courseStatus[randomNumber2], // Randomly pick a element in the self-defined courseStatus array
      college_degree: collegeDegree[randomNumber4], // Randomly pick a element in the self-defined collegeDegree array
      cover_letter: progress_stat[Math.floor(Math.random() * 3)], // Randomly pick a element in the self-defined progress_stat array
      resume: progress_stat[Math.floor(Math.random() * 3)], // Randomly pick a element in the self-defined progress_stat array
      linkedin: progress_stat[Math.floor(Math.random() * 3)], // Randomly pick a element in the self-defined progress_stat array
      personal_narrative: progress_stat[Math.floor(Math.random() * 3)], // Randomly pick a element in the self-defined progress_stat array
      hunter_access: progress_stat[Math.floor(Math.random() * 3)], // Randomly pick a element in the self-defined progress_stat array
      tscm__id: faker.datatype.number({ min: 1, max: SEED_CAREER_MANAGER }), // Use faker method to create random number between 1 and MAX # of managers
    });
  }

  try {
    await db.query("TRUNCATE TABLE student CASCADE"); // DROP TABLES already in the SQL database
    await db.query("ALTER SEQUENCE student_student_id_seq RESTART WITH 1"); // Reset students entity primary key to 1
    const queryString = `INSERT INTO student (student_first, student_last,student_email,student_password, cohort, sec_clearance, career_status, course_status, college_degree, cover_letter, resume, linkedin, personal_narrative, hunter_access ,tscm_id) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`;

    // For each student, query SQL database with INSERT statement to add student
    for (let i = 0; i < SEED_STUDENT_ROWS; i++) {
      const {
        student_first,
        student_last,
        student_email,
        student_password,
        cohort,
        sec_clearance,
        career_status,
        course_status,
        college_degree,
        cover_letter,
        resume,
        linkedin,
        personal_narrative,
        hunter_access,
        tscm__id,
      } = studentList[i];
      await db.query(queryString, [
        student_first,
        student_last,
        student_email,
        student_password,
        cohort,
        sec_clearance,
        career_status,
        course_status,
        college_degree,
        cover_letter,
        resume,
        linkedin,
        personal_narrative,
        hunter_access,
        tscm__id,
      ]);
    }
    console.log("Students seeded successfully");
  } catch (err) {
    console.log("Error seeding students", err);
  }
};

const seedServiceManager = async () => {
  const careerManager = []; // Initialize array that will temp hold all the fake managers before SQL insertion

    //Generate multiple manager objects and push it to careerManager Array
    for (let i = 0; i < SEED_CAREER_MANAGER; i++){
        careerManager.push({
            tscm_first: faker.name.firstName(),             // Use faker method to generate fake manager first name
            tscm_last: faker.name.lastName(),               // Use faker method to generate fake manager last name
            login_id: faker.internet.userName(),            // Use faker method to generate fake manager username
            tscm_password: await generateBcrypt(faker.internet.password(10)),     // Use faker method to generate fake manager password for login
            tscm_email: faker.internet.email(),             // Use faker method to generate fake manager email for login
            tscm_avatar: faker.internet.avatar(),           // Use faker method to generate URL for fake manager profile pic
        });
    }
    try {
        await db.query('TRUNCATE TABLE service_manager CASCADE');                       // DROP TABLES already in the SQL database
        await db.query('ALTER SEQUENCE service_manager_tscm_id_seq RESTART WITH 1');    // Reset managers entity primary key to 1
        const queryString = `INSERT INTO service_manager (tscm_first, tscm_last, login_id, tscm_password, tscm_email, tscm_avatar) 
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
     
        await db.query(queryString,['Elon','Gates',faker.internet.userName(),process.env.PASSWD,process.env.ADMIN_EMAIL,faker.internet.avatar()])    
        //For each manager, query SQL database with INSERT statement to add manager
        for (let i = 0; i < SEED_CAREER_MANAGER; i++){
            const {tscm_first, tscm_last, login_id, tscm_password, tscm_email, tscm_avatar} = careerManager[i];
            await db.query(queryString, [tscm_first, tscm_last, login_id, tscm_password, tscm_email, tscm_avatar]);
        }
    console.log('TSCM seeded successfully');
    } catch (err) {
        console.log('Error seeding TSCM', err);
    }
}
async function generateBcrypt(str)
{
  //const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(str,10);
}
const seedCalendar = async () => {
  const calendarEvent = []; // Initialize array that will temp hold all the fake events before SQL insertion

  const startDate = new Date(2023, 0, 1); // Set beginning bounds for fake events start dates
  const endDate = new Date(2023, 8, 30); // Set end bounds for fake events end dates
  const speakContactArray = ["yes", "no", "pending"]; // Array that has all possible options for contacted speaker

  // Generate multiple events objects and push it to calendarEvent Array
  for (let i = 0; i < SEED_EVENTS_ROWS; i++) {
    let randomNumber = Math.floor(Math.random() * 3); // Generates a random number between 0-2
    let randomHour = faker.datatype
      .number({ min: 0, max: 23 })
      .toString()
      .padStart(2, "0");
    let randomMinute = faker.datatype
      .number({ min: 0, max: 59 })
      .toString()
      .padStart(2, "0");
    let randomSecond = faker.datatype
      .number({ min: 0, max: 59 })
      .toString()
      .padStart(2, "0");

    calendarEvent.push({
      event_name: faker.company.companyName(),
      tscm_id: faker.datatype.number({ min: 1, max: 7 }),
      event_date: faker.date.between(startDate, endDate),
      event_time: `${randomHour}:${randomMinute}:${randomSecond}`,
      speak_con: speakContactArray[randomNumber],
      event_descrip: faker.lorem.paragraph(4),
    });
  }

  try {
    await db.query("TRUNCATE TABLE calendar CASCADE"); // DROP TABLES already in the SQL database
    await db.query("ALTER SEQUENCE calendar_event_id_seq RESTART WITH 1"); // Reset events entity primary key to 1
    const queryString = `INSERT INTO calendar (event_name, tscm_id, event_date, event_time, speak_con, event_descrip) 
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    // For each event, query SQL database with INSERT statement to add event
    for (let i = 0; i < SEED_CAREER_MANAGER; i++) {
      const {
        event_name,
        tscm_id,
        event_date,
        event_time,
        speak_con,
        event_descrip,
      } = calendarEvent[i];
      await db.query(queryString, [
        event_name,
        tscm_id,
        event_date,
        event_time,
        speak_con,
        event_descrip,
      ]);
    }
    console.log("Calendar seeded successfully");
  } catch (err) {
    console.log("Error seeding Calendar", err);
  }
};



seedServiceManager().then(() =>
  seedStudents()
);

