import React from "react";

interface FlowPageProps {
  params: {
    flowid: string;
  };
}

const FlowPage = ({ params }: FlowPageProps) => {
  return <div>{params.flowid}</div>;
};

export default FlowPage;
