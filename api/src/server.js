import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

const PORT = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
// --------------------------------------------- STUDENT ROUTES ----------------------------------------------------------------------------
app.get("/students", async (req, res, next) => {
  // Check if the data is cached.
  // if (!isAuthorized(req,res)) return res.status(401).json({message: 'Unauthorized'});
  try {
    const results =
      await db.query(`SELECT student.*, service_manager.tscm_first, service_manager.tscm_last
                                      FROM student 
                                      JOIN service_manager ON service_manager.tscm_id = student.tscm_id`);

    // Send the data.
    res.send(results.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/students/:id", async (req, res, next) => {
  const id = req.params.id;

  const result = await db
    .query(
      `SELECT student.*, service_manager.tscm_first, service_manager.tscm_last 
                                  FROM student 
                                  JOIN service_manager ON service_manager.tscm_id = student.tscm_id 
                                  WHERE student.student_id = ${id}`
    )
    .catch(next);

  if (result.rows.length === 0) {
    res.sendStatus(404);
  } else {
    res.send(result.rows);
  }
});

app.post("/students", async (req, res, next) => {
  const firstName = req.body.student_first;
  const lastName = req.body.student_last;
  const email = req.body.student_email;
  const password = req.body.student_password;
  const cohort = req.body.cohort;
  const sercurityClearance = req.body.sec_clearance;
  const careerStatus = req.body.career_status;
  const courseStatus = req.body.course_status;
  const collegeDegree = req.body.college_degree;
  const cover_letter = req.body.cover_letter;
  const resume = req.body.resume;
  const linkedin = req.body.linkedin;
  const personal_narrative = req.body.personal_narrative;
  const hunter_access =req.body.hunter_access
  const tscm_id = req.body.tscm_id;

  const result = await db
    .query(
      `INSERT INTO student(student_first, student_last, student_email, student_password, cohort, sec_clearance, career_status, 
        course_status, college_degree, cover_letter, resume, linkedin, personal_narrative, hunter_access, tscm_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        firstName,
        lastName,
        email,
        password,
        cohort,
        sercurityClearance,
        careerStatus,
        courseStatus,
        collegeDegree,
        cover_letter,
        resume,
        linkedin,
        personal_narrative,
        hunter_access,
        tscm_id,
      ]
    )
    .catch(next);
  res.send(result.rows[0]);
});

app.patch("/students/:id", async (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  const firstName = req.body.student_first;
  const lastName = req.body.student_last;
  const cohort = req.body.cohort;
  const sercurityClearance = req.body.sec_clearance;
  const careerStatus = req.body.career_status;
  const courseStatus = req.body.course_status;
  const collegeDegree = req.body.college_degree;
  const cover_letter = req.body.cover_letter;
  const resume = req.body.resume;
  const linkedin = req.body.linkedin;
  const personal_narrative = req.body.personal_narrative;
  const hunter_access =req.body.hunter_access
  const tscm_id = req.body.tscm_id;

  const result = await db
    .query(
      `UPDATE student SET student_first = $1, student_last = $2, cohort = $3, sec_clearance = $4, career_status = $5, 
      course_status = $6, college_degree = $7, cover_letter = $8, resume = $9, linkedin = $10, personal_narrative = $11, 
      hunter_access = $12, tscm_id = $13 WHERE student_id = $14 RETURNING *`,
      [
        firstName,
        lastName,
        cohort,
        sercurityClearance,
        careerStatus,
        courseStatus,
        collegeDegree,
        cover_letter,
        resume,
        linkedin,
        personal_narrative,
        hunter_access,
        tscm_id,
        id,
      ]
    )
    .catch(next);
  res.send(result.rows[0]);
});

app.delete("/students/:id", async (req, res, next) => {
  const id = req.params.id;
  await db
    .query("DELETE FROM student WHERE student.student_id = $1", [id])
    .catch(next);
  res.send({ message: "Sucessfully Deleted Student Record!" });
});

app.post("/students/login", async (req, res, next) => {
  const email = req.body.email;
  const inputPassword = req.body.password;

  try {
    const results = await db.query(
      "SELECT * FROM student WHERE student_email = $1",
      [email]
    );
    const student = results.rows[0];

    if (!student) {
      return res
        .status(404)
        .json({ message: "Incorrect Password or Email 🤷" });
    }

    if (student.student_password === inputPassword) {
      const user = { val_student: student.email };

      const accessToken = jwt.sign(user, "super secret key", {
        expiresIn: "10m",
      });
      res.json({ accessToken });
    }
  } catch (error) {
    console.error(
      "Something really went wrong, check if DB is running 🤷",
      error
    );
    res.status(500).json({ message: "Service unavailable 🤷" });
    console.log("bad");
  }
});

// --------------------------------------------- MANAGERS ROUTES ----------------------------------------------------------------------------

app.get("/managers", async (req, res, next) => {
  const results = await db.query(`SELECT * FROM service_manager`).catch(next);
  res.send(results.rows);
});

app.get("/managers/:id", async (req, res, next) => {
  const id = req.params.id;
  const results = await db
    .query(`SELECT * FROM service_manager WHERE tscm_id = ${id}`)
    .catch(next);
  res.send(results.rows);
});

app.post("/managers", async (req, res, next) => {
  const firstName = req.body.tscm_first;
  const lastName = req.body.tscm_last;
  const login_id = req.body.login_id;
  const password = req.body.tscm_password;
  const email = req.body.tscm_email;
  const avatar = req.body.tscm_avatar;

  const result = await db
    .query(
      "INSERT INTO service_manager(tscm_first, tscm_last, login_id, tscm_password, tscm_email, tscm_avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [firstName, lastName, login_id, password, email, avatar]
    )
    .catch(next);
  res.send(result.rows[0]);
});

app.patch("/managers/:id", async (req, res, next) => {
  const id = req.params.id;

  const firstName = req.body.tscm_first;
  const lastName = req.body.tscm_last;
  const login_id = req.body.login_id;
  const password = req.body.tscm_password;
  const email = req.body.tscm_email;
  const avatar = req.body.tscm_avatar;

  const result = await db
    .query(
      "UPDATE service_manager SET tscm_first = $1, tscm_last = $2, login_id = $3, tscm_password = $4, tscm_email = $5, tscm_avatar = $6  WHERE tscm_id = $7 RETURNING *",
      [firstName, lastName, login_id, password, email, avatar, id]
    )
    .catch(next);
  res.send(result.rows[0]);
});

app.post("/managers/login", async (req, res, next) => {
  const email = req.body.email;
  const inputPassword = req.body.password;
  console.log(email);
  const results = await db.query(
    `SELECT * FROM service_manager WHERE tscm_email = $1`,
    [email]
  );
  const manager = results.rows[0];
  console.log(manager);
  console.log("manager");
  if (!manager) {
    return res.status(401).json({ message: "Invalid Email 🤷" });
  } else if (bcrypt.compareSync(inputPassword, manager.tscm_password)) {
    const user = { user: `${manager.tscm_first} ${manager.tscm_last}` };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    console.log(token);
    console.log(`Admin ${user.user}, welcome back!`);
    res.json({ token: token });
  } else return res.status(401).json({ message: "Invalid Password 🤷" });
});

// Need to think about this more, because we need to update student records and calendar records BEFORE we delete any manager records otherwise we are violating foreign keys

app.delete("/managers/:id", async (req, res, next) => {
  const id = req.params.id;

  await db
    .query("DELETE FROM service_manager WHERE service_manager.tscm_id = $1", [
      id,
    ])

    .catch(next);
  res.json({ message: "Sucessfully Deleted Manager Records!" });
});

// -------------------------------------------------------------- EVENTS ROUTES -------------------------------------------------------------

app.get("/events", async (req, res, next) => {
  const results = await db
    .query(
      `SELECT calendar.*, service_manager.tscm_first, service_manager.tscm_last FROM calendar
                                  JOIN service_manager ON service_manager.tscm_id = calendar.tscm_id`
    )
    .catch(next);
  res.send(results.rows);
});

app.get("/events/:id", async (req, res, next) => {
  const id = req.params.id;

  const result = await db
    .query(
      `SELECT calendar.*, service_manager.tscm_first, service_manager.tscm_last FROM calendar
                                  JOIN service_manager ON service_manager.tscm_id = calendar.tscm_id
                                  WHERE event_id = ${id}`
    )
    .catch(next);

  if (result.rows.length === 0) {
    res.sendStatus(404);
  } else {
    res.send(result.rows[0]);
  }
});

app.post("/events", async (req, res, next) => {
  const eventName = req.body.event_name;
  const tscmId = req.body.tscm_id;
  const date = req.body.event_date;
  const time = req.body.event_time;
  const speakersContacted = req.body.speak_con;
  const description = req.body.event_descrip;

  const result = await db
    .query(
      "INSERT INTO calendar(event_name, tscm_id, event_date, event_time, speak_con, event_descrip) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [eventName, tscmId, date, time, speakersContacted, description]
    )
    .catch(next);
  res.send(result.rows[0]);
});

app.patch("/events/:id", async (req, res, next) => {
  const id = req.params.id;

  const eventName = req.body.event_name;
  const tscmId = req.body.tscm_id;
  const date = req.body.event_date;
  const time = req.body.event_time;
  const speakersContacted = req.body.speak_con;
  const description = req.body.event_descrip;

  const result = await db
    .query(
      "UPDATE calendar SET event_name = $1, tscm_id = $2, event_date = $3, event_time = $4, speak_con = $5, event_descrip = $6 WHERE event_id = $7 RETURNING *",
      [eventName, tscmId, date, time, speakersContacted, description, id]
    )
    .catch(next);
  res.send(result.rows[0]);
});

app.delete("/events/:id", async (req, res, next) => {
  const id = req.params.id;

  await db
    .query("DELETE FROM calendar WHERE calendar.event_id = $1", [id])
    .catch(next);

  res.send("Sucessfully Deleted Event Record!");
});

app.get("/managers/login/isAuthorized", (req, res) => {
  let user = isAuthorized(req, res);
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  console.log(`Welcome back, Admin ${user.user}`);
  res.json({ message: user });
});

// -----------------------------------------------------------------------------------------------------------------------------------------

function isAuthorized(req, res) {
  let auth = req.headers.authorization;
  if (!auth) {
    return false;
  }
  const token = auth.replace("Bearer ", "");
  try {
    return jwt.verify(token, process.env.SECRET_KEY); //verify if token is valid, and get user email
  } catch (e) {
    return false;
  }
}
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}00!`);
});
