import { useEffect } from "react";
import { useProductDelete } from "../../hooks/useProductDelete";

interface ModalProps {
    closeModal(): void;
    productId: number;
}

export function DeleteModal({ closeModal, productId }: ModalProps) {
    const { mutate, isSuccess } = useProductDelete();

    const submit = () => {
        mutate(productId);
    };

    useEffect(() => {
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close">x</button>
                <h2>Are you sure you want to delete this product?</h2>
                <button onClick={submit} className="btn-secondary">Delete</button>
            </div>
        </div>
    );
}
