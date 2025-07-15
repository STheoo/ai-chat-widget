# AI Chat Widget

<p align="center">
  <img src="https://img.shields.io/npm/v/@stheo/ai-chat-widget" />
  <img src="https://img.shields.io/npm/l/@stheo/ai-chat-widget" />
</p>

A lightweight, customizable React chat widget that connects to your AI backend via webhooks. Built specifically for n8n users in mind, the goal is to make it dead simple to connect to your Conversational AI Agent n8n workflows (e.g. customer support chatbot).

https://github.com/user-attachments/assets/c6d35cc1-8ebb-46ee-94f7-df6981a834d1

## Installation

```bash
npm install @stheo/ai-chat-widget
```

## Usage

```tsx
import { AIChatWidget } from "@stheo/ai-chat-widget";

function App() {
    return (
        <>
            <AIChatWidget webhookUrl="https://your-api.com/chat" title="AI Assistant" initialMessage="Hello! How can I help you today?" />
        </>
    );
}
```

## Props

-   `webhookUrl (required)`: Webhook endpoint to post to.
-   `title (optional)`: AI Chat widget title.
-   `initialMessage (optional)`: AI Chat initial message.
-   `sessionId (optional)`: Configure a session id to send to your AI workflows.
-   `csrfToken (optional)`: Option to add a csrf token in order to send post request server-side for security.

## API Format

Your webhook should accept POST requests with:

```json
{
    "prompt": "user message",
    "session_id": "session_id"
}
```

And respond with:

```json
{
    "output": "AI response message"
}
```

## Features

This is currently a pre-release version with the very basic features that we will expand in the future.

-   Clean Animations Using Pure CSS
-   Mobile Responsive Design
-   Keyboard Navigation
-   Typing Indicators
-   CSRF Token Support
-   Lightweight and fast.

## Incoming Upgrades

-   Apply React Portal Escape
-   UI Design Enhancements
-   Full Accessiblity
-   Compound Component Design Pattern
-   Full Customizability
-   Item Carousels for AI Recommendation Systems
-   Authentication Options
-   File Attachement Support

## Styling

The widget comes with built-in styles. It positions itself as a floating button in the bottom-right corner and expands into a chat interface when clicked.

## How you can support me

I appreciate you visiting my repository! It would mean a lot if you could give me your feedback or atleast leaving a star on your way out. If you would like to contribute I am also open to discuss privately.

## License

MIT
