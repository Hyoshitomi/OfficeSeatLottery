import React from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function ResizableBox({
  text,
  borderColor = 'blue-500',
  width = 160,
  height = 80,
  borderWidth = 4,
  borderRadius = 'lg'
}) {
  // Tailwindのクラスを静的に組み立て
  const borderWidthClass = {
    2: 'border-2',
    4: 'border-4',
    8: 'border-8'
  }[borderWidth] || 'border-4';

  const borderRadiusClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }[borderRadius] || 'rounded-lg';

  const wrapperClasses = [
    `w-[${width}px]`,
    `min-h-[${height}px]`,
    borderWidthClass,
    borderRadiusClass,
    `border-${borderColor}`,
    'flex items-center justify-center',
    'overflow-hidden',
    'bg-white'
  ].join(' ');

  return (
    <div className={wrapperClasses}>
      <TextareaAutosize
        value={text}
        readOnly
        minRows={1}
        maxRows={4}
        className="w-full resize-none border-none bg-transparent focus:outline-none text-center text-lg font-medium px-2"
        style={{ padding: 0 }}
      />
    </div>
  );
}
