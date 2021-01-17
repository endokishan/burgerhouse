import express from 'express';
import ejs from 'ejs';
import expressLayout from 'express-ejs-layouts';
import path from 'path'

const app = express();
const PORT = process.env.PORT || 8000;

// Assets
app.use(express.static(path.join(__dirname, 'public')));

// set Template Engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


// Routes
// Home Page
app.get('/', (req, res) => {
    res.render('home');
});
// Cart Page
app.get('/cart', (req, res) => {
    res.render('customers/cart');
});
// Login Page
app.get('/login', (req,res) => {
    res.render('auth/login');
});
// Register Page
app.get('/register', (req,res) => {
    res.render('auth/register');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
