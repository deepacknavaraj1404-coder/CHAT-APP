# Mini WhatsApp Clone - Real-Time Chat App

A real-time chat application built with Node.js, Express, and Socket.IO. Users can join by clicking a link, see all online users in the left sidebar, and chat in real-time!

## Features

✨ **Real-time messaging** - Messages appear instantly for all users
👥 **Live user list** - See everyone who's online in the left sidebar
💬 **Typing indicators** - Know when someone is typing
🎨 **WhatsApp-inspired UI** - Clean, modern interface
📱 **Responsive design** - Works on desktop and mobile
🔔 **Join/leave notifications** - Get notified when users enter or leave

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

4. **Test with multiple users:**
   Open multiple browser tabs/windows to simulate different users

## Deployment Options

### Option 1: Render (Recommended - Free & Easy)

1. **Create a Render account:** https://render.com

2. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use the "Deploy from Git")
   - Configure:
     - **Name:** your-chat-app
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Click "Create Web Service"

3. **Your app will be live at:** `https://your-chat-app.onrender.com`

### Option 2: Railway

1. **Create a Railway account:** https://railway.app

2. **Deploy:**
   - Click "New Project" → "Deploy from GitHub repo"
   - Or use Railway CLI: `railway init` then `railway up`

3. **Configure:**
   - Railway auto-detects Node.js
   - Set start command: `npm start`

4. **Get your URL** from the Railway dashboard

### Option 3: Heroku

1. **Install Heroku CLI:** https://devcenter.heroku.com/articles/heroku-cli

2. **Deploy:**
   ```bash
   heroku login
   heroku create your-chat-app
   git push heroku main
   ```

3. **Open your app:**
   ```bash
   heroku open
   ```

### Option 4: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

## Project Structure

```
whatsapp-clone/
├── server.js           # Express + Socket.IO server
├── package.json        # Dependencies and scripts
├── public/
│   ├── index.html      # Main HTML structure
│   ├── style.css       # WhatsApp-inspired styles
│   └── app.js          # Client-side Socket.IO logic
└── README.md          # This file
```

## How It Works

1. **User joins** - Enters their name and clicks "Join Chat"
2. **Socket connection** - WebSocket connection established
3. **User list updates** - All users see the new participant in the sidebar
4. **Real-time messaging** - Messages broadcast to all connected users
5. **Typing indicators** - Shows when someone is typing
6. **Disconnect handling** - Users removed from list when they leave

## Customization

### Change Port
Edit `server.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your port
```

### Modify Colors
Edit `public/style.css` - Look for gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Features
Some ideas:
- Private messaging
- Message history (with database)
- File/image sharing
- Emojis
- User avatars
- Message read receipts

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **HTML/CSS/JavaScript** - Frontend

## Environment Variables

For deployment, you may need to set:
- `PORT` - The port your app runs on (auto-set by most platforms)

## Sharing Your App

Once deployed, simply share your deployment URL with anyone:
- Render: `https://your-app.onrender.com`
- Railway: `https://your-app.up.railway.app`
- Heroku: `https://your-app.herokuapp.com`

Anyone who clicks the link can join and start chatting!

## Troubleshooting

**Users can't connect:**
- Check if the server is running
- Verify firewall settings
- Ensure PORT environment variable is set correctly

**Messages not appearing:**
- Check browser console for errors
- Verify Socket.IO connection in Network tab

**Deployment issues:**
- Make sure `package.json` has correct start script
- Check platform logs for errors
- Verify all files are committed to Git

## License

MIT License - Feel free to use this project however you like!

## Support

For issues or questions, check the Socket.IO documentation:
- https://socket.io/docs/
- https://expressjs.com/

Happy chatting! 💬
