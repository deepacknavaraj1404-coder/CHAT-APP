const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files
app.use(express.static('public'));

// Store connected users
const users = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining
    socket.on('user-joined', (username) => {
        users.set(socket.id, username);
        
        // Send updated user list to all clients
        io.emit('user-list', Array.from(users.values()));
        
        // Broadcast join message
        socket.broadcast.emit('user-connected', username);
    });

    // Handle incoming messages
    socket.on('send-message', (data) => {
        const username = users.get(socket.id);
        io.emit('receive-message', {
            username: username,
            message: data.message,
            timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        });
    });

    // Handle typing indicator
    socket.on('typing', () => {
        const username = users.get(socket.id);
        socket.broadcast.emit('user-typing', username);
    });

    socket.on('stop-typing', () => {
        socket.broadcast.emit('user-stop-typing');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        if (username) {
            users.delete(socket.id);
            io.emit('user-list', Array.from(users.values()));
            io.emit('user-disconnected', username);
        }
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
