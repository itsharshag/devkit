import DifferenceSharpIcon from "@mui/icons-material/DifferenceSharp";
import PinSharpIcon from "@mui/icons-material/PinSharp";
import QueryBuilderSharpIcon from "@mui/icons-material/QueryBuilderSharp";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import DataObjectIcon from "@mui/icons-material/DataObject";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import LaptopIcon from "@mui/icons-material/LaptopChromebook";

export const groupedTools = [
  {
    name: "Editors",
    tools: [
      {
        location: "/markdown-editor",
        label: "Markdown Editor",
        icon: <i className="fab fa-markdown" style={{ fontSize: "10px" }}></i>,
        description: "Edit Markdown alongside a live preview",
        color: "bg-indigo-700",
        textColor: "text-gray-900",
      },
      {
        location: "/javascript-editor",
        label: "JavaScript Editor",
        icon: <i className="fab fa-js"></i>,
        description: "Edit JS code and test it",
        color: "bg-indigo-700",
        textColor: "text-gray-900",
      },
      {
        location: "/html-editor",
        label: "HTML Editor",
        icon: <i className="fab fa-html5"></i>,
        description: "Edit HTML alongside a live preview",
        color: "bg-indigo-700",
        textColor: "text-gray-900",
      },
      {
        location: "/text-editor",
        label: "Text Editor",
        icon: <i className="fas fa-file-alt"></i>,
        description: "Edit any piece of text",
        color: "bg-indigo-700",
        textColor: "text-gray-900",
      },
    ],
  },
  {
    name: "Utilities",
    tools: [
      {
        location: "/date-inspector",
        label: "Date Inspector",
        //@ts-ignore
        icon: <QueryBuilderSharpIcon fontSize="smallest" />,
        description: "Inspect a date in any format",
        color: "bg-teal-700",
        textColor: "text-gray-700",
      },
      {
        location: "/regexp-tester",
        label: "RegExp Tester",
        //@ts-ignore
        icon: <PinSharpIcon fontSize="smallest" />,
        description: "Test Regular Expressions and view all matches",
        color: "bg-teal-700",
        textColor: "text-gray-700",
      },
      {
        location: "/text-diff",
        label: "Text Diff",
        //@ts-ignore
        icon: <DifferenceSharpIcon fontSize="smallest" />,
        description: "Visualize the difference between two pieces of text",
        color: "bg-teal-700",
        textColor: "text-gray-700",
      },
      {
        location: "/csv-to-json",
        label: "CSV to JSON",
        //@ts-ignore
        icon: <DataObjectIcon fontSize="smallest" />,
        description: "Convert CSV to JSON",
        color: "bg-orange-700",
        textColor: "text-gray-700",
      },
      {
        location: "/json-to-csv",
        label: "JSON to CSV",
        icon: <i className="fas fa-file-csv"></i>,
        description: "Convert JSON to CSV",
        color: "bg-orange-700",
        textColor: "text-gray-700",
      },
      {
        location: "/html-to-jsx",
        label: "HTML to JSX",
        icon: <i className="fab fa-html5"></i>,
        description:
          "Convert HTML to JSX. Convert Tailwind code to React code.",
        color: "bg-orange-700",
        textColor: "text-gray-700",
      },
      {
        location: "/encode-decode",
        label: "Encode Decode",
        //@ts-ignore
        icon: <AutoFixHighIcon fontSize="smallest" />,
        description: "Encode and Decode text in Base64 and URI formats",
        color: "bg-purple-700",
        textColor: "text-gray-700",
      },
      {
        location: "/beautify-minify",
        label: "Beautify Minify",
        //@ts-ignore
        icon: <AutoFixHighIcon fontSize="smallest" />,
        description: "Beautify and Minify JSON, CSS, XML, and SQL",
        color: "bg-purple-700",
        textColor: "text-gray-700",
      },
      {
        location: "/csv-viewer",
        label: "CSV Viewer",
        icon: <i className="fas fa-file-csv"></i>,
        description: "View any CSV file in a table format",
        color: "bg-teal-700",
        textColor: "text-gray-700",
      },
      {
        location: "/hash-generator",
        label: "Hash Generator",
        //@ts-ignore
        icon: <TagSharpIcon fontSize="smallest" />,
        description: "Compute the MD5, SHA1, SHA256, and SHA512 hashes of text",
        color: "bg-teal-700",
        textColor: "text-gray-700",
      },
    ],
  },
];

export const groupedLearningTools = [
  {
    name: "",
    tools: [
      {
        location: "/courses",
        label: "Courses",
        icon: <LaptopIcon sx={{ fontSize: "16px" }} />,
        description: "Learn in a structured format",
        color: "bg-sky-700",
        textColor: "text-gray-900",
      },
      {
        location: "/tech-talks",
        label: "Tech Talks",
        icon: <i className="fas fa-video" style={{ marginLeft: "3px" }}></i>,
        description: "Enrich your knowledge with curated tech talks",
        color: "bg-sky-700",
        textColor: "text-gray-900",
      },
      {
        location: "/programs",
        label: "Programs",
        icon: <i className="fas fa-briefcase"></i>,
        description: "Internships, Mentorships, and other OSS opportunities",
        color: "bg-sky-700",
        textColor: "text-gray-900",
      },
      {
        location: "/bootcamps",
        label: "Bootcamps",
        icon: <i className="fas fa-campground"></i>,
        description: "Find 6-12 month long courses that can land you a job",
        color: "bg-sky-700",
        textColor: "text-gray-900",
      },
      {
        location: "/startup-programs",
        label: "Startup Programs",
        icon: <i className="fas fa-rocket"></i>,
        description:
          "Bring your idea to life with the help of accelerators and other startup programs",
        color: "bg-sky-700",
        textColor: "text-gray-900",
      },
    ],
  },
];

const developerToolsFlattened = groupedTools
  .flatMap((group) => group.tools)
  .map((tool) => ({ ...tool, group: 1 }));

export const tools = [...developerToolsFlattened];

export const toolsMap = tools.reduce((acc, tool) => {
  acc[tool.location] = tool;
  return acc;
}, {});
