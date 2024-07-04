'use client';

import qs from 'query-string';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import Input from '../Form/Input';

const SearchInput = () => {
  const router = useRouter();

  const [value, setValue] = useState<string>('');
  // Adding a hook for debouncing the search Engine
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = { title: debouncedValue };
    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder='What Do You Want To Play'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
