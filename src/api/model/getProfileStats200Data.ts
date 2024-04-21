/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * student-hub-api
 * Api Documentation for StudentHub API
 * OpenAPI spec version: 0.0
 */
import type { GetProfileStats200DataExercisesDonePerDayItem } from './getProfileStats200DataExercisesDonePerDayItem';
import type { TopicPercentageDistribution } from './topicPercentageDistribution';

export type GetProfileStats200Data = {
  exercisesDonePerDay?: GetProfileStats200DataExercisesDonePerDayItem[];
  gradePrediction?: number;
  rank?: number;
  topicPercentageDistribution?: TopicPercentageDistribution;
  totalExamsDone?: number;
  totalExercisesCorrect?: number;
  totalExercisesDone?: number;
  totalTestsDone?: number;
};