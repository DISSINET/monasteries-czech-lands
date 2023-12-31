export default function calculateDatation(
  yspq: number | boolean,
  ysaq: number | boolean,
  yepq: number | boolean,
  yeaq: number | boolean
) {
  const nonFalse = [yspq, ysaq, yepq, yeaq].filter(Boolean);
  if (nonFalse.length == 1) {
    ysaq = nonFalse[0];
    yspq = nonFalse[0];
    yepq = nonFalse[0];
    yeaq = nonFalse[0];
  }
  if (yspq == false) {
    yspq = ysaq;
  }
  if (ysaq == false) {
    ysaq = yspq;
  }
  if (yepq == false) {
    yepq = yeaq;
  }
  if (yeaq == false) {
    yeaq = yepq;
  }
  if (yspq === ysaq && yepq === yeaq && yspq === yepq) {
    return `${yspq}`;
  } else {
    let ys = yspq === ysaq ? `${yspq}` : `${yspq}–${ysaq}`;
    let ye = yepq === yeaq ? `${yepq}` : `${yepq}–${yeaq}`;
    if (ys === ye) {
      return `${yspq}/${ysaq}`;
    }
    return `${ys.replace("–", "/")}–${ye.replace("–", "/")}`;
  }
}
