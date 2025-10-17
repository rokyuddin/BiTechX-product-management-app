import { useEffect, useRef } from "react";

interface UseOutsideClickProps {
  /**
   * Callback function to execute when clicking outside the element
   */
  callback: () => void;
  /**
   * Whether the hook is enabled (default: true)
   */
  enabled?: boolean;
}

/**
 * Custom hook that handles clicks outside of a given element
 * @param callback - Function to call when clicking outside
 * @param enabled - Whether the hook should be active (default: true)
 * @returns Ref to attach to the element you want to detect outside clicks for
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsOpen(true)}>Open</button>
 *       {isOpen && (
 *         <div ref={ref}>
 *           <p>Click outside to close</p>
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 * ```
 */
export function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  enabled: boolean = true
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      // Check if the clicked element is inside the ref element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [callback, enabled]);

  return ref;
}

export default useOutsideClick;
