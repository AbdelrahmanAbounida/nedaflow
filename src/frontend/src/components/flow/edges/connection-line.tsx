import { ConnectionLineComponentProps, useConnection } from "@xyflow/react";

const ConnectionLineComponent = ({
  fromX,
  fromY,
  toX,
  toY,
  connectionLineStyle = {},
}: ConnectionLineComponentProps): JSX.Element => {
  const color = "black"; // handleDragging?.color;
  const accentColor = `hsl(var(--datatype-${color}))`;
  const { fromHandle } = useConnection();

  return (
    <g>
      <path
        fill="none"
        stroke={fromHandle?.id!} // check how to add cusstom color to the id
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={fromHandle?.id!}
        strokeWidth={1.5}
      />
    </g>
  );
};

export default ConnectionLineComponent;
