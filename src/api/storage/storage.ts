/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * student-hub-api
 * Api Documentation for StudentHub API
 * OpenAPI spec version: 0.0
 */
import {
  useMutation
} from 'react-query'
import type {
  MutationFunction,
  UseMutationOptions
} from 'react-query'
import type {
  Upload200,
  UploadBody,
  UploadParams
} from '.././model'
import { instance } from '.././instance';



/**
 * Upload a file
 */
export const upload = (
    uploadBody: UploadBody,
    params: UploadParams,
 ) => {
      
      const formData = new FormData();
if(uploadBody.file !== undefined) {
 formData.append('file', uploadBody.file)
 }

      return instance<Upload200>(
      {url: `/v0.0/storage/upload`, method: 'POST',
      headers: {'Content-Type': 'multipart/form-data', },
       data: formData,
        params
    },
      );
    }
  


export const getUploadMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof upload>>, TError,{data: UploadBody;params: UploadParams}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof upload>>, TError,{data: UploadBody;params: UploadParams}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof upload>>, {data: UploadBody;params: UploadParams}> = (props) => {
          const {data,params} = props ?? {};

          return  upload(data,params,)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type UploadMutationResult = NonNullable<Awaited<ReturnType<typeof upload>>>
    export type UploadMutationBody = UploadBody
    export type UploadMutationError = unknown

    export const useUpload = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof upload>>, TError,{data: UploadBody;params: UploadParams}, TContext>, }
) => {

      const mutationOptions = getUploadMutationOptions(options);

      return useMutation(mutationOptions);
    }
    