import React, { useEffect, useState } from "react";
import actionCable from "actioncable";
import { useAuth } from "../contexts/AuthContext";

interface NotificationTypes {
  user: number;
  message: string;
}

const Notifications: React.FC = () => {
  const cableApp = actionCable.createConsumer("ws://localhost:3300/cable"); // Substitua pelo endereço correto
  const [channel, setChannel] = useState<null | actionCable.Channel>(null);
  const { userId } = useAuth(); // Obtemos o `userId` do contexto de autenticação

  useEffect(() => {
    if (!userId) return;

    if (channel !== null) channel.unsubscribe();
    // Remove possíveis conexões duplicadas

    const newChannel = cableApp.subscriptions.create(
      {
        channel: "NotificationChannel",
        user_id: userId,
      },
      {
        received: (message: NotificationTypes) => {
          // Executa essa função ao receber uma mensagem do servidor
          console.log("Notificação recebida 🎉");
          console.log(message);
          alert(`Nova mensagem: ${message.message}`);
        },
      }
    );

    setChannel(newChannel);

    return () => {
      newChannel.unsubscribe();
      console.log("Conexão com o canal encerrada.");
    };
  }, [userId]); // Reexecuta apenas quando o userId muda

  return null; // Este componente é invisível e não precisa renderizar nada na interface
};

export default Notifications;