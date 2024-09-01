import React from 'react'

function EditCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
    {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}><CreateCabinForm onClose={() => setIsOpenModal(false)}/></Modal>}
    </>
  )
}

export default EditCabin