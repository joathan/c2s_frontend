import React, { useEffect, useState } from "react";
import actionCable from "actioncable";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface NotificationTypes {
  user: number;
  message: string;
}

const Notifications: React.FC = () => {
  const cableApp = actionCable.createConsumer("ws://localhost:3300/cable"); // Substitua pelo endereço correto
  const [channel, setChannel] = useState<null | actionCable.Channel>(null);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    if (channel !== null) channel.unsubscribe();

    const newChannel = cableApp.subscriptions.create(
      {
        channel: "NotificationChannel",
        user_id: userId,
      },
      {
        received: (message: NotificationTypes) => {
          console.log("Notificação recebida 🎉");
          console.log(message);
          toast.success(`Task atualizada: ${message.message}`);
        },
      }
    );

    setChannel(newChannel);

    return () => {
      newChannel.unsubscribe();
      console.log("Conexão com o canal encerrada.");
    };
  }, [userId]);

  return <ToastContainer position="top-right" autoClose={7000} />;
};

export default Notifications;
