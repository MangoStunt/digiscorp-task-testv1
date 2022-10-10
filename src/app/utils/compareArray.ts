export function compareArrays(firstArr: Array<any>, secondArr: Array<any>): boolean {
  return JSON.stringify(firstArr) === JSON.stringify(secondArr);
}
