export interface ProductFilter {
  id: string;
  name: string;
  options: Option[];
}
export interface Option {
  value: string;
  label: string;
  checked: boolean;
}
