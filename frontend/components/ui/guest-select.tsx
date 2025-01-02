import { cn } from "../../lib/utils"
import { Users } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface GuestSelectProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const guestOptions = Array.from({ length: 10 }, (_, i) => i + 1);

export function GuestSelect({ value, onChange, className }: GuestSelectProps) {
  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full flex items-center gap-2 px-4 h-12 bg-gray-50 border border-gray-200 rounded-lg text-left text-base hover:bg-gray-100 transition-colors",
              !value && "text-gray-500"
            )}
          >
            <Users className="h-5 w-5 text-gray-400" />
            <span>{value ? `${value} Guest${value > 1 ? 's' : ''}` : 'Select guests'}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2" align="start">
          <div className="grid grid-cols-2 gap-2">
            {guestOptions.map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => onChange(number)}
                className={cn(
                  "flex items-center justify-center p-3 rounded-lg border hover:border-blue-500 transition-all",
                  value === number ? "border-blue-500 bg-blue-50" : "border-gray-200",
                  "cursor-pointer"
                )}
              >
                <span className="text-gray-900 font-medium">{number}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 