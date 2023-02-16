export default function (n: number, fn: Function) {
  for (let i = 0; i < n; ++i) fn();
}
