import { Server } from './server'

let server = new Server().app;

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
