import * as React from "react";

interface DocumentTitleContext {
  add(title: string, skip: boolean): number;
  remove(key: number): void;
  update(key: number, title: string, skip: boolean): void;
}

const documentTitleContext = React.createContext<DocumentTitleContext | null>(null);

interface DocumentTitleProviderProps {
  defaultTitle?: string;
  prefix?: string;
  suffix?: string;
}

export const DocumentTitleProvider: React.FC<DocumentTitleProviderProps> = ({
  children,
  defaultTitle = "",
  prefix = "",
  suffix = "",
}) => {
  const [titles, setTitles] = React.useState<ReadonlyArray<{ key: number; skip: boolean; title: string }>>([]);

  const add = React.useCallback((title: string, skip: boolean) => {
    const newTitle = { key: Math.random(), skip, title };
    setTitles(prev => [...prev, newTitle]);
    return newTitle.key;
  }, []);

  const remove = React.useCallback((key: number) => {
    setTitles(prev => prev.filter(x => x.key !== key));
  }, []);

  const update = React.useCallback((key: number, title: string, skip: boolean) => {
    setTitles(prev => {
      return prev.map(x => {
        if (x.key === key) {
          return { ...x, skip, title };
        } else {
          return x;
        }
      });
    });
  }, []);

  React.useEffect(() => {
    const appliedTitles = titles.filter(x => !x.skip);
    const { title } = appliedTitles[appliedTitles.length - 1] || { title: defaultTitle };
    document.title = `${prefix}${title}${suffix}`;
  }, [titles]);

  const value: DocumentTitleContext = React.useMemo(() => {
    return {
      add,
      remove,
      update,
    };
  }, [add, remove, update]);

  return <documentTitleContext.Provider value={value}>{children}</documentTitleContext.Provider>;
};

interface UseDocumentTitleOptions {
  skip?: boolean;
}

export function useDocumentTitle(title: string, { skip = false }: UseDocumentTitleOptions = {}) {
  const keyRef = React.useRef<number | null>(null);
  const value = React.useContext(documentTitleContext);
  if (!value) {
    throw new Error("useDocumentTitle was called without DocumentTitleProvider");
  }

  // Register the title in the array on initial mount and remove on unmount
  React.useEffect(() => {
    const key = (keyRef.current = value.add(title, skip));
    return () => value.remove(key);
  }, []);

  // Update the title in-place to maintain priority
  React.useEffect(() => {
    if (keyRef.current) {
      value.update(keyRef.current, title, skip);
    }
  }, [skip, title]);
}
