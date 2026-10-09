
export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      ok: false,
      message: "Method not allowed"
    });
  }

  let body;

  try {
    body = typeof request.body === "string"
      ? JSON.parse(request.body)
      : request.body;
  } catch {
    return response.status(400).json({
      ok: false,
      message: "Invalid JSON"
    });
  }

  const task = body?.task;

  const allowedTasks = [
    "story",
    "caption",
    "hashtags",
    "editing-instructions"
  ];

  if (
    typeof task !== "string" ||
    !allowedTasks.includes(task)
  ) {
    return response.status(400).json({
      ok: false,
      message: "Choose a supported creator task."
    });
  }

  return response.status(200).json({
    ok: true,
    service: "creator-copilot-api",
    task,
    aiConnected: false,
    message: "Request received. AI is not connected yet."
  });
}
