const request = require("supertest");
const app = "http://api:80";

// This is for testing all routes locally. There should be a docker container that can run the suite and talk directly to the container.

// TEST ARE OUT OF ORDER INTENTIONALLY. TO AVOID FK PROBLEMS A MANAGER/STUDENT IS MADE FIRST BEFORE ANYTHING ELSE HAPPENS //

// Global variables intentional. This is for use in multiple routes.
let newStudentId;
let newMileId;
let newManagerId;
let hashedPassword;

describe("POST /managers", () => {
  it("creates a new manager", async () => {
    const newManager = {
      tscm_first: "Reptar",
      tscm_last: "Pickles",
      login_id: "Reptarsaurus",
      tscm_password: "Reptar123",
      tscm_email: "Reptar@reptar.com",
      tscm_avatar: "🦖",
    };

    const response = await request(app)
      .post("/managers")
      .send(newManager)
      .expect("Content-Type", /json/)
      .expect(200);

    // Check that the student is returned in the response body
    expect(response.body).toEqual(
      expect.objectContaining({
        tscm_first: "Reptar",
        tscm_last: "Pickles",
        login_id: "Reptarsaurus",
        tscm_password: "Reptar123",
        tscm_email: "Reptar@reptar.com",
        tscm_avatar: "🦖",
      })
    );
    newManagerId = response.body.tscm_id;
  });
});

describe("POST /students", () => {
  it("creates a new student", async () => {
    const newStudent = {
      first: "John",
      last: "Doe",
      email: "doe@gmail.com",
      pass: "password",
    };

    const response = await request(app)
      .post("/students")
      .send(newStudent)
      .expect("Content-Type", /json/)
      .expect(200); // replace with your actual status code

    newStudentId = response.body.student_id;
    hashedPassword = response.body.student_password;

    // Check that the student is returned in the response body
    expect(response.body).toEqual(
      expect.objectContaining({
        student_id: newStudentId,
        student_first: "John",
        student_last: "Doe",
        student_email: "doe@gmail.com",
        student_password: hashedPassword,
        cohort: "Undetermined",
        sec_clearance: "Undetermined",
        career_status: "Not Currently Searching",
        course_status: "Student",
        college_degree: "Undetermined",
        cover_letter: "Un-Satisfactory",
        resume: "Un-Satisfactory",
        linkedin: "Un-Satisfactory",
        personal_narrative: "Un-Satisfactory",
        hunter_access: "Un-Satisfactory",
        tscm_id: 1,
      })
    );
  });
});

describe("GET /students", () => {
  it("responds with json", async () => {
    const response = await request(app)
      .get("/students")
      .expect("Content-Type", /json/) // make sure we get a son
      .expect(200); // check status code

    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /students/:id", () => {
  it("retrieves the student with the given ID", async () => {
    const response = await request(app)
      .get(`/students/${newStudentId}`)
      .expect("Content-Type", /json/)
      .expect(200); // This checks that the HTTP status code is 200

    // Check that the response body is an array (since you're sending result.rows)
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        student_id: newStudentId,
        student_first: "John",
        student_last: "Doe",
        student_email: "doe@gmail.com",
        student_password: hashedPassword,
        cohort: "Undetermined",
        sec_clearance: "Undetermined",
        career_status: "Not Currently Searching",
        course_status: "Student",
        college_degree: "Undetermined",
        cover_letter: "Un-Satisfactory",
        resume: "Un-Satisfactory",
        linkedin: "Un-Satisfactory",
        personal_narrative: "Un-Satisfactory",
        hunter_access: "Un-Satisfactory",
        tscm_first: "Elon",
        tscm_last: "Gates",
        tscm_id: 1,
      })
    );
  });
});

describe("PATCH /students/:id", () => {
  it("updates a student", async () => {
    const updateStudent = {
      student_id: newStudentId,
      student_first: "🦘",
      student_last: "Guy",
      cohort: "MCSP-20",
      sec_clearance: "SECRET",
      career_status: "Searching",
      course_status: "Student",
      college_degree: "Associate in CS/STEM",
      cover_letter: "Completed",
      resume: "In-Progress",
      linkedin: "Un-Satisfactory",
      personal_narrative: "Completed",
      hunter_access: "Completed",
      tscm_id: 1,
    };

    const response = await request(app)
      .patch(`/students/${newStudentId}`)
      .send(updateStudent)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        student_id: newStudentId,
        student_first: "🦘",
        student_last: "Guy",
        student_email: "doe@gmail.com",
        student_password: hashedPassword,
        cohort: "MCSP-20",
        sec_clearance: "SECRET",
        career_status: "Searching",
        course_status: "Student",
        college_degree: "Associate in CS/STEM",
        cover_letter: "Completed",
        resume: "In-Progress",
        linkedin: "Un-Satisfactory",
        personal_narrative: "Completed",
        hunter_access: "Completed",
        tscm_id: 1,
      })
    );
  });
});

describe("DELETE /students/:id", () => {
  it("deletes a student that we created in the second test", async () => {
    const response = await request(app)
      .delete(`/students/${newStudentId}`)
      .expect((response) => {
        expect(response.body).toEqual({
          message: "Sucessfully Deleted Student Record!",
        });
      })
      .expect(200);
  });
});

describe("DELETE /managers/:id", () => {
  it("deletes a manager that we created in the first test", async () => {
    const response = await request(app)
      .delete(`/managers/${newManagerId}`)
      .expect((response) => {
        expect(response.body).toEqual({
          message: "Sucessfully Deleted Manager Records!",
        });
      })
      .expect(200);
  });
});
