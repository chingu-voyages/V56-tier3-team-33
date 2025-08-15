// components/ComboboxDemo.tsx
"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "../lib/utilis";
import styles from "../assets/comboboxDemo.module.css";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const filteredFrameworks = frameworks.filter((framework) =>
    framework.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const selectedLabel =
    frameworks.find((f) => f.value === selectedValue)?.label ??
    "Select framework...";

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
            placeholder="Search framework..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.input}
          />
          <div className={styles.list}>
            {filteredFrameworks.length > 0 ? (
              filteredFrameworks.map((framework) => (
                <div
                  key={framework.value}
                  onClick={() => {
                    setSelectedValue(framework.value);
                    setSearchValue("");
                    setOpen(false);
                  }}
                  className={styles.item}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      styles.check,
                      selectedValue === framework.value
                        ? styles.visible
                        : styles.hidden,
                    )}
                  />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No framework found.</div>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
