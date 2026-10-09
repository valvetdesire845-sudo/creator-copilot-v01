
export default function handler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  return response.status(200).json({
    ok: true,
    service: "creator-copilot-api",
    message: "Backend is running. AI is not connected yet."
  });
}
