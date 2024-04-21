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
  CheckUser200
} from '.././model'
import { instance } from '.././instance';



/**
 * Check if user exists
 */
export const checkUser = (
    
 signal?: AbortSignal
) => {
      
      
      return instance<CheckUser200>(
      {url: `/v0.0/user/`, method: 'GET', signal
    },
      );
    }
  

export const getCheckUserQueryKey = () => {
    return [`/v0.0/user/`] as const;
    }

    
export const getCheckUserQueryOptions = <TData = Awaited<ReturnType<typeof checkUser>>, TError = unknown>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof checkUser>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getCheckUserQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof checkUser>>> = ({ signal }) => checkUser(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof checkUser>>, TError, TData> & { queryKey: QueryKey }
}

export type CheckUserQueryResult = NonNullable<Awaited<ReturnType<typeof checkUser>>>
export type CheckUserQueryError = unknown

export const useCheckUser = <TData = Awaited<ReturnType<typeof checkUser>>, TError = unknown>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof checkUser>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getCheckUserQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}


