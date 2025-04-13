import { CustomTooltip } from "@/components/global/custom-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentParam } from "@/types/flow/flow-component";
import { Handle, Position } from "@xyflow/react";
import { Eye, EyeOff, ScanEye } from "lucide-react";
import React, { useEffect, useState } from "react";
import CustomHandle from "../utils/custom-handle";

export const ComponentOutputs = ({
  className,
  params = [],
}: {
  className?: string;
  params?: ComponentParam[];
}) => {
  return (
    <div className={cn("text-sm  rounded-b-xl", className)}>
      {params.map((param, index) => (
        <div
          key={index}
          className={
            cn()
            // "flex items-center justify-between bg-gray-100 w-full p-1 px-3 rounded-b-xl",
          }
        >
          <div>
            <CustomHandle
              type="source"
              position={Position.Right}
              className=""
              handleType={param.output_type}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// export const ComponentOutputs2 = ({
//   className,
//   params = [],
// }: {
//   className?: string;
//   params?: ComponentParam[];
// }) => {
//   const [viewOutputs, setViewOutputs] = useState<Record<number, boolean>>(
//     Object.fromEntries(params.map((_, index) => [index, true]) || [])
//   );

//   const [hasHiddenOutputs, setHasHiddenOutputs] = useState(false);
//   const [showHiddenOutputs, setShowHiddenOutputs] = useState(false);

//   useEffect(() => {
//     setHasHiddenOutputs(Object.values(viewOutputs).some((view) => !view));
//   }, [viewOutputs]);

//   const toggleParamVisibility = (index: number) => {
//     setViewOutputs((prev) => ({ ...prev, [index]: !prev[index] }));
//   };

//   return (
//     <div className={cn("text-sm relative rounded-b-xl", className)}>
//       {params.map((param, index) => (
//         <div
//           key={index}
//           className={cn(
//             // "flex items-center justify-between bg-gray-100 w-full p-1 px-3 rounded-b-xl",
//             !viewOutputs[index] && !showHiddenOutputs && "hidden"
//           )}
//         >
//           <Button
//             onClick={() => toggleParamVisibility(index)}
//             size="icon"
//             variant="ghost"
//             className="w-5 h-5 disabled:cursor-move group"
//           >
//             {viewOutputs[index] ? (
//               <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//             ) : (
//               <EyeOff className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
//             )}
//           </Button>
//           <div>
//             <div className="flex items-center gap-2">
//               <p className="text-sm font-medium">{param.display_name}</p>
//               <CustomTooltip title="Please Build the component first" disabled>
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   disabled
//                   className="w-5 h-5 disabled:cursor-move"
//                 >
//                   <ScanEye className="w-4 h-4 text-gray-600" />
//                 </Button>
//               </CustomTooltip>
//             </div>
//             <CustomHandle
//               type="source"
//               position={Position.Right}
//               className=""
//               handleType={param.output_type}
//             />
//           </div>
//         </div>
//       ))}

//       {hasHiddenOutputs && (
//         <div
//           onClick={() => setShowHiddenOutputs((prev) => !prev)}
//           className="absolute -bottom-3 right-[48%] p-0 m-0 group bg-white rounded-full w-6 h-6 border flex items-center justify-center cursor-pointer"
//         >
//           {showHiddenOutputs ? (
//             <Eye className="text-gray-400 group-hover:text-gray-600 w-4" />
//           ) : (
//             <EyeOff className="text-gray-400 group-hover:text-gray-600 w-4" />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
