export function areEqual(array1: any[], array2: any[]) {
    const sortedArr1 = [...array1].sort();
    const sortedArr2 = [...array2].sort();
  
    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
  }