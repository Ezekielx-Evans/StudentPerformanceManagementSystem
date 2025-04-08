import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 设置连接数据库的服务器
async function startServer() {

    // 使用 node.js 的 MySQL2 模块连接数据库
    const connection = await mysql.createConnection({
        host: '124.221.143.80',
        user: 'root',
        password: 'MYQ888OTEN',
        database: 'student_performance_management_system',
    });

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
            const [result] = await connection.query(
                'UPDATE student SET password = ?, phone_number = ?, student_address = ?  WHERE student_number = ?',
                [password, phone, address, number]
            );

            if (result.affectedRows === 0) {
                return res.status(404).send('未找到要更新的学生记录');
            }else {
            }
            res.json({success: true, message: '学生信息更新成功'});
        } catch (err) {
            console.error(err);
            res.status(500).send('学生信息更新失败');
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
