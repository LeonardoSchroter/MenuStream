import { useEffect, useState } from "react";
import { useProductUpdate } from "../../hooks/useProductUpdate";
import { ProductData } from "../../Interface/ProductData";

interface InputProps {
    label: string;
    value: any;
    updateValue(value: any): void;
}

interface ModalProps {
    closeModal(): void;
    product: ProductData;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    );
}

export function UpdateModal({ closeModal, product }: ModalProps) {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [availability, setAvailability] = useState(product.availability);
    const [image, setImage] = useState(product.image);

    const { mutate, isSuccess } = useProductUpdate();

    const submit = () => {
        const updatedProduct: ProductData = {
            ...product,
            name,
            description,
            price,
            category,
            availability,
            image
        };
        mutate(updatedProduct);
    };

    useEffect(() => {
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close">x</button>
                <h2>Update Product</h2>
                <form className="input-container">
                    <Input label="Name" value={name} updateValue={setName} />
                    <Input label="Description" value={description} updateValue={setDescription} />
                    <Input label="Price" value={price} updateValue={setPrice} />
                    <Input label="Category" value={category} updateValue={setCategory} />
                    <Input label="Availability" value={availability} updateValue={setAvailability} />
                    <Input label="Image" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">Update</button>
            </div>
        </div>
    );
}
