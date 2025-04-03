const express = require('express');
const router = express.Router();
const caseController = require("../controllers/caseController");

/**
 * @swagger
 * /cases:
 *   post:
 *     summary: Create a new case
 *     description: Creates a new case and stores it in the database.
 *     tags:
 *       - Cases
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               date:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Case created successfully
 *       500:
 *         description: Error creating case
 */
router.post("/cases", caseController.createCase);

/**
 * @swagger
 * /cases:
 *   get:
 *     summary: Get all cases
 *     description: Retrieves a list of all cases.
 *     tags:
 *       - Cases
 *     responses:
 *       200:
 *         description: List of cases
 *       404:
 *         description: No cases found
 */
router.get("/cases", caseController.getAllCases);

/**
 * @swagger
 * /cases/{id}:
 *   get:
 *     summary: Get a case by ID
 *     description: Retrieves a case by its unique identifier.
 *     tags:
 *       - Cases
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the case to retrieve
 *     responses:
 *       200:
 *         description: Case found
 *       404:
 *         description: Case not found
 */
router.get("/cases/:id", caseController.getCaseById);

/**
 * @swagger
 * /cases/{id}/suspects:
 *   post:
 *     summary: Add a suspect to a case
 *     description: Adds a suspect to the specified case.
 *     tags:
 *       - Cases
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the case to add the suspect to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               known_aliases:
 *                 type: string
 *               last_seen_date:
 *                 type: string
 *               last_seen_location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Suspect added successfully
 *       500:
 *         description: Error adding suspect
 */
router.post("/cases/:id/suspects", caseController.addSuspect);

/**
 * @swagger
 * /cases/{id}/solve:
 *   put:
 *     summary: Mark case as solved
 *     description: Updates the case status to "solved".
 *     tags:
 *       - Cases
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the case to mark as solved
 *     responses:
 *       200:
 *         description: Case marked as solved
 *       404:
 *         description: Case not found
 */
router.put("/cases/:id/solve", caseController.markCaseAsSolved);

/**
 * @swagger
 * /cases/{id}:
 *   delete:
 *     summary: Delete a case
 *     description: Deletes the specified case.
 *     tags:
 *       - Cases
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the case to delete
 *     responses:
 *       200:
 *         description: Case successfully deleted
 *       404:
 *         description: Case not found
 */
router.delete("/cases/:id", caseController.deleteCase);

module.exports = router;
