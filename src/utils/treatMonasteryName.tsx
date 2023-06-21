import { DictOrdersExtended } from "../shared/dictionaries/orders_extended";

export default function treatMonasteryName(
  name: string,
  communities: Array<any>
) {
  let comIds = communities.map((e) => e["order"]).filter(onlyUnique);
  let comNames = comIds.map((e) => getComNames(e));
  let lastIndex = name.lastIndexOf("-") 
  return `${name.slice(0, lastIndex)} – ${comNames.join(", ")}`;
}

function onlyUnique(value: any, index: any, array: any) {
  return array.indexOf(value) === index;
}

function getComNames(id: string) {
  let comObjs = DictOrdersExtended.filter((e) => e.ID.toString() === id);
  let comNames = comObjs.map((e) => e.label);
  return comNames;
}
