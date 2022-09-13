export default function Rupiah(nominal) {
    return "Rp "+String(nominal)
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .join(".")
    .split("")
    .reverse()
    .join("")
  }