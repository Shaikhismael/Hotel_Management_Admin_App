import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function useCreateCabin() {
    const queryClient = useQueryClient()

    const {isPending: isCreating, mutate: CreateCabin} = useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success("cabin sucesfully created");
        queryClient.invalidateQueries({
          queryKey: ['cabins']
        })
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })

    return { isCreating, CreateCabin }
}

export default useCreateCabin