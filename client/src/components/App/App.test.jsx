import React from "react";
import { it, vi, expect, afterEach, beforeAll, afterAll } from "vitest";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App.jsx";

const server = setupServer();

// Add the request handlers

// Handler for GET /api/tasks
// server.use(
//   rest.get("students", (req, res, ctx) => {
//     return res(
//       ctx.json(
//         {
//           "student_id": 1,
//           "student_first": "Johnathon",
//           "student_last": "Pfannerstill",
//           "cohort": "MCSP-19",
//           "sec_clearance": "Undetermined",
//           "career_status": "Searching",
//           "course_status": "Graduate",
//           "college_degree": "Masters Not in CS/STEM",
//           "tscm_id": 2,
//           "tscm_first": "Sarah",
//           "tscm_last": "Weimann"
//         }
//       )
//     );
//   })
// );
// it("displays tasks from the api", async () => {
//   const { findByText } = render(<App />);
//   await findByText("Do the dishes");
//   await findByText("Mow the lawn");
// });

// // Handler for DELETE /api/tasks/3
// server.use(
//   rest.delete("/api/tasks/3", (req, res, ctx) => {
//     return res(ctx.status(204));
//   })
// );

// // Handler for subsequent GET /api/tasks
// // server.use(
// //   rest.get("/api/tasks", (req, res, ctx) => {
// //     return res(ctx.json([]));
// //   })
// // );

// afterEach(() => {
//   cleanup();
//   server.resetHandlers();
// });

// beforeAll(() => {
//   server.listen();
// });

// afterAll(() => {
//   server.close();
// });

it('test always passes', async () => {
  expect(true).toBe(true);
});

// it('test always fails', async () => {
//   expect(true).toBe(false);
// });


// it("deletes a task when clicked", async () => {
//   const { findByText } = render(<App />);

//   await findByText("Do the dishes");
//   const deleteButton = await findByText("X");

//   userEvent.click(deleteButton);

//   await findByText("No Tasks Remaining");

// });
