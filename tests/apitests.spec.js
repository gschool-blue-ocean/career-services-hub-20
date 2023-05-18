const request = require('supertest');
const app = 'http://api:80';

// STUDENT TESTS EXCEPT FOR DELETE, THAT WILL BE THE LAST THING WE DO SINCE WE NEED OUR TEST ONE FOR ALL OUR TESTS //

let newStudentId;

describe('GET /students', () => {
    it('responds with json', async () => {
        const response = await request(app)
            .get('/students')
            .expect('Content-Type', /json/) // make sure we get a son
            .expect(200); // check status code

        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('GET /students/:id', () => {
    it('retrieves the student with the given ID', async () => {
    const id = 1;

    const response = await request(app)
        .get(`/students/${id}`)
        .expect('Content-Type', /json/)
        .expect(200);  // This checks that the HTTP status code is 200

      // Check that the response body is an array (since you're sending result.rows)
    expect(response.body).toBeInstanceOf(Array);

      // If the array is not empty, check that the first object has the correct student_id
    if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('student_id', id);
    }
    });
});

describe('POST /students', () => {

    it('creates a new student', async () => {
        
        const newStudent = {
            student_first: "John",
            student_last: "Doe",
            cohort: "MCSP-19",
            sec_clearance: "Top Secret",
            career_status: "Hired",
            course_status: "Graduate",
            college_degree: "Bachelor in CS/STEM",
            tscm_id: 1
        };

    const response = await request(app)
    .post('/students')
    .send(newStudent)
    .expect('Content-Type', /json/)
    .expect(200); // replace with your actual status code

    // Check that the student is returned in the response body
    expect(response.body).toEqual(
        expect.objectContaining({
        student_first: "John",
        student_last: "Doe",
        cohort: "MCSP-19",
        sec_clearance: "Top Secret",
        career_status: "Hired",
        course_status: "Graduate",
        college_degree: "Bachelor in CS/STEM",
        tscm_id: 1
        })
    );
    newStudentId = response.body.student_id;
    });
});

describe('PATCH /students/:id', () => {

    it('updates a student', async () => {
        
        const updateStudent = {
            student_id: newStudentId,
            student_first: "Test",
            student_last: "Guy",
            cohort: "MCSP-20",
            sec_clearance: "SECRET",
            career_status: "Searching",
            course_status: "Student",
            college_degree: "Associate in CS/STEM",
            tscm_id: 2
        };

        const response = await request(app)
        .patch(`/students/${newStudentId}`)
        .send(updateStudent)
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                student_id: newStudentId,
                student_first: "Test",
                student_last: "Guy",
                cohort: "MCSP-20",
                sec_clearance: "SECRET",
                career_status: "Searching",
                course_status: "Student",
                college_degree: "Associate in CS/STEM",
                tscm_id: 2
            })
        );
    });
});

describe('DELETE /students/:id', () => {
    it('deletes a student that we created in the previous test', async () => {

        const response = await request(app)
        .delete(`/students/${newStudentId}`)
        .expect(response => {
            expect(response.body).toEqual({ message: 'Successfully Deleted Student Record!' });
        })
        .expect(200);

    })
})