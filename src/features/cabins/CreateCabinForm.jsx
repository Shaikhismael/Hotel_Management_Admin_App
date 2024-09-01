import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import StyledFormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";


function CreateCabinForm({cabinToEdit = {}, onClose}) {

  //register function to get all the values from fields
  //handleSubmit function takes a function to be exec on submitting form 
  //reset function resets the fields in form
  //getValues function gives all the field values in form

  const {id: editId, ...editValues} = cabinToEdit
  const isEdited = Boolean(editId)
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdited ? editValues : {}
  })
  const { errors } = formState;

  const {isCreating, CreateCabin} = useCreateCabin()
  const {isEditing, EditCabin} = useEditCabin()


  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data?.image === 'string' ? data.image : data?.image[0]

    if (isEdited) { 
      EditCabin({cabin: {...data, image}, id: editId}, {onSuccess: () => {reset()}})
    }
    else { 
      CreateCabin({...data, image}, {onSuccess: () => {reset(); onClose?.()}})
    }
  }

  function onError(error) {
    console.log(error)
    toast.error(error.message)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose ? 'modal' : 'regular'}>
      <StyledFormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input 
          type="text" 
          id="name" 
          {...register("name",
          { 
            required: "This field is required", 
            min: { value: 1, message: "Capacity should be atleast 1"}
          })} 
        />
        
      </StyledFormRow>

      <StyledFormRow label={"maxCapacity"} error={errors?.maxCapacity?.message}>
        <Input 
          type="number" 
          id="maxCapacity" 
          {...register("maxCapacity", { required: "This field is required", 
            min: { value: 1, message: "Capacity should be atleast 1"}
            })
          } 
        />
      </StyledFormRow>

      <StyledFormRow label={"regularPrice"} error={errors?.regularPrice?.message}>
        <Input 
          type="number" 
          id="regularPrice" 
          {...register("regularPrice", { required: "This field is required", min: { value: 1, message: "Capacity should be atleast 1"}})
          } 
        />
      </StyledFormRow>

      <StyledFormRow label={"discount"} error={errors?.discount?.message}>
        <Input 
          type="number" 
          id="discount" 
          defaultValue={0} 
          {...register("discount",
          { required: "This field is required", 
            validate: (value) => value < getValues().regularPrice || "Discount should be less than regular price" })
          } 
        />
      </StyledFormRow>

      <StyledFormRow label={"description"} error={errors?.description?.message}>
        <Textarea 
          type="number" 
          id="description" 
          defaultValue="" 
          {...register("description", { required: "This field is required"})} 
        />
      </StyledFormRow>

      <StyledFormRow label={"Cabin Photo"}>
        <FileInput 
          id="image" 
          accept="image/*" 
          {...register("image", {
            required: isEdited ? false : "This file is required"
          })}
        />
      </StyledFormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEdited ? 'Edit Cabin' : 'Add Cabin'}</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
