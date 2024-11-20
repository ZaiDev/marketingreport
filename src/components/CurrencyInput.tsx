import React from 'react';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  error?: string;
  required?: boolean;
}

export function CurrencyInput({
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
}: CurrencyInputProps) {
  const formatValue = (val: string) => {
    const numbers = val.replace(/[^\d]/g, '');
    const numberWithCommas = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numberWithCommas ? `$${numberWithCommas}` : '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatValue(rawValue);
    onChange(formattedValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}