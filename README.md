# WebRTC Video Calling App (P2P)

WebRTC is a peer to peer protocol. This means the you directly send your media over to the other person without the need of a central server

![Untitled](https://github.com/rj8574/Video-Calling-app/assets/63467021/49adc56d-286b-4238-9a23-67c917a7aa52)

# Signalling server

Both the browsers need to exchange their address before they can start talking to each other. A signaling server is used for that. 

<img width="1000" alt="Screenshot_2024-05-04_at_4 16 23_PM" src="https://github.com/rj8574/Video-Calling-app/assets/63467021/ac26e2de-b899-4654-bc38-88ee7d88f198">

# Connecting the two sides

![Untitled1](https://github.com/rj8574/Video-Calling-app/assets/63467021/7f896e95-fe71-4f97-b352-e80f93ac10e6)

## Tech Stack

**Client:** React, WebRTC, SOCKET.IO

**Server:** Node, Express
# Advantages:
- Scalability: Works well for small groups as direct peer-to-peer connections reduce server load.
- Latency: Under the right network conditions there’s minimal latency due to direct communication between peers.
- Privacy: No central server involved, potentially enhancing privacy.
# Limitations:
- Scalability: Doesn’t scale well for large numbers of participants due to complex connection management.
- Security: Requires additional security measures to manage peer discovery and authentication.
- Network Issues: Relies on good peer-to-peer connectivity, which can be affected by firewalls, NAT (Network Address Translation), or general network congestion.

# Project Results

![image](https://github.com/rj8574/Video-Calling-app/assets/63467021/1cac9fd2-d874-4a64-881d-fc4a3da940d4)

