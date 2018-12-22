export const formBudget = (budget: number): string => {
  const budgetString = `${budget}`.split('');
  if (budgetString.length < 4) {
    return budgetString.join('');
  } else {
    const grade = budgetString.length % 3;
    return budgetString
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
  }
}
