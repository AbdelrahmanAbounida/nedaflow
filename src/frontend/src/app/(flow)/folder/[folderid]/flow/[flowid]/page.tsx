import FlowPageView, { FlowPageProps } from "@/components/flow/flow-page-view";
import React from "react";

const FlowPage = ({ params }: FlowPageProps) => {
  return <FlowPageView params={params} />;
};

export default FlowPage;
