for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
        socket.onmessage({
            data: JSON.stringify({
                type: "message",
                topic: "channel.activities",
                data: {
                    type: "subscriber",
                    provider: "twitch",
                    data: {
                        username: `testuser${i}`,
                        displayName: `TestUser${i}`,
                        amount: 1
                    }
                }
            })
        });
    }, i * 300); // Sends each sub event 300ms apart
}