export function cn(...args: (string | boolean | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}
