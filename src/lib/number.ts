/**
 * A reusable function to calculate average rating
 * @template T
 * @param {T[]} data
 * @param {(item: T) => number} getRating
 * @returns {number}
 */
export const calculateAverageRating = <T>(
  data: T[],
  getRating: (item: T) => number
): number => {
  if (!data.length) return 0;

  const sum = data.reduce((acc, item) => acc + getRating(item), 0);
  return Number((sum / data.length).toFixed(1));
};
