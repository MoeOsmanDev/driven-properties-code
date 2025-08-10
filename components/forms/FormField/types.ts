import { FormData, FormField as FormFieldType } from '../../../lib/types';

export interface FormFieldProps {
  field: FormFieldType;
  formData: FormData;
  onUpdate: (key: string, value: any) => void;
  parentPath?: string;
}
