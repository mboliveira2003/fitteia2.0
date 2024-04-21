/**
 * Generated by orval v6.25.0 🍺
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
  CheckMasterClassMembership200
} from '.././model'
import { instance } from '.././instance';



/**
 * check if user is a memeber of masterclass
 */
export const checkMasterClassMembership = (
    
 signal?: AbortSignal
) => {
      
      
      return instance<CheckMasterClassMembership200>(
      {url: `/v0.0/memberships/check/masterclass/matA`, method: 'GET', signal
    },
      );
    }
  

export const getCheckMasterClassMembershipQueryKey = () => {
    return [`/v0.0/memberships/check/masterclass/matA`] as const;
    }

    
export const getCheckMasterClassMembershipQueryOptions = <TData = Awaited<ReturnType<typeof checkMasterClassMembership>>, TError = unknown>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof checkMasterClassMembership>>, TError, TData>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getCheckMasterClassMembershipQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof checkMasterClassMembership>>> = ({ signal }) => checkMasterClassMembership(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof checkMasterClassMembership>>, TError, TData> & { queryKey: QueryKey }
}

export type CheckMasterClassMembershipQueryResult = NonNullable<Awaited<ReturnType<typeof checkMasterClassMembership>>>
export type CheckMasterClassMembershipQueryError = unknown

export const useCheckMasterClassMembership = <TData = Awaited<ReturnType<typeof checkMasterClassMembership>>, TError = unknown>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof checkMasterClassMembership>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getCheckMasterClassMembershipQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



