export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'password' | 'datetime-local' | 'select' | 'textarea' | 'url';
    required?: boolean;
    options?: { value: number | string; label: string }[]; 
    nestedObjectKey?: string; 
}