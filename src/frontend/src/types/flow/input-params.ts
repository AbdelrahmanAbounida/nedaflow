// input paramaters u pass to a component

import { ComponentParam } from "./flow-component";

export interface StringParam extends ComponentParam {
  updateNodeParamProps: (newVal: string) => void;
}
