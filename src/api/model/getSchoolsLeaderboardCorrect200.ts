/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * student-hub-api
 * Api Documentation for StudentHub API
 * OpenAPI spec version: 0.0
 */
import type { School } from './school';
import type { Pageable } from './pageable';
import type { GetSchoolsLeaderboardCorrect200Sort } from './getSchoolsLeaderboardCorrect200Sort';

export type GetSchoolsLeaderboardCorrect200 = {
  content?: School[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: GetSchoolsLeaderboardCorrect200Sort;
  totalElements?: number;
  totalPages?: number;
};
