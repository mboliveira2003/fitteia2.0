/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * student-hub-api
 * Api Documentation for StudentHub API
 * OpenAPI spec version: 0.0
 */
import type { School } from './school';
import type { SchoolYear } from './schoolYear';

export interface UserInfo {
  email: string;
  firstName?: string;
  jwt: string;
  lastName?: string;
  profilePicture: string;
  rank?: number;
  school: School;
  schoolYear?: SchoolYear;
  totalCorrectAnswers?: number;
  userId: number;
  username: string;
}
