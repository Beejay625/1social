export const exportFormats = [
  { id: "csv", label: "CSV", description: "Comma-separated values" },
  { id: "xlsx", label: "Excel", description: "Microsoft Excel format" },
  { id: "pdf", label: "PDF", description: "Portable Document Format" },
  { id: "json", label: "JSON", description: "JavaScript Object Notation" },
];

export const exportHistory = [
  {
    id: "export-1",
    name: "Q4 Analytics Report",
    format: "pdf",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    size: "2.4 MB",
    downloadUrl: "#",
  },
  {
    id: "export-2",
    name: "Content Performance Data",
    format: "csv",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    size: "856 KB",
    downloadUrl: "#",
  },
  {
    id: "export-3",
    name: "Team Activity Log",
    format: "xlsx",
    status: "processing",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    size: null,
    downloadUrl: null,
  },
];

export const importSources = [
  {
    id: "import-google",
    name: "Google Sheets",
    icon: "📊",
    description: "Import from Google Sheets",
    connected: true,
  },
  {
    id: "import-airtable",
    name: "Airtable",
    icon: "🗄️",
    description: "Import from Airtable base",
    connected: false,
  },
  {
    id: "import-csv",
    name: "CSV Upload",
    icon: "📄",
    description: "Upload CSV file",
    connected: true,
  },
];

