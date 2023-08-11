import React from "react";

export default function FancySelect({
  suffix,
  name,
  value,
  onChange,
  title,
  options,
}) {
  const filled = !!value;
  return (
    <div
      className={[
        "relative inline-block text-main",
        filled ? " underline" : "animate-flash",
      ].join(" ")}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: options.find((option) => option.value === value)
            ? options.find((option) => option.value === value).label +
              (suffix ? " " + suffix : "")
            : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
        }}
      />
      <select
        className="absolute left-0 top-0 h-full w-full cursor-pointer appearance-none border-b border-transparent  bg-transparent text-transparent transition-colors focus:border-main [&_option]:text-black"
        id={name}
        name={name}
        value={value ? value : ""}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
        title={title}
      >
        {options.map((option, index) => (
          <option
            key={option.value + "-" + index}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
