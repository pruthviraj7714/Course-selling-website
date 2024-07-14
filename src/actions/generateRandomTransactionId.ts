export default function generateRandomTransactionId(): string {
  return (
    "tx-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).substr(2, 9)
  );
}
