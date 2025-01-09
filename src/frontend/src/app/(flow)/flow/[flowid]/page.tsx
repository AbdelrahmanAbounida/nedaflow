import FlowPageView from "@/components/flow/flow-page-view";
import React from "react";

interface FlowPageProps {
  params: {
    flowId: string;
  };
}

const FlowPage = ({ params }: FlowPageProps) => {
  return <FlowPageView params={params} />;
};

export default FlowPage;
