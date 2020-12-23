const setContains = (big, small) => {
  // eslint-disable-next-line no-cond-assign
  const iter = small.values();
  let done;

  while (!done) {
    const next = iter.next();

    if (!next.done && !big.has(next.value)) { return false; }

    done = next.done;
  }

  return true;
};

const lookupFromSet = (set, init) => {
  const out = {};

  // eslint-disable-next-line no-cond-assign
  const iter = set.values();
  let done;

  while (!done) {
    const next = iter.next();

    if (next.value) { out[next.value] = init; }

    done = next.done;
  }

  return out;
};

const parseRecipes = (input) => input.trim().split('\n').map((line) => {
  const openParen = line.indexOf('(');

  const ingredients = line.slice(0, openParen - 1).split(' ');
  const allergens = line.slice(openParen + 10, -1).split(', ');

  return {
    ingredients,
    allergens,
  };
});

const findAllergens = (parsed) => {
  const [allIngredients, allAllergens] = parsed.reduce((acc, cur) => {
    cur.ingredients.forEach((v) => acc[0].add(v));
    cur.allergens.forEach((v) => acc[1].add(v));
    return acc;
  }, [new Set(), new Set()]).map((v) => Array.from(v));

  const recipeSets = parsed.reduce((acc, cur, recipeIndex) => {
    cur.ingredients.forEach((ingredient) => {
      if (!acc[ingredient]) { acc[ingredient] = new Set(); }

      acc[ingredient].add(recipeIndex);
    });
    cur.allergens.forEach((allergen) => {
      if (!acc[allergen]) { acc[allergen] = new Set(); }

      acc[allergen].add(recipeIndex);
    });

    return acc;
  }, {});

  const [possible, clean] = allAllergens.reduce((acc, allergen) => {
    acc[0][allergen] = [];

    allIngredients.forEach((ingredient) => {
      if (setContains(recipeSets[ingredient], recipeSets[allergen])) {
        acc[0][allergen].push(ingredient);
        acc[1].delete(ingredient);
      }
    });

    return acc;
  }, [{}, new Set(allIngredients)]);

  return [possible, clean];
};

export const a = (input) => {
  const parsed = parseRecipes(input);

  const [, clean] = findAllergens(parsed);

  const cleanCounts = lookupFromSet(clean, 0);

  parsed.forEach(({ ingredients }) => {
    ingredients.forEach((ingredient) => {
      if (cleanCounts[ingredient] !== undefined) {
        cleanCounts[ingredient] += 1;
      }
    });
  });

  return Object.values(cleanCounts).reduce((acc, cur) => acc + cur);
};

export const b = (input) => {
  const parsed = parseRecipes(input);

  const [possible] = findAllergens(parsed);
  const possibleEntries = Object.entries(possible);

  const known = {};
  let changed;

  do {
    changed = false;

    // eslint-disable-next-line no-loop-func
    possibleEntries.forEach(([allergen, ingredients]) => {
      const filtered = ingredients.filter((i) => !known[i]);

      if (filtered.length === 1) {
        known[filtered[0]] = allergen;
        changed = true;
      }
    });
  } while (changed);

  return Object.entries(known)
    .sort(([, aA], [, aB]) => aA.localeCompare(aB))
    .map(([i]) => i)
    .join(',');
};
