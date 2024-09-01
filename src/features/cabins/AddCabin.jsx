import React, { useState } from 'react'
import CreateCabinForm from './CreateCabinForm'
import CabinTable from './CabinTable'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

// function AddCabin() {

//   const [isOpenModal, setIsOpenModal] = useState(false)

//   return (
//     <>
//         <Button onClick={() => setIsOpenModal(show => !show)}>Add New Cabin</Button>
//         {/* {isOpenModal && <CreateCabinForm/>} */}
//         {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}><CreateCabinForm onClose={() => setIsOpenModal(false)}/></Modal>}
//     </>
//   )
// }


function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add New Cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm/>
            </Modal.Window>
        </Modal>
    )
}

export default AddCabin