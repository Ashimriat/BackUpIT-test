export const formBudget = (budget?: number): string => {
  if (!budget) {
    return 'Unknown';
  };
  const budgetString = `${budget}`;
  if (budgetString.length < 4) {
    return budgetString;
  } else {
    const grade = budgetString.length % 3;
    let budgetResult = budgetString
      .split('')
      .map((char, index) => {
        if (
          index === (grade === 0 ? 2 : grade - 1)
          ||
          (
            index >= 3
            && index % 3 === (grade === 0 ? 2 : grade - 1)
            && index !== budgetString.length - 1
          )
        ) {
          return `${char},`;
        } else {
          return char;
        }
      }).join('');
    return budgetResult + ' $';
  }
};

export const formRuntime = (runtime: number): string => {
  let result = '';
  if (runtime / 60 > 0) {
    result += `${Math.floor(runtime / 60)} hours `;
  }
  result += `${runtime % 60} minutes`;
  return result;
};
