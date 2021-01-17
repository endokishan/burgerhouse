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
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cart', (req, res) => {
    res.render('customers/cart')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
