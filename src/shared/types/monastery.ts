import { Record } from "./record";
import { ComponentName, ComponentGeo } from "./";

export type Monastery = {
  id: string;
  record_id: string;
  name: string;
  parent_id: string;
  dedications: any;
  records?: Record[];
  [key: string]: any;
};

export type MonasteryResponse = Monastery & {
  score?: number;
  closestName?: ComponentName;
  closestGeo?: ComponentGeo;
};
