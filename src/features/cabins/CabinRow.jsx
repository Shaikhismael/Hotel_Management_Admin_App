import styled from "styled-components";
import {HiPencil, HiSquare2Stack, HiTrash, HiXCircle} from "react-icons/hi2"
import { useState } from "react";

import {formatCurrency} from '../../utils/helpers'
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 5px;
`

function CabinRow({cabin}) {
  const [showEditForm, setShowEditForm] = useState(false)
  const {id, name, image, maxCapacity, discount, regularPrice, description} = cabin

  const {isDeleting, deleteCabin} = useDeleteCabin()
  const {isCreating, CreateCabin} = useCreateCabin()

  function handleDuplicate() {
    CreateCabin({ 
      name: `Copy of ${name}`, image, maxCapacity, discount, regularPrice, description
    })
  }

  
  return (
      <Table.Row>
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : (<span>&mdash;</span>)}
        <Modal>
        <Menus>
          <Menus.Toggle id={id}></Menus.Toggle>

          <Menus.List id={id}>
            
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
            </Modal.Open>

            <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>Duplicate</Menus.Button>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin}/>
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete 
              resourceName={id}
              disabled={isDeleting}
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Menus>
        </Modal>
      </Table.Row>
  )
}

export default CabinRow