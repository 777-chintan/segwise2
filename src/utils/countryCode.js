import { iso31661 } from 'iso-3166';

export const countryMap = iso31661.reduce((prev, curr) => {
  prev[curr.alpha2] = curr;
  return { ...prev };
}, {});
