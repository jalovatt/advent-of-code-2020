export const a = (input) => {
  const questions = {};

  const groups = input.trim().split('\n\n');

  groups.forEach((g) => {
    const seen = {};
    for (let i = 0; i < g.length; i += 1) {
      const char = g[i];

      if (char !== '\n' && !seen[char]) {

        questions[char] = (questions[char] || 0) + 1;
        seen[char] = true;
      }
    }
  });

  return Object.values(questions).reduce(((acc, cur) => acc + cur));
};

export const b = (input) => {
  const questions = {};

  const groups = input.trim().split('\n\n');

  groups.forEach((g) => {
    const groupQuestions = {};
    const people = g.split('\n');

    people.forEach((p) => {
      for (let i = 0; i < g.length; i += 1) {
        const char = p[i];

        groupQuestions[char] = (groupQuestions[char] || 0) + 1;
      }
    });

    Object.entries(groupQuestions).forEach(([q, count]) => {
      if (count === people.length) {
        questions[q] = (questions[q] || 0) + 1;
      }
    });
  });

  return Object.values(questions).reduce(((acc, cur) => acc + cur));
};
