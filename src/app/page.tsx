import { Button } from "@/components/ui/button";

export default async function Home() {
  const tags = [
    "Cooking",
    "Dev",
    "Fitness",
    "Health",
    "Personal",
    "React",
    "Recipes",
    "Shopping",
    "Travel",
    "TypeScript",
  ];

  return (
    // create an aside layout with a sidebar and main content area
    <div className="flex h-full">
      {/* aside */}
      <div className="w-64 border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <Button variant="default" className="bg: mb-6 w-full justify-start">
          Create Note
        </Button>
        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Tags</p>
        <ul className="space-y-1">
          {tags.map((tag) => (
            <li key={tag}>
              <Button variant="ghost" className="w-full justify-start">
                {tag}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* content */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <p>Welcome to the home page!</p>
      </div>
    </div>
  );
}
