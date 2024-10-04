class WebSocketService {
    static instance = null;
    callbacks = {};

    constructor() {
        this.socketRef = null;
    }

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    // Connect to the WebSocket server
    connect(userId) {
        const wsUrl = `ws://localhost:8080/api/messages/ws?user_id=${userId}`;
        this.socketRef = new WebSocket(wsUrl);

        this.socketRef.onopen = () => {
            console.log("WebSocket connected");
        };

        this.socketRef.onmessage = (event) => {
            console.log("WebSocket message received:", event.data);
            this.socketNewMessage(event.data);
        };

        this.socketRef.onclose = () => {
            this.connect(userId);  // Reconnect on close
        };

        this.socketRef.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }

    // Close the WebSocket connection
    disconnect() {
        if (this.socketRef) {
            this.socketRef.close();
        }
    }

    // Handle incoming messages
    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const receiverId = parsedData.receiver_id;

        if (Object.keys(this.callbacks).length > 0) {
            this.callbacks[receiverId](parsedData);  // Trigger callback for the receiver
        }
    }

    // Register a callback for when messages are received
    addCallbacks(receiverId, callback) {
        this.callbacks[receiverId] = callback;
    }

    // Send a message through the WebSocket
    sendMessage(message) {
        if (this.socketRef.readyState === WebSocket.OPEN) {
            this.socketRef.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not open. Unable to send message.");
        }
    }

    // Check if WebSocket is open
    waitForSocketConnection(callback) {
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(() => {
            if (socket.readyState === 1) {
                console.log("Connection is open, executing callback.");
                if (callback) {
                    callback();
                }
            } else {
                console.log("Waiting for connection...");
                recursion(callback);
            }
        }, 100);
    }
}

export default WebSocketService;
