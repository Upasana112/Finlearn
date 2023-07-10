const express = require('express');
const app = express();
const functions=require('./database.js');
var bodyParser = require('body-parser')
// Other required imports and configurations
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/html/home_page.html');
});
app.post('/register', (req, res) => {
    const { f_name, l_name, email, psw, c_psw, ph_no } = req.body;
    let err = 0;
    const vals = {};

    function check_name(name) {
        let val = 1;
        if (name != "" && name != null && name.length >= 3) {
            if (!/^[a-zA-Z\s]*$/.test(name)) {
                val = "Only alphabets and whitespace are allowed";
            }
        } else {
            val = "Please enter a valid Name";
        }
        return val;
    }

    function check_mail(mail) {
        let val = 1;
        if (mail != "" && mail != null && mail.length >= 6) {
            if (
                !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    mail
                )
            ) {
                val = "Please enter a valid Email Id";
            }
        } else {
            val = "Please enter a valid Email Id";
        }
        return val;
    }

    function check_psw(pwd) {
        let val = 1;
        if (pwd != "" && pwd != null && pwd.length >= 6) {
            if (
                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
                    pwd
                )
            ) {
                val = "Please enter a password with 7-16 characters, one lowercase & uppercase, and one special character";
            }
        } else {
            val = "Please enter a password with 7-16 characters, one lowercase & uppercase, and one special character";
        }
        return val;
    }

    function check_c_psw(psw, pwd) {
        let val = 1;
        if (pwd != "" && pwd != null && pwd.length >= 6) {
            if (
                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
                    pwd
                )
            ) {
                val = "Please enter a password with 7-16 characters, one lowercase & uppercase, and one special character";
            }
            if (psw != pwd) {
                val = "Confirm Password Should Match";
            }
        } else {
            val = "Confirm Password Should Match";
        }
        return val;
    }

    function check_ph_no(mob) {
        if (/^\d+\.?\d*$/.test(mob) && mob.length == 10) {
            return 1;
        } else {
            return "Enter a valid Phone Number";
        }
    }

    const f_name_json = {
        val: f_name,
        err: check_name(f_name),
    };
    vals["f_name"] = f_name_json;
    if (check_name(f_name) != 1) {
        err++;
    }

    const l_name_json = {
        val: l_name,
        err: check_name(l_name),
    };
    vals["l_name"] = l_name_json;
    if (check_name(l_name) != 1) {
        err++;
    }

    const email_json = {
        val: email,
        err: check_mail(email),
    };
    vals["email"] = email_json;
    if (check_mail(email) != 1) {
        err++;
    }

    const psw_json = {
        val: psw,
        err: check_psw(psw),
    };
    vals["psw"] = psw_json;
    if (check_psw(psw) != 1) {
        err++;
    }

    const c_psw_json = {
        val: c_psw,
        err: check_c_psw(psw, c_psw),
    };
    vals["c_psw"] = c_psw_json;
    if (check_c_psw(psw, c_psw) != 1) {
        err++;
    }

    const ph_no_json = {
        val: ph_no,
        err: check_ph_no(ph_no),
    };
    vals["ph_no"] = ph_no_json;
    if (check_ph_no(ph_no) != 1) {
        err++;
    }

    if (err == 0) {
        // Call create_user function and handle the response
        functions.createUser(email, email, f_name, l_name, ph_no, psw)
            .then((resp) => {
                console.log(resp);
                res.redirect('/html/login_page.html');
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        res.status(400).json({ errors: vals });
    }
});

app.post('/login', (req, res) => {
    console.log(req.body)
   

    let username=req.body.username;
    let password=req.body.password;

    functions.login(username, password)
        .then((resp) => {
            if (resp === 'nf') {
                const err = { val: 'Invalid Credentials' };
                res.status(401).json({ error: err });
            } else {
                res.cookie('user_data', resp, { maxAge: 900000, httpOnly: true });
                res.redirect('/html/stocks_page.html')
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


app.get('/search', (req, res) => {
    const { keyword } = req.query;
    const apiKey = 'YOUR_API_KEY'; // Replace with your own Alpha Vantage API key

    axios
        .get(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&datatype=json&keywords=${keyword}&apikey=${apiKey}`
        )
        .then((response) => {
            const data = response.data;
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});
app.get('/update', (req, res) => {
    console.log(req.query)
    const { email } = req.query;
    console.log(email)
    // require_once($_SERVER['DOCUMENT_ROOT'] . '/php/database_get_data.php');
    // You can implement the database_get_data.php functionality in Node.js here

    functions.getBalanceValues(email)
        .then((resp) => {
            console.log(resp)
            if (resp === 'nf') {
                res.status(404).json({ error: 'User not found' });
            } else {
        
                res.status(200).json(resp);
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.get('/buy', (req, res) => {
    const { email, stock_name, stock_quantity, stock_price } = req.query;

    // require_once($_SERVER['DOCUMENT_ROOT'] . '/php/database_get_data.php');
    // require_once($_SERVER['DOCUMENT_ROOT'] . '/php/database_set_data.php');
    // You can implement the database_get_data.php and database_set_data.php functionality in Node.js here

    const price = parseFloat(stock_price) * parseFloat(stock_quantity);

   functions. getBalanceValues2(email)
        .then((resp) => {
            const balance = parseFloat(resp);
            if (price <= balance) {
                const remainingBalance = balance - price;
                functions.addStock(email, stock_name, stock_quantity, stock_price)
                    .then(() => {
                        functions.updateBalance(email, remainingBalance)
                            .then(() => {
                                //res.status(200).json({ message: 'Stock purchased successfully' });
                                res.redirect('/html/holdings.html')
                            })
                            .catch((error) => {
                                console.error(error);
                                res.status(500).json({ error: 'Failed to update balance' });
                            });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error: 'Failed to add stock' });
                    });
            } else {
                res.status(400).json({ error: 'Insufficient balance' });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
