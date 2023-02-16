export default function (length: number, origin: string | number) {
  if (typeof origin === "number") origin = origin.toString();
  return (
    new Array(Math.max(0, length - origin.length)).fill(0).join("") + origin
  );
}
