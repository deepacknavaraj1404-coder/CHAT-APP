const socket = io();

let currentUsername = '';
let typingTimer;
const typingDelay = 1000;

// DOM Elements
const usernameModal = document.getElementById('username-modal');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const chatContainer = document.getElementById('chat-container');
const userList = document.getElementById('user-list');
const userCount = document.getElementById('user-count');
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

// Join chat on button click
joinBtn.addEventListener('click', joinChat);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') joinChat();
});

function joinChat() {
    const username = usernameInput.value.trim();
    
    if (username === '') {
        alert('Please enter a valid name!');
        return;
    }
    
    currentUsername = username;
    socket.emit('user-joined', username);
    
    // Hide modal and show chat
    usernameModal.style.display = 'none';
    chatContainer.style.display = 'flex';
    messageInput.focus();
}

// Update user list
socket.on('user-list', (users) => {
    userList.innerHTML = '';
    userCount.textContent = users.length;
    
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        
        const avatar = document.createElement('div');
        avatar.className = 'user-avatar';
        avatar.textContent = user.charAt(0).toUpperCase();
        
        const userName = document.createElement('div');
        userName.className = 'user-name';
        userName.textContent = user;
        if (user === currentUsername) {
            userName.textContent += ' (You)';
        }
        
        userItem.appendChild(avatar);
        userItem.appendChild(userName);
        userList.appendChild(userItem);
    });
});

// User connected notification
socket.on('user-connected', (username) => {
    addSystemMessage(`${username} joined the chat`);
});

// User disconnected notification
socket.on('user-disconnected', (username) => {
    addSystemMessage(`${username} left the chat`);
});

// Send message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    socket.emit('send-message', { message });
    messageInput.value = '';
    socket.emit('stop-typing');
}

// Receive message
socket.on('receive-message', (data) => {
    addMessage(data);
});

// Typing indicator
messageInput.addEventListener('input', () => {
    socket.emit('typing');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        socket.emit('stop-typing');
    }, typingDelay);
});

socket.on('user-typing', (username) => {
    typingIndicator.textContent = `${username} is typing...`;
});

socket.on('user-stop-typing', () => {
    typingIndicator.textContent = '';
});

// Add message to chat
function addMessage(data) {
    const messageDiv = document.createElement('div');
    messageDiv.className = data.username === currentUsername ? 'message sent' : 'message received';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (data.username !== currentUsername) {
        const usernameDiv = document.createElement('div');
        usernameDiv.className = 'message-username';
        usernameDiv.textContent = data.username;
        messageContent.appendChild(usernameDiv);
    }
    
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = data.message;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = data.timestamp;
    
    messageContent.appendChild(messageText);
    messageContent.appendChild(messageTime);
    messageDiv.appendChild(messageContent);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add system message
function addSystemMessage(text) {
    const systemDiv = document.createElement('div');
    systemDiv.className = 'system-message';
    
    const content = document.createElement('div');
    content.className = 'system-message-content';
    content.textContent = text;
    
    systemDiv.appendChild(content);
    messagesContainer.appendChild(systemDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
