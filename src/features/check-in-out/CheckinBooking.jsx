import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking()
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakFast, setAddBreakFast] = useState(false)
  const { checkin, isLoading: isCheckedIn } = useCheckin()
  const { settings, isLoading: isSettingsLoading} = useSettings()
  const moveBack = useMoveBack();

  
  
  const {
    bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  console.log(booking)
  
  const optionalBreakfastPrice = settings?.breakFastPrice;

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakFast) {
      checkin({bookingId, breakfast: {
        hasBreakFast: true,
        extraPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice

      }})
    } else {
      checkin({bookingId, breakfast:{}})
    }
  }

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
    console.log("rendered")
    return () => console.log("re-rendered")
  }, [booking])

  if (!booking || isLoading || isSettingsLoading) {
    return <Spinner />
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <CheckBox
          checked={addBreakFast}
          onChange={() => { setAddBreakFast(prev => !prev); setConfirmPaid(false) }}
          disabled={booking?.isPaid}
          id={"Breakfast"}
        >Want to add breakfast for {optionalBreakfastPrice}</CheckBox>
      </Box>

      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(prev => !prev)}
          disabled={confirmPaid || isCheckedIn}
          id={"confirm"}
        >I confirm That {guests?.fullName} has paid the total amount of {" "} {!addBreakFast ? formatCurrency(totalPrice) : `${formatCurrency?.(totalPrice + optionalBreakfastPrice)} (${formatCurrency?.(totalPrice)} + ${formatCurrency?.(optionalBreakfastPrice)})`}</CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid} >Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
