import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner"

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBookings from "./useDeleteBookings";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  const { checkout, isLoading: isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBookings()
  console.log(booking)

  const moveBack = useMoveBack();
  const navigate = useNavigate()

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) {
    return <Spinner />
  }

  const {
    status,
    id
  } = booking


  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (<Button variation="secondary" onClick={() => navigate(`/checkin/${id}`)}>
          Check in
        </Button>)}
        {status === 'checked-in' && (<Button type="button" icon={<HiArrowDownOnSquare />} disabled={isCheckingOut} onClick={() => checkout(id)}>
          Check out
        </Button>)}

        <Modal>
          <Modal.Open opens="delete">
            <Button type="button" variation="danger">Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName={'booking'} disabled={isDeleting} onConfirm={() => deleteBooking(id, {onSuccess: () => navigate('/bookings')})} />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
