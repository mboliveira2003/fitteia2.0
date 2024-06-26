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
  GetGraphData200,
  GetGraphDataParams,
  GetProfileStats200,
  GetTestGraphData200,
  GetTestGraphDataParams
} from '.././model'
import { instance } from '.././instance';



/**
 * Get stats for a user profile
 */
export const getProfileStats = (
    
 signal?: AbortSignal
) => {
      
      
      return instance<GetProfileStats200>(
      {url: `/v0.0/profile/stats`, method: 'GET', signal
    },
      );
    }
  

export const getGetProfileStatsQueryKey = () => {
    return [`/v0.0/profile/stats`] as const;
    }

    
export const getGetProfileStatsQueryOptions = <TData = Awaited<ReturnType<typeof getProfileStats>>, TError = unknown>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProfileStats>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProfileStatsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProfileStats>>> = ({ signal }) => getProfileStats(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getProfileStats>>, TError, TData> & { queryKey: QueryKey }
}

export type GetProfileStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getProfileStats>>>
export type GetProfileStatsQueryError = unknown

export const useGetProfileStats = <TData = Awaited<ReturnType<typeof getProfileStats>>, TError = unknown>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProfileStats>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetProfileStatsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Get graph data for a user
 */
export const getGraphData = (
    params: GetGraphDataParams,
 signal?: AbortSignal
) => {
      
      
      return instance<GetGraphData200>(
      {url: `/v0.0/profile/graph`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetGraphDataQueryKey = (params: GetGraphDataParams,) => {
    return [`/v0.0/profile/graph`, ...(params ? [params]: [])] as const;
    }

    
export const getGetGraphDataQueryOptions = <TData = Awaited<ReturnType<typeof getGraphData>>, TError = unknown>(params: GetGraphDataParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getGraphData>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetGraphDataQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getGraphData>>> = ({ signal }) => getGraphData(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getGraphData>>, TError, TData> & { queryKey: QueryKey }
}

export type GetGraphDataQueryResult = NonNullable<Awaited<ReturnType<typeof getGraphData>>>
export type GetGraphDataQueryError = unknown

export const useGetGraphData = <TData = Awaited<ReturnType<typeof getGraphData>>, TError = unknown>(
 params: GetGraphDataParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getGraphData>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetGraphDataQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Get test graph data for a user
 */
export const getTestGraphData = (
    params: GetTestGraphDataParams,
 signal?: AbortSignal
) => {
      
      
      return instance<GetTestGraphData200>(
      {url: `/v0.0/profile/test-graph`, method: 'GET',
        params, signal
    },
      );
    }
  

export const getGetTestGraphDataQueryKey = (params: GetTestGraphDataParams,) => {
    return [`/v0.0/profile/test-graph`, ...(params ? [params]: [])] as const;
    }

    
export const getGetTestGraphDataQueryOptions = <TData = Awaited<ReturnType<typeof getTestGraphData>>, TError = unknown>(params: GetTestGraphDataParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTestGraphData>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetTestGraphDataQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTestGraphData>>> = ({ signal }) => getTestGraphData(params, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getTestGraphData>>, TError, TData> & { queryKey: QueryKey }
}

export type GetTestGraphDataQueryResult = NonNullable<Awaited<ReturnType<typeof getTestGraphData>>>
export type GetTestGraphDataQueryError = unknown

export const useGetTestGraphData = <TData = Awaited<ReturnType<typeof getTestGraphData>>, TError = unknown>(
 params: GetTestGraphDataParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getTestGraphData>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetTestGraphDataQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



