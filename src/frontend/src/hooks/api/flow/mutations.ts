import { apiClient } from "@/client/api";
import { getURL } from "@/client/helpers/get-url";
import { IBuildWorkflow } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export interface BuildFlowParam {}

export const useBuildFlow = () => {
  const fetchAPI = async (flow: IBuildWorkflow) => {
    try {
      console.log(flow);
      const res = await apiClient.post(getURL("BUILD_FLOW"), flow);
      const data = await res.data;
      console.log({ data });
      return data;
    } catch (err) {
      console.log({ err });
    }
  };

  return useMutation({
    mutationFn: fetchAPI,
    mutationKey: ["buildFlow"],
  });
};
