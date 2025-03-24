import { Button } from "@/components/ui/button";
import Picker from "@/sections/picker";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 font-mono tracking-wide">
      <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl font-sans">
        Date Range Picker Component
      </h1>

      <p className="mt-6 text-center text-lg text-muted-foreground">
        Built for{" "}
        <Link
          href="https://ui.shadcn.com"
          className="text-primary underline underline-offset-4"
        >
          shadcn
        </Link>{" "}
        — includes multi-month views, text entry, preset ranges, responsive
        design and date range comparisons.
      </p>

      <div className="mt-10 flex items-center justify-between border-b border-t py-6">
        <Button variant="outline" className="gap-2" asChild>
          <Link href="#">
            <Github className="h-4 w-4" />
            Github
          </Link>
        </Button>

        <div className="relative">
          <Picker />
          <div className="absolute right-0 mt-1 text-sm text-muted-foreground">
            click it 👆
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-6 text-lg">
        <p>
          DateRangePicker is a reusable component built with{" "}
          <Link
            href="https://ui.shadcn.com"
            className="text-primary underline underline-offset-4"
          >
            shadcn
          </Link>{" "}
          using beautifully designed components from{" "}
          <Link
            href="https://www.radix-ui.com/"
            className="text-primary underline underline-offset-4"
          >
            Radix UI
          </Link>{" "}
          and{" "}
          <Link
            href="https://tailwindcss.com/"
            className="text-primary underline underline-offset-4"
          >
            Tailwind CSS
          </Link>
          . It provides a dropdown interface to allow users to select or enter a
          range of dates and includes additional options such as preset date
          ranges and an optional date comparison feature.
        </p>

        <h2 className="mt-10 text-2xl font-bold">Key Features</h2>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <strong>Month & Year Dropdowns</strong> - Quickly navigate to
            specific months and years without excessive clicking
          </li>
          <li>
            <strong>Preset Date Ranges</strong> - One-click selection of common
            ranges like "Last 7 Days", "Last 30 Days", "This Month", etc.
          </li>
          <li>
            <strong>Multi-Month View</strong> - See two months side-by-side for
            easier date range selection
          </li>
          <li>
            <strong>Date Range Comparison</strong> - Compare two different date
            ranges side by side
          </li>
          <li>
            <strong>Responsive Design</strong> - Works beautifully on mobile,
            tablet, and desktop
          </li>
          <li>
            <strong>Keyboard Navigation</strong> - Full keyboard support for
            accessibility
          </li>
          <li>
            <strong>Customizable Styling</strong> - Easily adapt to your design
            system
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold">Usage</h2>
        <pre className="mt-4 rounded-md bg-slate-900 p-4 text-sm text-white">
          <code>{`import { DateRangePicker } from "@component/advanced-date-range-picker";

export default function MyComponent() {
  return (
    <DateRangePicker />
  );
}`}</code>
        </pre>

        <div className="mt-10 flex flex-col gap-2">
          <p>
            Check out the{" "}
            <Link
              href="#"
              className="text-primary underline underline-offset-4"
            >
              project on GitHub
            </Link>{" "}
            for the{" "}
            <Link
              href="#"
              className="text-primary underline underline-offset-4"
            >
              source
            </Link>{" "}
            .
          </p>
          <p>
            Built by{" "}
            <Link
              href="https://www.facebook.com/dev.myomyintaung"
              className="text-primary underline underline-offset-4"
            >
              Myo Myint Aung
            </Link>
            .
          </p>
          <p className="">
            Find me on Facebook{" "}
            <Link
              href="https://www.facebook.com/dev.myomyintaung"
              className="text-primary underline underline-offset-4"
            >
              @dev.myomyintaung
            </Link>{" "}
            .
          </p>
        </div>
      </div>
    </div>
  );
}
