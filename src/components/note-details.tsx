const NoteDetails = () => {
  return (
    <div className="p-4">
      <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
        React Performance Optimization
      </h2>
      <p className="mb-4 text-sm text-gray-400 dark:text-gray-500">Last edited 29 Oct 2024</p>

      <p className="mb-6">
        Key performance optimization techniques:
        <ol className="ml-6 mt-2 list-decimal">
          <li>Code Splitting</li>
          <li>Memoization</li>
          <li>Virtual List Implementation</li>
        </ol>
      </p>

      <div className="flex space-x-2">
        <button className="dark:bg-app-950 flex-1 rounded-lg border border-gray-300 bg-gray-100 py-2 hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
          Archive Note
        </button>
        <button className="flex-1 rounded-lg border border-red-500 bg-red-500 py-2 text-white hover:bg-red-600">
          Delete Note
        </button>
      </div>
    </div>
  );
};

export default NoteDetails;
