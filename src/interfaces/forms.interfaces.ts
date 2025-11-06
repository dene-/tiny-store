type InputType = 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'tel';

export interface InputField {
  id: string;
  label: string;
  type: InputType;
  placeholder?: string;
  required?: boolean;
  name?: string;
  options?: { value: string; label: string }[];
  fullWidth?: boolean;
  value?: unknown;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}
