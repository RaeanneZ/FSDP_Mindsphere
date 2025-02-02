import { useState } from "react";
import Button from "../components/Button";
import Textarea from "../components/Textarea";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import backendService from "../utils/backendService";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BroadcastPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { dashboardService } = backendService;

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await dashboardService.sendBroadcastMessage(message);
      toast.success("Broadcast message sent successfully!");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-lightBlue p-4">
        <Card className="w-full max-w-lg shadow-lg rounded-2xl bg-white">
          <CardContent className="p-6">
            <h1 className="text-darkBlue text-2xl font-bold mb-4 text-center">
              WhatsApp Broadcast Message
            </h1>
            <Textarea
              className="w-full h-40 p-3 border border-darkGrey rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="mt-4 w-full bg-yellow text-darkGrey font-bold rounded-lg p-3 hover:bg-lightYellow"
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Broadcast"}
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
