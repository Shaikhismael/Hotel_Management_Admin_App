import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    // Read all rows
    let { data , error } = await supabase
    .from('cabins')
    .select('*')
    if (error) {
        console.log(error)
        return new Error("error")
    }
    return data
}


export async function deleteCabin(cabinID) {
   const {data, error} = await supabase.from('cabins').delete().eq("id", cabinID)
   
   if (error) {
    console.log(error.message)
    throw new Error("Error while Deleting")
   }

   return data
}


export async function createEditCabin(cabin, id) {

    const hasImagePath = cabin?.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${cabin?.image?.name}`.replaceAll('/','')
    const imagePath = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query = supabase
    .from("cabins")

    if (!id) query = query.insert([{...cabin, image: imagePath}])
        
    if (id) query = query.update({...cabin, image: imagePath}).eq("id", id)

    const {data, error} = await query.select().single()
    
    if (error) {
        console.log(error.message)
        throw new Error("Error while Inserting")
    }


    if (hasImagePath) return data

    //Uploading image to Bucket
    const { data: uploadResponse, error: errorUploadingImage} = await supabase.storage
        .from("cabin-images")
        .upload(imageName, cabin?.image)

        console.log(uploadResponse)
    
    if (errorUploadingImage) {
        await supabase.from('cabins').delete().eq("id", data?.id)
        throw new Error("Cabin image non uploaded")
    }

    return data
}