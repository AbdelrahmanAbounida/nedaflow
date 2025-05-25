// This is for streaming calls
type DataStream = ReadableStreamDefaultReader<Uint8Array>;

/* *************************************** */

const getResponseReader = async <T>(
  url: string,
  body: T,
  method: string = "POST"
): Promise<DataStream | undefined> => {
  let response: Response;

  if (method === "GET") {
    response = await fetch(url, {
      method: method,
      cache: "no-cache",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        "server-api-key": process.env.NEXT_PUBLIC_BACKEND_API_KEY!,
      },
    });
  } else {
    response = await fetch(url, {
      method: method,
      cache: "no-cache",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        // "server-api-key": process.env.NEXT_PUBLIC_BACKEND_API_KEY!,
      },
      body: JSON.stringify(body),
    });
  }

  if (response.status === 409) {
    const error = (await response.json()) as { error: string; detail: string };
    console.log({ error });
    throw new Error(error.detail);
  }

  return response.body?.getReader();
};

/* *************************************** */

async function readStream(reader: DataStream): Promise<string | null> {
  const result = await reader.read();
  return result.done ? null : new TextDecoder().decode(result.value);
}

/* *************************************** */

async function processStream(
  reader: DataStream,
  onData: (data: any) => void,
  onStart?: () => void,
  shouldClose?: () => boolean
): Promise<void> {
  if (onStart) onStart();

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    if (shouldClose && shouldClose()) {
      await reader.cancel();
      return;
    }
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Split by newline (assuming NDJSON)
    let lines = buffer.split("\n");
    buffer = lines.pop()!; // Save incomplete line

    for (const line of lines) {
      if (line.trim()) {
        try {
          const event = JSON.parse(line);
          onData(event); // This will log one by one as events arrive
        } catch (e) {
          console.error("Failed to parse event:", e, line);
        }
      }
    }
  }
  // Handle any trailing data
  if (buffer.trim()) {
    try {
      const event = JSON.parse(buffer);
      onData(event);
    } catch (e) {
      // Ignore trailing incomplete data
    }
  }
}

/* *************************************** */

export const streamData = async <T>({
  url,
  body,
  method = "POST",
  onStart,
  onData,
  shouldClose,
  buildController,
  onError,
}: {
  url: string;
  body?: T;
  method: string;
  onStart?: () => void;
  onData: (data: any) => void;
  shouldClose?: () => boolean; // Event handler to close connection early
  buildController?: AbortController;
  onError?: (err: any) => void;
}) => {
  // 1- getting reader
  const reader = await getResponseReader(url, body, method);
  if (!reader) {
    return;
  }
  // 2- hadnling stream
  await processStream(reader, onData, onStart, shouldClose);
};

export const streamData2 = async ({ url }: { url: string }) => {
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    console.log("Received event:", event.data);
  };

  eventSource.onerror = (err) => {
    console.error("EventSource failed:", err);
    eventSource.close(); // Optional: close connection on error
  };

  // Optional: handle open event
  eventSource.onopen = () => {
    console.log("SSE connection opened.");
  };
};
