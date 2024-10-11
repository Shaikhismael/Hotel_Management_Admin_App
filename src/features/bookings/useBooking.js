import { useQuery } from "@tanstack/react-query"
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

function useBooking() {
    const {bookingId} = useParams()
    console.log(bookingId)
    const { 
        isLoading, 
        data: booking, 
        error, 
    } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId),
        // react query tries to fetch atleast 3 times
        // this will stop that fetching
        retry: false,
      })

      return { isLoading, booking, error}
}

export default useBooking