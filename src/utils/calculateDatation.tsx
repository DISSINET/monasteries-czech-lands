export default function calculateDatation(
  yspq: number,
  ysaq: number,
  yepq: number,
  yeaq: number
) {
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
