import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../utils/constants"

function useBookings() {

  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  //FILTER
  const filterValue = searchParams.get("status")
  console.log(filterValue)
  const filterToBeApplied = !filterValue || filterValue === "all" ? null : {field: 'status', value: filterValue}

  // SORT
  const sortByValue = searchParams.get("sortBy") || "startDate-desc"
  // console.log(sortByValue)
  const [field, direction] =  sortByValue?.split('-')
  // console.log([field, direction])
  const sortByToBeApplied = {field, direction}

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

  console.log(page)

    const {
      data: { data: bookings, count} = {}, 
      isLoading, 
      error } = useQuery({
        queryKey: ["bookings", filterToBeApplied, sortByToBeApplied, page],
        queryFn: () => getBookings({filterToBeApplied, sortByToBeApplied, page}),
      })

      //pre-fetching
      const pageCount = Math.ceil(count / PAGE_SIZE)
      if (page < pageCount) {
        queryClient.prefetchQuery({
          queryKey: ["bookings", filterToBeApplied, sortByToBeApplied, page + 1],
          queryFn: () => getBookings({filterToBeApplied, sortByToBeApplied, page: page + 1}),
        })        
      }

      return { bookings, isLoading, error, count}
}

export default useBookings