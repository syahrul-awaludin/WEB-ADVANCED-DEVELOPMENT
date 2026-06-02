// File: src/routes/tasks.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tasks.controller');
const validate = require('../middleware/validate');
const {
  createTaskSchema,
  replaceTaskSchema,
  updateTaskSchema,
  listTasksSchema,
} = require('../validators/task.validator');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Ambil daftar task dengan pagination, filtering, dan sorting
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [todo, in_progress, done]
 *         description: Filter berdasarkan status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter berdasarkan priority
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, title, priority]
 *           default: createdAt
 *         description: Field untuk sorting
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Urutan sorting
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Jumlah data per halaman (maks 100)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Jumlah data yang dilewati
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar task
 */
router.get('/', validate(listTasksSchema, 'query'), ctrl.listTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Buat task baru
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Task berhasil dibuat
 *       400:
 *         description: Data tidak valid
 */
router.post('/', validate(createTaskSchema, 'body'), ctrl.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Ambil detail task berdasarkan ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID task
 *     responses:
 *       200:
 *         description: Berhasil mengambil detail task
 *       404:
 *         description: Task tidak ditemukan
 */
router.get('/:id', ctrl.getTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Ganti seluruh data task (full replace)
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       200:
 *         description: Task berhasil diperbarui
 *       400:
 *         description: Data tidak valid
 *       404:
 *         description: Task tidak ditemukan
 */
router.put('/:id', validate(replaceTaskSchema, 'body'), ctrl.replaceTask);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Perbarui sebagian field task (partial update)
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID task
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
 *               status:
 *                 type: string
 *                 enum: [todo, in_progress, done]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task berhasil diperbarui
 *       400:
 *         description: Data tidak valid
 *       404:
 *         description: Task tidak ditemukan
 */
router.patch('/:id', validate(updateTaskSchema, 'body'), ctrl.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Hapus task berdasarkan ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID task
 *     responses:
 *       204:
 *         description: Task berhasil dihapus
 *       404:
 *         description: Task tidak ditemukan
 */
router.delete('/:id', ctrl.deleteTask);

module.exports = router;
