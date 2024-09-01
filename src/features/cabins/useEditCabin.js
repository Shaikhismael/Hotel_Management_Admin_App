import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useEditCabin() {
    const queryClient = useQueryClient()

    const {isPending: isEditing, mutate: EditCabin } = useMutation({
        mutationFn: ({cabin, id}) => createEditCabin(cabin, id),
        onSuccess: () => {
          toast.success("cabin sucesfully edited");
          queryClient.invalidateQueries({
            queryKey: ['cabins']
          })
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })

      return{ isEditing, EditCabin }
    
}

export default useEditCabin