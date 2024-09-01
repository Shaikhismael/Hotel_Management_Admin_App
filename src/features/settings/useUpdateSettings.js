import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSetting } from '../../services/apiSettings'
import toast from 'react-hot-toast'

function useUpdateSettings() {

    const queryClient = useQueryClient()
 
    const {error, isPending: isUpdatingSettings, mutate: updateSettings} = useMutation({
       mutationFn: updateSetting,
       onSuccess: () => {
        toast.success("settings updated");
        queryClient.invalidateQueries({
            queryKey: ['settings']
        })
       },
       onError: (error) => {
        toast.error(error)
       }
    })

    return {error, isUpdatingSettings, updateSettings}
}

export default useUpdateSettings