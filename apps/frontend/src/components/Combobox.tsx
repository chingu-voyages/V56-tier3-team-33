import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "../lib/utils";
import styles from "../assets/comboboxDemo.module.css";

type ComboboxItem = {
  value: string;
  label: string;
};

type ComboboxProps = {
  items: ComboboxItem[];
  placeholder?: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

export function Combobox({
  items,
  placeholder = "Select an option...",
  selectedValue,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const selectedLabel =
    items.find((f) => f.value === selectedValue)?.label ?? placeholder;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className={styles.button} type="button" aria-expanded={open}>
          {selectedLabel}
          <ChevronsUpDown className={styles.icon} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={styles.popoverContent} sideOffset={4}>
          <input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.input}
          />
          <div className={styles.list}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    onChange(item.value);
                    setSearchValue("");
                    setOpen(false);
                  }}
                  className={styles.item}
                >
                  {item.label}
                  <Check
                    className={cn(
                      styles.check,
                      selectedValue === item.value
                        ? styles.visible
                        : styles.hidden,
                    )}
                  />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No option found.</div>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
