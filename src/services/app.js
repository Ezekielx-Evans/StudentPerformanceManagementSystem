import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import {databaseInformation} from "./key.js";

const app = express();
app.use(cors());
app.use(express.json());

// 设置连接数据库的服务器
async function startServer() {

    // 使用 node.js 的 MySQL2 模块连接数据库
    const connection = await mysql.createConnection(databaseInformation);

    // 创建 HTTP 的 GET 请求
    // 学生信息
    app.get('/studentData', async (req, res) => {
        const number = req.query.number;
        try {
            const [rows] = await connection.query('SELECT * FROM student WHERE student_number = ?', [number]);
            // 如果没有找到
            if (rows.length === 0) {
                return res.status(404).send('未找到学生数据');
            }
            // 返回结果的 json 文档
            res.json(rows);
        } catch (err) {
            return res.status(500).send('学生数据查询失败');
        }
    });

    // 教师信息
    app.get('/teacherData', async (req, res) => {
        const number = req.query.number;
        try {
            const [rows] = await connection.query('SELECT * FROM teacher WHERE teacher_number = ?', [number]);
            // 如果没有找到
            if (rows.length === 0) {
                return res.status(404).send('未找到教师数据');
            }
            // 返回结果的 json 文档
            res.json(rows);
        } catch (err) {
            return res.status(500).send('教师数据查询失败');
        }
    });

    // 更新学生信息
    app.put('/updateStudent', async (req, res) => {
        const {password, phone, address, number} = req.body;
        try {
            const [result] = await connection.query('UPDATE student SET password = ?, phone_number = ?, student_address = ?  WHERE student_number = ?', [password, phone, address, number]);

            if (result.affectedRows === 0) {
                return res.status(404).send('未找到要更新的学生记录');
            } else {
            }
            res.json({success: true, message: '学生信息更新成功'});
        } catch (err) {
            console.error(err);
            res.status(500).send('学生信息更新失败');
        }
    })

    // 更新教师信息
    app.put('/updateTeacher', async (req, res) => {
        const {password, phone, address, number} = req.body;
        try {
            const [result] = await connection.query('UPDATE teacher SET password = ?, phone_number = ?, teacher_address = ?  WHERE teacher_number = ?', [password, phone, address, number]);

            if (result.affectedRows === 0) {
                return res.status(404).send('未找到要更新的教师记录');
            } else {
            }
            res.json({success: true, message: '教师信息更新成功'});
        } catch (err) {
            console.error(err);
            res.status(500).send('教师信息更新失败');
        }
    })

    // 查询课程信息
    app.get('/courseData', async (req, res) => {
        try {
            // 查询参数
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const offset = req.query.offset ? Number(req.query.offset) : 0;
            const subjectNumber = req.query.subjectNumber || '';
            const subjectName = req.query.subjectName || '';
            const teacherName = req.query.teacherName || '';
            const subjectTerm = req.query.subjectTerm || '';
            const subjectWeek = req.query.subjectWeek || '';
            const subjectDay = req.query.subjectDay || '';

            // 查询语句
            let baseQuery = `
                FROM subject s
                         LEFT JOIN teacher t ON s.teacher_id = t.teacher_id
                WHERE 1 = 1
            `;

            // 根据查询参数是否存在来判断是否更新查询语句
            const queryParams = [];
            if (subjectNumber) {
                baseQuery += ' AND s.subject_id LIKE ?';
                queryParams.push(`${subjectNumber}%`);
            }
            if (subjectName) {
                baseQuery += ' AND s.subject_name LIKE ?';
                queryParams.push(`%${subjectName}%`);
            }
            if (teacherName) {
                baseQuery += ' AND t.teacher_name LIKE ?';
                queryParams.push(`${teacherName}%`);
            }
            if (subjectTerm) {
                baseQuery += ' AND s.subject_term = ?';
                queryParams.push(subjectTerm);
            }
            if (subjectWeek) {
                baseQuery += ' AND s.subject_week = ?';
                queryParams.push(subjectWeek);
            }
            if (subjectDay) {
                baseQuery += ' AND s.subject_day = ?';
                queryParams.push(subjectDay);
            }

            // 获取分页数据
            const dataQuery = `
            SELECT s.subject_id,
                   s.subject_id,
                   s.subject_name,
                   t.teacher_name,
                   s.subject_term,
                   s.subject_week,
                   s.subject_day
            ${baseQuery}
            LIMIT ? OFFSET ?
            `;

            // 查询参数数组
            const dataParams = [...queryParams, limit, offset];

            // 获取符合条件的总数（分页）
            const [rows] = await connection.query(dataQuery, dataParams);

            // 获取符合条件的总数（不分页）
            const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
            const [countResult] = await connection.query(countQuery, queryParams);
            const total = countResult[0].total;

            res.json({
                total, data: rows
            });
        } catch (err) {
            return res.status(500).send('课程数据查询失败');
        }
    });

    // 课程学期信息
    app.get('/courseTermData', async (req, res) => {
        try {
            const [rows] = await connection.query('SELECT DISTINCT subject_term FROM subject;');
            // 返回结果的 json 文档
            res.json(rows);
        } catch (err) {
            return res.status(500).send('课程学期数据查询失败');
        }
    });

    // 查询成绩记录
    app.get('/gradeData', async (req, res) => {
        const studentId = req.query.id
        const subjectName = req.query.name
        const subjectTerm = req.query.term
        try {
            const [rows] = await connection.query('SELECT * FROM grade g JOIN subject s ON g.subject_id=s.subject_id WHERE student_number = ? AND subject_name = ? AND subject_term = ?', [studentId, subjectName, subjectTerm]);
            // 返回结果的 json 文档
            res.json(rows);
        } catch (err) {
            return res.status(500).send('成绩数据查询失败');
        }
    })


    // 选课后插入一条空成绩
    app.put('/insertGrade', async (req, res) => {
        const {studentId, subjectId} = req.body;
        try {
            const [result] = await connection.query('INSERT INTO grade (student_number, subject_id) VALUES (?, ?)', [studentId, subjectId]);
            if (result.affectedRows === 0) {
                return res.status(404).send('未成功更新成绩记录');
            }
            res.json({success: true, message: '成绩记录更新成功'});
        } catch (err) {
            console.error(err);
            res.status(500).send('成绩记录更新失败');
        }
    })

    // 更新课程记录
    app.put('/updateGrade', async (req, res) => {
        const {grade, gradeId} = req.body;
        try {
            const [result] = await connection.query('UPDATE grade SET grade=? WHERE grade_id = ?', [grade, gradeId]);
            if (result.affectedRows === 0) {
                return res.status(404).send('未成功更新成绩记录');
            }
            res.json({success: true, message: '成绩记录更新成功'});
        } catch (err) {
            console.error(err);
            res.status(500).send('成绩记录更新失败');
        }
    })

    // 查询学生成绩
    app.get('/studentGradeData', async (req, res) => {
        try {
            // 查询参数
            const studentId = req.query.studentId;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const offset = req.query.offset ? Number(req.query.offset) : 0;
            const subjectNumber = req.query.subjectNumber || '';
            const subjectName = req.query.subjectName || '';
            const teacherName = req.query.teacherName || '';
            const subjectTerm = req.query.subjectTerm || '';
            const subjectWeek = req.query.subjectWeek || '';
            const subjectDay = req.query.subjectDay || '';

            // 查询语句
            let baseQuery = `
                FROM grade g
                         JOIN
                     subject s ON g.subject_id = s.subject_id
                         LEFT JOIN
                     teacher t ON s.teacher_id = t.teacher_id
                WHERE g.student_number = ?
            `;

            const queryParams = [studentId];
            if (subjectNumber) {
                baseQuery += ' AND s.subject_id LIKE ?';
                queryParams.push(`${subjectNumber}%`);
            }
            if (subjectName) {
                baseQuery += ' AND s.subject_name LIKE ?';
                queryParams.push(`%${subjectName}%`);
            }
            if (teacherName) {
                baseQuery += ' AND t.teacher_name LIKE ?';
                queryParams.push(`${teacherName}%`);
            }
            if (subjectTerm) {
                baseQuery += ' AND s.subject_term = ?';
                queryParams.push(subjectTerm);
            }
            if (subjectWeek) {
                baseQuery += ' AND s.subject_week = ?';
                queryParams.push(subjectWeek);
            }
            if (subjectDay) {
                baseQuery += ' AND s.subject_day = ?';
                queryParams.push(subjectDay);
            }

            // 获取分页数据
            const dataQuery = `
            SELECT s.subject_id,
                   s.subject_id,
                   s.subject_name,
                   t.teacher_name,
                   s.subject_term,
                   s.subject_week,
                   s.subject_day,
                   g.grade
            ${baseQuery}
            LIMIT ? OFFSET ?
            `;

            // 查询参数数组
            const dataParams = [...queryParams, limit, offset];

            // 获取符合条件的总数（分页）
            const [rows] = await connection.query(dataQuery, dataParams);

            // 获取符合条件的总数（不分页）
            const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
            const [countResult] = await connection.query(countQuery, queryParams);
            const total = countResult[0].total;

            res.json({
                total, data: rows
            });
        } catch (err) {
            return res.status(500).send('课程数据查询失败');
        }
    })


    // 更新课程记录
    app.put('/deleteGrade', async (req, res) => {
        const {subjectId, studentId} = req.body;
        try {
            const [result] = await connection.query('DELETE FROM grade WHERE subject_id = ? AND student_number = ?', [subjectId, studentId]);
            if (result.affectedRows === 0) {
                return res.status(404).send('未成功删除选课记录');
            } else {
            }
            res.json({success: true, message: '选课记录删除成功'});
        } catch (err) {
            console.error(err);
            res.status(500).send('选课记录删除失败');
        }
    })

    app.get('/classWeekData', async (req, res) => {
        const studentId = req.query.id;
        const subjectDay = req.query.day;
        const subjectTerm = req.query.term;
        try {
            const [rows] = await connection.query('SELECT s.subject_week,s.subject_name FROM grade g JOIN subject s ON g.subject_id=s.subject_id WHERE g.student_number = ? AND s.subject_day = ? AND s.subject_term = ?', [studentId,subjectDay,subjectTerm]);
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('课表记录查询失败');
        }
    })

    app.put('/insertStudent', async (req, res) => {
        const {studentName,studentId,studentGender} = req.body;
        try {
            const [result] = await connection.query('INSERT INTO student (student_name,student_number,student_gender,password) VALUES (?, ?, ?,?)', [studentName,studentId,studentGender,'123456']);
            if (result.affectedRows === 0) {
                return res.status(404).send('未成功添加学生记录');
            } else {
            }
            res.json({success: true, message: '学生记录添加成功'});
        } catch (err) {
            console.error(err);
            res.status(500).send('学生记录添加失败');
        }
    })

    // 服务器在 3000 端口运行
    app.listen(3000, () => {
        console.log('服务器在 3000 端口上运行');
    });
}

// 启动服务器
startServer().catch(err => {
    console.error('服务器启动失败:', err);
});
