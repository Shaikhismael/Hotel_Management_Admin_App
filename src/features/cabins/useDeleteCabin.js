import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins"
import toast from "react-hot-toast"

export default function useDeleteCabin() {
    const queryClient = useQueryClient()

    const {isPending: isDeleting, mutate: deleteCabin} = useMutation({
      mutationFn: deleteCabinApi ,
      //refetch after invalidating
      onSuccess: () => {
        toast.success("SuccessFully deleted")
        queryClient.invalidateQueries({
          queryKey: ['cabins']
        })
      },
      onError: (err) => { toast.error(err.message) }
    })

    return {isDeleting, deleteCabin}
}