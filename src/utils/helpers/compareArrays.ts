export function compareArrays(arr1: any[], arr2: any[]): boolean {
  // Check that the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check that each element in arr1 is equal to the corresponding element in arr2
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // Check that the order of elements is the same in both arrays
  for (let i = 0; i < arr1.length; i++) {
    if (arr1.indexOf(arr2[i]) !== i) {
      return false;
    }
  }

  return true;
}
