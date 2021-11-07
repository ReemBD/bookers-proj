import { useState } from 'react';

export const useToggle = (defaultValue: any) => {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value?: boolean | undefined) {
    setValue((currentValue: boolean | undefined) =>
      typeof value === 'boolean' ? value : !currentValue
    );
  }

  return [value, toggleValue] as const;
};
