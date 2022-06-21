import React from "react";

export default function Select(props) {
  const { value, onChange, options, className = "bp3-large" } = props;
  return (
    <div className={`bp3-html-select ${className}`}>
      <select value={value} onChange={onChange} {...props}>
        {options.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
    </div>
  );
}
