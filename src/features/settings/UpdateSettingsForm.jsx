import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {

  const { settings, isLoading } = useSettings()
  const { updateSettings, isUpdatingSettings } = useUpdateSettings()
  const { minBookingLength, maxBookingLength, breakFastPrice, maxGuestsPerBooking } = settings || {}

  function handleUpdate(e, field) {
    // console.log(field)
    updateSettings({[field]: e.target.value})
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} onBlur={(e) => handleUpdate(e, "minBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={(e) => handleUpdate(e, "maxBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakFastPrice} onBlur={(e) => handleUpdate(e, "breakFastPrice")}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
