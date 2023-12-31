import { DedicationsTrans } from "../shared/dictionaries/dedications-trans";

export default function translateDedication(name: string) {
  name = name.trim();
  let dedObj = DedicationsTrans.filter((e) => e.label_czech === name);
  if (dedObj.length > 0) {
    return dedObj[0]["label_english"];
  } else return name;
}
