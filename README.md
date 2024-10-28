# Backend - BE-realtime-stats

## Overview
This backend service is built using NestJS. It establishes a WebSocket (ws) connection with Binance's public API to receive real-time trade data for Bitcoin in USD. The service receives the average price in USD along with the last trade time, processes the price into multiple currencies (PKR, EUR), and emits this information via a Socket.IO connection to the frontend for live updates.

## Features
- Connects to Binance WebSocket API to fetch real-time Bitcoin trade data.
- Processes the average price in multiple currencies (USD, PKR, EUR).
- Emits processed trade data to the frontend through a Socket.IO server.

## Running the Application Locally

### Prerequisites
- Node.js (v20.15.0 or higher)
- NPM (10.7.0 or higher)

### Steps
1. Clone the repository.
2. Copy the environment variables from `.env.example` and save them in a `.env` file.
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run start:dev
    ```

### Latest branch
main

## Dependencies
- @nestjs/common
- @nestjs/config
- @nestjs/platform-express
- @nestjs/platform-socket.io
- @nestjs/websockets
- ws
- socket.io
