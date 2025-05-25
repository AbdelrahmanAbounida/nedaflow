import { apiClient } from "@/controllers/api";
import { getURL } from "@/controllers/helpers/get-url";
import { useFlowStore } from "@/store/flow";
import { IBuildWorkflow } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { streamData, streamData2 } from "../stream";

async function handleBuildEvent(event: any) {
  console.log("Stream event received:", event);
  const { type, data } = event;
  console.log({ type, data });
  const flowStore = useFlowStore.getState();

  switch (type) {
    case "vertex_started":
      flowStore.updateNodeStatus(data.vertex_id, {
        isBuilding: true,
        progress: 0,
      });
      break;
    case "vertex_progress":
      flowStore.updateNodeStatus(data.vertex_id, { progress: data.progress });
      break;
    case "vertex_complete":
      flowStore.updateNodeStatus(data.vertex_id, {
        isBuilding: false,
        progress: 100,
        result: data.result,
      });
      break;
    case "vertex_error":
      flowStore.updateNodeStatus(data.vertex_id, {
        isBuilding: false,
        error: data.error,
      });
      break;
    // Add more cases as needed
  }
}

export const useBuildFlow = () => {
  const fetchAPI = async (flow: IBuildWorkflow) => {
    try {
      const res = await apiClient.post(getURL("BUILD_FLOW"), flow);
      const { execution_id } = res.data;

      if (!execution_id)
        throw new Error("No execution_id returned from build_flow!");

      // Store controller for cancellation
      const buildController = new AbortController();
      useFlowStore.getState().setBuildController(buildController);

      // Fixed: Uncomment and pass the buildController
      await streamData({
        method: "GET",
        url:
          process.env.NEXT_PUBLIC_BACKEND_URL +
          `/${getURL("BUILD_FLOW_STREAM_RESP", { execution_id })}`,
        onData: handleBuildEvent,
        buildController, // <- This was commented out!
        onError: (error) => {
          console.error("Streaming error:", error);
        },
      });
    } catch (err) {
      console.error("Build error:", err);
      // Clear the build controller on error
      useFlowStore.getState().setBuildController(null);
      throw err;
    }
  };

  return useMutation({
    mutationFn: fetchAPI,
    mutationKey: ["buildFlow"],
  });
};

export const buildFlowWithStream = async (flow: IBuildWorkflow) => {
  try {
    console.log("asdasd");
    const res = await apiClient.post(getURL("BUILD_FLOW"), flow);
    console.log(res.data);
    const { execution_id } = res.data;
    console.log({ execution_id });

    if (!execution_id)
      throw new Error("No execution_id returned from build_flow!");

    // Store controller for cancellation
    const buildController = new AbortController();
    useFlowStore.getState().setBuildController(buildController);

    await streamData({
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        `/${getURL("BUILD_FLOW_STREAM_RESP", { execution_id })}`,
      onData: handleBuildEvent,
      buildController, // <- This was commented out!
      onError: (error) => {
        console.error("Streaming error:", error);
      },
    });

    // await streamData2({
    //   url:
    //     process.env.NEXT_PUBLIC_BACKEND_URL +
    //     `/${getURL("BUILD_FLOW_STREAM_RESP", { execution_id })}`,
    // });
  } catch (err) {
    console.error("Build error:", err);
    // Clear the build controller on error
    useFlowStore.getState().setBuildController(null);
    throw err;
  }
};
