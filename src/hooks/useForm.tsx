import { useState } from 'react';

export function useForm<T>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);

  const changeForm = (key: keyof T, value: T[keyof T]) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const clearForm = () => {
    setFormData(initialData);
  };

  return {
    formData,
    changeForm,
    clearForm,
  };
}
