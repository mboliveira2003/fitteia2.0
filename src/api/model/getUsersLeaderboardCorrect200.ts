/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * student-hub-api
 * Api Documentation for StudentHub API
 * OpenAPI spec version: 0.0
 */
import type { UserInfo } from './userInfo';
import type { Pageable } from './pageable';
import type { GetUsersLeaderboardCorrect200Sort } from './getUsersLeaderboardCorrect200Sort';

export type GetUsersLeaderboardCorrect200 = {
  content?: UserInfo[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: GetUsersLeaderboardCorrect200Sort;
  totalElements?: number;
  totalPages?: number;
};
