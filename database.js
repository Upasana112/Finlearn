const mysql = require('mysql');

function openCon() {
    const dbhost = '127.0.0.1';
    const dbuser = 'admin2';
    const dbpass = 'admin2';
    const db = 'finlearn';
    const conn = mysql.createConnection({
        host: dbhost,
        user: dbuser,
        password: dbpass,
        database: db
    });
    conn.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database.');
    });
    return conn;
}

function closeCon(conn) {
    conn.end((err) => {
        if (err) throw err;
        console.log('Connection closed.');
    });
}
const checkUserExists = (email) => {
    const conn = openCon();
    const sql = `SELECT f_name FROM students WHERE email='${email}' OR ph_no='${email}'`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0 ? 1 : 0);
            }
            closeCon(conn);
        });
    });
};

const getUserState = (email) => {
    const conn = openCon();
    const sql = `SELECT user_state FROM students WHERE email='${email}' OR ph_no='${email}'`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0 ? result[0].user_state : 0);
            }
            closeCon(conn);
        });
    });
};

const getEmail = (email) => {
    const conn = openCon();
    const sql = `SELECT email FROM students WHERE email='${email}' OR ph_no='${email}'`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0 ? result[0].email : 0);
            }
            closeCon(conn);
        });
    });
};

const getBalanceValues = (email) => {
    const conn = openCon();
    const sql = `SELECT * FROM students WHERE email='${email}' OR ph_no='${email}'`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    const row = result[0];
                    const obj = {
                        username: row.username,
                        f_name: row.f_name,
                        l_name: row.l_name,
                        email: row.email,
                        ph_no: row.ph_no,
                        wallet_balance: row.wallet_balance,
                        user_state: row.user_state
                    };
                    const json = JSON.stringify(obj);
                    resolve(json);
                } else {
                    resolve('nf');
                }
            }
            closeCon(conn);
        });
    });
};

const getBalanceValues2 = (email) => {
    const conn = openCon();
    const sql = `SELECT * FROM students WHERE email='${email}' OR ph_no='${email}'`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0 ? result[0].wallet_balance : 'nf');
            }
            closeCon(conn);
        });
    });
};

const createUser = (username, email, f_name, l_name, ph_no, psw_hash) => {
    username = email;
    const conn = openCon();
    const sql = `INSERT INTO students (username, f_name, l_name, email, ph_no, psw_hash, user_state, wallet_balance) VALUES ('${username}', '${f_name}', '${l_name}', '${email}', '${ph_no}', '${psw_hash}', 'user_first', '10000')`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(1);
            }
            closeCon(conn);
        });
    });
};

const login = (email, psw_hash) => {
    const conn = openCon();
    const sql = `SELECT * FROM students WHERE (email='${email}' OR ph_no='${email}') AND psw_hash='${psw_hash}'`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    const row = result[0];
                    const obj = {
                        username: row.username,
                        f_name: row.f_name,
                        l_name: row.l_name,
                        email: row.email,
                        ph_no: row.ph_no,
                        wallet_balance: row.wallet_balance,
                        user_state: row.user_state
                    };
                    const json = JSON.stringify(obj);
                    resolve(json);
                } else {
                    resolve('nf');
                }
            }
            closeCon(conn);
        });
    });
};

const addStock = (username, stock_name, stock_quantity, stock_price) => {
    const conn = openCon();
    const sql = `INSERT INTO stocks (username, stock_name, stock_quantity, stock_price, stock_gain) VALUES ('${username}', '${stock_name}', '${stock_quantity}', '${stock_price}', 0)`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(1);
            }
            closeCon(conn);
        });
    });
};

const updateBalance = (username, bal) => {
    const conn = openCon();
    const sql = `UPDATE students SET wallet_balance='${bal}' WHERE email='${username}'`;

    return new Promise((resolve, reject) => {
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve('1');
            }
            closeCon(conn);
        });
    });
};

module.exports = {
    checkUserExists,
    getUserState,
    getEmail,
    getBalanceValues,
    getBalanceValues2,
    createUser,
    login,
    addStock,
    updateBalance
};