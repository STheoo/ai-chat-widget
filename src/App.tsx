import { AIChatWidget } from "ai-chat-widget";

function App() {
    return (
        <>
            <div style={{ padding: "20px", minHeight: "100vh" }}>
                <h1>AI Chat Widget Demo</h1>
                <p>This is a demo page with the AI chat widget. Click the chat button in the bottom right to start chatting!</p>
                <div style={{ marginTop: "40px" }}>
                    <h2>Features:</h2>
                    <ul>
                        <li>Fixed positioning chat button</li>
                        <li>Smooth animations and transitions</li>
                        <li>Responsive design for mobile devices</li>
                        <li>Dummy AI responses with keyword recognition</li>
                        <li>Message timestamps</li>
                        <li>Modern, clean UI design</li>
                    </ul>
                </div>
            </div>
            <AIChatWidget webhookUrl="https://mspn8n.savvastheocharous.com/webhook/cb75731e-d683-4a8e-a907-6a6b753b2f87" />
        </>
    );
}

export default App;
