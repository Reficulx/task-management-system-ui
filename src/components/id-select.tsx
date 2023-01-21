import React from "react";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: string | number | undefined | null;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  // optinos?: { username: string, id: number} []
  options?: { username: string; title: string }[];
}

/**
 * value: multiple types defined as above
 * onChange only takes undefined or number
 * choose default name if isNaN(Number(value))
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.username} value={option.username}>
          {option.username}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
