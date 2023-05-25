const request = require('supertest');
const app = 'http://api:80';

// This is for testing all routes locally. There should be a docker container that can run the suite and talk directly to the container.

// TEST ARE OUT OF ORDER INTENTIONALLY. TO AVOID FK PROBLEMS A MANAGER/STUDENT IS MADE FIRST BEFORE ANYTHING ELSE HAPPENS //

// Global variables intentional. This is for use in multiple routes.
let newStudentId;
let newMileId;
let newManagerId

describe("POST /managers", () => {

    it('creates a new manager', async () => {
        
        const newManager = {
            tscm_first: 'Reptar',
            tscm_last: 'Pickles',
            login_id: 'Reptarsaurus',
            tscm_password: 'Reptar123',
            tscm_email: 'Reptar@reptar.com',
            tscm_avatar: '🦖' 
        };

    const response = await request(app)
    .post('/managers')
    .send(newManager)
    .expect('Content-Type', /json/)
    .expect(200);

    // Check that the student is returned in the response body
    expect(response.body).toEqual(
        expect.objectContaining({
            tscm_first: 'Reptar',
            tscm_last: 'Pickles',
            login_id: 'Reptarsaurus',
            tscm_password: 'Reptar123',
            tscm_email: 'Reptar@reptar.com',
            tscm_avatar: '🦖' 
        })
    );
    newManagerId = response.body.tscm_id;
    });
});

describe('POST /students', () => {

    it('creates a new student', async () => {
        
        const newStudent = {
            student_first: "👨", 
            student_last: "Doe",
            cohort: "MCSP-19",
            sec_clearance: "Top Secret",
            career_status: "Hired",
            course_status: "Graduate",
            college_degree: "Bachelor in CS/STEM",
            tscm_id: newManagerId
        };

    const response = await request(app)
    .post('/students')
    .send(newStudent)
    .expect('Content-Type', /json/)
    .expect(200); // replace with your actual status code

    // Check that the student is returned in the response body
    expect(response.body).toEqual(
        expect.objectContaining({
        student_first: "👨",
        student_last: "Doe",
        cohort: "MCSP-19",
        sec_clearance: "Top Secret",
        career_status: "Hired",
        course_status: "Graduate",
        college_degree: "Bachelor in CS/STEM",
        tscm_id: newManagerId
        })
    );
    newStudentId = response.body.student_id;
    });
});



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

    const response = await request(app)
        .get(`/students/${newStudentId}`)
        .expect('Content-Type', /json/)
        .expect(200);  // This checks that the HTTP status code is 200

      // Check that the response body is an array (since you're sending result.rows)
    expect(response.body[0]).toEqual(
        expect.objectContaining({
        student_first: "👨",
        student_last: "Doe",
        cohort: "MCSP-19",
        sec_clearance: "Top Secret",
        career_status: "Hired",
        course_status: "Graduate",
        college_degree: "Bachelor in CS/STEM",
        tscm_first: "Reptar",
        tscm_id: newManagerId,
        tscm_last: "Pickles"
        })
    );
    });
});


describe('PATCH /students/:id', () => {

    it('updates a student', async () => {
        
        const updateStudent = {
            student_id: newStudentId,
            student_first: "🦘", 
            student_last: "Guy",
            cohort: "MCSP-20",
            sec_clearance: "SECRET",
            career_status: "Searching",
            course_status: "Student",
            college_degree: "Associate in CS/STEM",
            tscm_id: newManagerId
        };

        const response = await request(app)
        .patch(`/students/${newStudentId}`)
        .send(updateStudent)
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                student_id: newStudentId,
                student_first: "🦘",
                student_last: "Guy",
                cohort: "MCSP-20",
                sec_clearance: "SECRET",
                career_status: "Searching",
                course_status: "Student",
                college_degree: "Associate in CS/STEM",
                tscm_id: newManagerId
            })
        );
    });
});

describe('POST /students/:studentId/milestones', () => {

    it('Adds to the milestone table using student id', async () => {
        
        const newMilestone = {
            student_id: newStudentId,
            mile_name: "Cover Letter",
            progress_stat: "Completed"
        };

    const response = await request(app)
    .post(`/students/${newStudentId}/milestones`)
    .send(newMilestone)
    .expect('Content-Type', /json/)
    .expect(200);

    newMileId = response.body[0].mile_id

    // Check that the milestone equals what we sent
    expect(response.body).toEqual(
        expect.objectContaining([{
            mile_id: newMileId,
            student_id: newStudentId,
            mile_name: "Cover Letter",
            progress_stat: "Completed"
        }])
        );
    });
});

describe('PATCH /students/:studentId/milestones/:milestoneId', () => {

    it('Adds to the milestone table using student id', async () => {
        
        const newMilestone = {
            student_id: newStudentId,
            mile_name: "LinkedIn",
            progress_stat: "Un-Satisfactory"
        };

    const response = await request(app)
    .patch(`/students/${newStudentId}/milestones/${newMileId}`)
    .send(newMilestone)
    .expect('Content-Type', /json/)
    .expect(200);

    // Check that the milestone equals what we sent
    expect(response.body[0]).toEqual(
        expect.objectContaining({
            mile_id: newMileId,
            mile_name: "LinkedIn",
            progress_stat: "Un-Satisfactory",
            student_id: newStudentId
        })
        );
    });
});


describe('GET /students/:id/milestones', () => {
    it('retrieves a milestone at a given studen id', async () => {

    const response = await request(app)
        .get(`/students/${newStudentId}/milestones`)
        .expect('Content-Type', /json/)
        .expect(200);

      // Check that the response body is an array (since you're sending result.rows)
    expect(response.body[0]).toEqual(
        expect.objectContaining({
            mile_id: newMileId,
            mile_name: "LinkedIn",
            progress_stat: "Un-Satisfactory",
            student_id: newStudentId
        })
        );
    });
});

describe('DELETE /students/:id', () => {
    it('deletes a student that we created in the second test', async () => {

        const response = await request(app)
        .delete(`/students/${newStudentId}`)
        .expect(response => {
            expect(response.body).toEqual({message: "Sucessfully Deleted Student Record!"});
        })
        .expect(200);

    })
})

describe('DELETE /managers/:id', () => {
    it('deletes a manager that we created in the first test', async () => {

        const response = await request(app)
        .delete(`/managers/${newManagerId}`)
        .expect(response => {
            expect(response.body).toEqual({ message: 'Sucessfully Deleted Manager Records!' });
        })
        .expect(200);

    })
})