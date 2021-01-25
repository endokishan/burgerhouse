import { eventEmitter, Server } from './server'

let serverApp = new Server().app;

const PORT = process.env.PORT || 8000;

const server = serverApp.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Socket Connection
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    socket.on('join', (orderId) => {
        socket.join(orderId);
    })
})

// Order Updated Event
eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data);
});

// Order Placed Event
eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data);
});