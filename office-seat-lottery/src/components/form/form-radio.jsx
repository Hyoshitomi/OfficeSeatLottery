import React from "react"
import { Controller } from "react-hook-form"

export function FormRadioGroup({ control, name, label, options }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm font-medium">{label}</label>
          <div className="flex items-center space-x-4">
            {options.map((option) => (
              <div className="flex items-center" key={option.value}>
                <input
                  type="radio"
                  id={`${name}_${option.value}`}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                  className="mr-1"
                />
                <label htmlFor={`${name}_${option.value}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    />
  )
}
