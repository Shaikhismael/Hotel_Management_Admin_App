import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings"
import toast from "react-hot-toast"

export default function useDeleteBookings() {
    const queryClient = useQueryClient()

    const {isPending: isDeleting, mutate: deleteBooking} = useMutation({
      mutationFn: deleteBookingApi ,
      //refetch after invalidating
      onSuccess: () => {
        console.log("success")
        toast.success("SuccessFully deleted")
        queryClient.invalidateQueries({
          queryKey: ['bookings']
        })
      },
      onError: (err) => { toast.error(err.message) }
    })

    return {isDeleting, deleteBooking}
}
