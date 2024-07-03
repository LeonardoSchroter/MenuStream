import { useEffect, useState } from "react";
import { useProductDataMutate } from "../../hooks/useProductDataMutate";
import { ProductData } from "../../Interface/ProductData";
import "./CreateModal.css";
interface InputProps{
    label: string,
    value: any,
    updateValue(value: any): void
}

interface ModalProps{
   closeModal(): void

}

const Input = ({label,value,updateValue}: InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value = {value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({closeModal}:ModalProps){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price,setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [availability, setAvailability] = useState(true);
    const [image, setimage] = useState("");
    
    const {mutate,isSuccess} = useProductDataMutate();

    const submit = () => {
        const productData : ProductData ={
            name,
            description,
            price,
            category,
            availability,
            image
        }
        mutate(productData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    },[isSuccess])
    
    return(
        <div className="modal-overlay">
            <div className="modal-body">
            <button onClick={closeModal} className="btn-close">x</button>
                <h2>Add new item to the menu</h2>
                <form className="input-container">
                    <Input label="Name" value={name} updateValue={setName}/>
                    <Input label="Description" value={description} updateValue={setDescription}/>
                    <Input label="Price" value={price} updateValue={setPrice}/>
                    <Input label="Category" value={category} updateValue={setCategory}/>
                    <Input label="Availability" value={availability} updateValue={setAvailability}/>
                    <Input label="Image" value={image} updateValue={setimage}/>
                </form>
                <button onClick = {submit} className="btn-secondary">Post</button>
            </div>

        </div>
    );
}