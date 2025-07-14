# AI Chat Widget

A lightweight, customizable React chat widget that connects to your AI backend via webhooks.

## Installation

```bash
npm install ai-chat-widget
```

## Usage

```tsx
import { AIChatWidget } from "ai-chat-widget";

function App() {
    return (
        <div>
            <AIChatWidget webhookUrl="https://your-api.com/chat" title="AI Assistant" initialMessage="Hello! How can I help you today?" />
        </div>
    );
}
```

## Props

| Prop             | Type     | Required | Default                              | Description             |
| ---------------- | -------- | -------- | ------------------------------------ | ----------------------- |
| `webhookUrl`     | `string` | ✅       | -                                    | Your chat API endpoint  |
| `title`          | `string` |          | `"AI Assistant"`                     | Chat widget title       |
| `initialMessage` | `string` |          | `"Hello! How can I help you today?"` | Welcome message         |
| `sessionId`      | `string` |          | `"sample_session"`                   | Session identifier      |
| `csrfToken`      | `string` |          | `""`                                 | CSRF token for security |

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

-   🎨 Clean, modern UI with smooth animations
-   📱 Mobile responsive design
-   ⌨️ Keyboard navigation (Enter to send)
-   💬 Typing indicators
-   🔒 CSRF token support
-   🎯 Floating chat button
-   ⚡ Lightweight and fast

## Styling

The widget comes with built-in styles. It positions itself as a floating button in the bottom-right corner and expands into a chat interface when clicked.

## License

MIT
