/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * student-hub-api
 * Api Documentation for StudentHub API
 * OpenAPI spec version: 0.0
 */
import {
  useQuery
} from 'react-query'
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult
} from 'react-query'
import type {
  GetExercisesAndUrl200,
  GetExercisesAndUrlParams,
  GetSchoolYearSubtopics200,
  GetSchoolYearSubtopicsParams,
  GetSchoolYears200,
  GetSubtopics200,
  GetSubtopicsParams,
  GetTopics200,
  GetTopicsParams
} from '.././model'
import { instance } from '.././instance';



/**
 * Get all school years
 */
export const getSchoolYears = (
    
 signal?: AbortSignal
) => {
      
      
      return instance<GetSchoolYears200>(
      {url: `/v0.0/exercises/schoolYears`, method: 'GET', signal
    },
      );
    }
  

export const getGetSchoolYearsQueryKey = () => {
    return [`/v0.0/exercises/schoolYears`] as const;
    }

    
export const getGetSchoolYearsQueryOptions = <TData = Awaited<ReturnType<typeof getSchoolYears>>, TError = unknown>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSchoolYears>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetSchoolYearsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSchoolYears>>> = ({ signal }) => getSchoolYears(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getSchoolYears>>, TError, TData> & { queryKey: QueryKey }
}

export type GetSchoolYearsQueryResult = NonNullable<Awaited<ReturnType<typeof getSchoolYears>>>
export type GetSchoolYearsQueryError = unknown

export const useGetSchoolYears = <TData = Awaited<ReturnType<typeof getSchoolYears>>, TError = unknown>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSchoolYears>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetSchoolYearsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Get all topics for a school year
 */
export const getTopics = (
    params: GetTopicsParams,
 signal?: AbortSignal
) => {
      
      
      return instance<GetTopics200>(
      {url: `/v0.0/exercises/schoolYear/topics`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetTopicsQueryKey = (params: GetTopicsParams,) => {
    return [`/v0.0/exercises/schoolYear/topics`, ...(params ? [params]: [])] as const;
    }

    
export const getGetTopicsQueryOptions = <TData = Awaited<ReturnType<typeof getTopics>>, TError = unknown>(params: GetTopicsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTopicsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTopics>>> = ({ signal }) => getTopics(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTopicsQueryResult = NonNullable<Awaited<ReturnType<typeof getTopics>>>
export type GetTopicsQueryError = unknown

export const useGetTopics = <TData = Awaited<ReturnType<typeof getTopics>>, TError = unknown>(
 params: GetTopicsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTopics>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetTopicsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Get all subtopics for a school year
 */
export const getSchoolYearSubtopics = (
    params: GetSchoolYearSubtopicsParams,
 signal?: AbortSignal
) => {
      
      
      return instance<GetSchoolYearSubtopics200>(
      {url: `/v0.0/exercises/schoolYear/subTopics`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetSchoolYearSubtopicsQueryKey = (params: GetSchoolYearSubtopicsParams,) => {
    return [`/v0.0/exercises/schoolYear/subTopics`, ...(params ? [params]: [])] as const;
    }

    
export const getGetSchoolYearSubtopicsQueryOptions = <TData = Awaited<ReturnType<typeof getSchoolYearSubtopics>>, TError = unknown>(params: GetSchoolYearSubtopicsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSchoolYearSubtopics>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetSchoolYearSubtopicsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSchoolYearSubtopics>>> = ({ signal }) => getSchoolYearSubtopics(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getSchoolYearSubtopics>>, TError, TData> & { queryKey: QueryKey }
}

export type GetSchoolYearSubtopicsQueryResult = NonNullable<Awaited<ReturnType<typeof getSchoolYearSubtopics>>>
export type GetSchoolYearSubtopicsQueryError = unknown

export const useGetSchoolYearSubtopics = <TData = Awaited<ReturnType<typeof getSchoolYearSubtopics>>, TError = unknown>(
 params: GetSchoolYearSubtopicsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSchoolYearSubtopics>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetSchoolYearSubtopicsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Get all subtopics for a topic
 */
export const getSubtopics = (
    params: GetSubtopicsParams,
 signal?: AbortSignal
) => {
      
      
      return instance<GetSubtopics200>(
      {url: `/v0.0/exercises/topic/subTopics`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetSubtopicsQueryKey = (params: GetSubtopicsParams,) => {
    return [`/v0.0/exercises/topic/subTopics`, ...(params ? [params]: [])] as const;
    }

    
export const getGetSubtopicsQueryOptions = <TData = Awaited<ReturnType<typeof getSubtopics>>, TError = unknown>(params: GetSubtopicsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSubtopics>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetSubtopicsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSubtopics>>> = ({ signal }) => getSubtopics(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getSubtopics>>, TError, TData> & { queryKey: QueryKey }
}

export type GetSubtopicsQueryResult = NonNullable<Awaited<ReturnType<typeof getSubtopics>>>
export type GetSubtopicsQueryError = unknown

export const useGetSubtopics = <TData = Awaited<ReturnType<typeof getSubtopics>>, TError = unknown>(
 params: GetSubtopicsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSubtopics>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetSubtopicsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Get all exercises for a subtopic
 */
export const getExercisesAndUrl = (
    params: GetExercisesAndUrlParams,
 signal?: AbortSignal
) => {
      
      
      return instance<GetExercisesAndUrl200>(
      {url: `/v0.0/exercises/subTopic/exercises`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetExercisesAndUrlQueryKey = (params: GetExercisesAndUrlParams,) => {
    return [`/v0.0/exercises/subTopic/exercises`, ...(params ? [params]: [])] as const;
    }

    
export const getGetExercisesAndUrlQueryOptions = <TData = Awaited<ReturnType<typeof getExercisesAndUrl>>, TError = unknown>(params: GetExercisesAndUrlParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getExercisesAndUrl>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetExercisesAndUrlQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getExercisesAndUrl>>> = ({ signal }) => getExercisesAndUrl(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getExercisesAndUrl>>, TError, TData> & { queryKey: QueryKey }
}

export type GetExercisesAndUrlQueryResult = NonNullable<Awaited<ReturnType<typeof getExercisesAndUrl>>>
export type GetExercisesAndUrlQueryError = unknown

export const useGetExercisesAndUrl = <TData = Awaited<ReturnType<typeof getExercisesAndUrl>>, TError = unknown>(
 params: GetExercisesAndUrlParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getExercisesAndUrl>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetExercisesAndUrlQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



