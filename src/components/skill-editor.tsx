import React from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Button } from "./button";
import { classNames } from "@/lib/classnames";

export const TechnologySelector = ({
  isLoading = false,
  technologies,
  value,
  onChange,
}: {
  isLoading?: boolean;
  technologies: {
    id: string;
    name: string;
  }[];
  value: {
    id: string;
    name: string;
  };
  onChange: (value: { id: string; name: string }) => void;
}) => {
  const [query, setQuery] = React.useState("");
  const filteredTechnologies = React.useMemo(() => {
    if (query === "") {
      return technologies;
    }
    return technologies.filter((technology) =>
      technology.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [technologies, query]);

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative w-full">
        <div className="relative w-full cursor-default overflow-hidden text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full rounded border border-secondary bg-transparent py-1 px-2 text-lg shadow-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(
              technology: { id: string; name: string } | undefined
            ) => (technology?.name ? technology.name : "")}
            disabled={isLoading}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            Open
          </Combobox.Button>
        </div>

        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded border bg-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredTechnologies.map((technology) => (
              <Combobox.Option
                key={technology.id}
                value={technology}
                className="w-full py-2 px-4 text-left text-sm"
              >
                {technology.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export const ExpertiseSelector = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        className={classNames(
          "h-[38px] w-[38px]",
          value === 1 && "border-2 border-white"
        )}
        onClick={() => onChange(1)}
      >
        1
      </Button>

      <Button
        variant="secondary"
        className={classNames(
          "h-[38px] w-[38px]",
          value === 2 && "border-2 border-white"
        )}
        onClick={() => onChange(2)}
      >
        2
      </Button>

      <Button
        variant="secondary"
        className={classNames(
          "h-[38px] w-[38px]",
          value === 3 && "border-2 border-white"
        )}
        onClick={() => onChange(3)}
      >
        3
      </Button>

      <Button
        variant="secondary"
        className={classNames(
          "h-[38px] w-[38px]",
          value === 4 && "border-2 border-white"
        )}
        onClick={() => onChange(4)}
      >
        4
      </Button>

      <Button
        variant="secondary"
        className={classNames(
          "h-[38px] w-[38px]",
          value === 5 && "border-2 border-white"
        )}
        onClick={() => onChange(5)}
      >
        5
      </Button>
    </div>
  );
};
