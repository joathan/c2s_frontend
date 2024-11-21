import cable from "@rails/actioncable";

interface Cable {
  subscriptions: {
    create: (
      channel: { channel: string; user_id: number },
      callbacks: { received: (data: any) => void }
    ) => { unsubscribe: () => void };
  };
}

const CableApp: { cable: Cable } = {
  cable: cable.createConsumer("ws://localhost:3300/cable"),
};

export default CableApp;
