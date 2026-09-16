export const generalQuestions = [
    {
        question: "Which quality is most important when working effectively in a team?",
        options: [
            "Good communication",
            "Working alone",
            "Avoiding responsibility",
            "Competing with teammates"
        ],
        answer: 0
    },
    {
        question: "What should you do when you disagree with a teammate's technical approach?",
        options: [
            "Ignore the teammate",
            "Argue until they agree",
            "Discuss the pros and cons respectfully",
            "Immediately report them"
        ],
        answer: 2
    },
    {
        question: "You are given a task with an unclear requirement. What should you do first?",
        options: [
            "Start coding immediately",
            "Ask for clarification",
            "Ignore the requirement",
            "Wait until someone notices"
        ],
        answer: 1
    },
    {
        question: "Which approach is best when you are facing a difficult problem?",
        options: [
            "Give up immediately",
            "Break the problem into smaller parts",
            "Avoid asking for help",
            "Ignore the problem"
        ],
        answer: 1
    },
    {
        question: "If you make a mistake in a project, what is the most professional response?",
        options: [
            "Hide the mistake",
            "Blame another teammate",
            "Accept it and work on fixing it",
            "Ignore it"
        ],
        answer: 2
    },
    {
        question: "How should you handle a situation when you have multiple deadlines at the same time?",
        options: [
            "Ignore all deadlines",
            "Prioritize tasks based on urgency and importance",
            "Work randomly on every task",
            "Wait until the deadline is close"
        ],
        answer: 1
    },
    {
        question: "What is the best way to respond when receiving constructive feedback?",
        options: [
            "Take it personally",
            "Ignore the feedback",
            "Listen carefully and use it to improve",
            "Argue with the person"
        ],
        answer: 2
    },
    {
        question: "If a teammate is struggling with their assigned task, what should you do?",
        options: [
            "Ignore them",
            "Offer help if possible",
            "Report them immediately",
            "Take credit for their work"
        ],
        answer: 1
    },
    {
        question: "What should you do if you do not know the answer to a question during an interview?",
        options: [
            "Make up an answer",
            "Stay silent",
            "Be honest and explain how you would find the answer",
            "Leave the interview"
        ],
        answer: 2
    },
    {
        question: "Which behavior demonstrates good professional communication?",
        options: [
            "Interrupting others",
            "Listening carefully and communicating clearly",
            "Avoiding conversations",
            "Ignoring messages"
        ],
        answer: 1
    },
    {
        question: "How should you handle a conflict between two team members?",
        options: [
            "Take sides immediately",
            "Ignore the conflict",
            "Encourage a respectful discussion to resolve the issue",
            "Make the conflict worse"
        ],
        answer: 2
    },
    {
        question: "What is the best approach when you are under pressure at work?",
        options: [
            "Panic",
            "Stay organized and focus on priorities",
            "Stop working",
            "Blame others"
        ],
        answer: 1
    },
    {
        question: "Why is active listening important in a professional environment?",
        options: [
            "It helps understand requirements and avoid misunderstandings",
            "It allows you to avoid responsibility",
            "It makes meetings longer",
            "It prevents teamwork"
        ],
        answer: 0
    },
    {
        question: "What should you do when a team decision does not go as planned?",
        options: [
            "Blame the person who suggested it",
            "Learn from the outcome and discuss improvements",
            "Ignore the result",
            "Stop working as a team"
        ],
        answer: 1
    },
    {
        question: "Which quality helps a professional adapt to changes in a project?",
        options: [
            "Flexibility",
            "Stubbornness",
            "Avoiding new tasks",
            "Resistance to feedback"
        ],
        answer: 0
    }
];

export const domainQuestions = {
    "Frontend Developer": [
        {
            question: "Which technology is primarily responsible for defining the structure of a web page?",
            options: ["CSS", "HTML", "JavaScript", "Node.js"],
            answer: 1
        },
        {
            question: "What is the primary purpose of CSS?",
            options: [
                "Database management",
                "Server-side programming",
                "Styling and layout of web pages",
                "API authentication"
            ],
            answer: 2
        },
        {
            question: "Which JavaScript feature allows code to respond to user interactions?",
            options: [
                "Event handling",
                "Database indexing",
                "File compression",
                "Server clustering"
            ],
            answer: 0
        },
        {
            question: "What is responsive web design?",
            options: [
                "Design that works only on desktop",
                "Design that adapts to different screen sizes",
                "Design that uses only JavaScript",
                "Design that requires a backend server"
            ],
            answer: 1
        },
        {
            question: "What is the purpose of browser caching?",
            options: [
                "To store frequently used resources for faster loading",
                "To permanently store passwords",
                "To replace a database",
                "To execute backend code"
            ],
            answer: 0
        },
        {
            question: "Which HTTP status code indicates a successful request?",
            options: ["404", "500", "200", "301"],
            answer: 2
        },
        {
            question: "Which practice generally improves frontend performance?",
            options: [
                "Loading every resource immediately",
                "Optimizing images and reducing unnecessary JavaScript",
                "Using larger images",
                "Avoiding caching"
            ],
            answer: 1
        }
    ],

    "Backend Developer": [
        {
            question: "What is the primary responsibility of a backend application?",
            options: [
                "Designing page colors",
                "Handling server-side logic and data",
                "Creating CSS animations",
                "Designing logos"
            ],
            answer: 1
        },
        {
            question: "Which HTTP method is commonly used to create a resource?",
            options: ["GET", "POST", "DELETE", "HEAD"],
            answer: 1
        },
        {
            question: "What does REST primarily define?",
            options: [
                "A set of architectural principles for web services",
                "A database engine",
                "A programming language",
                "A CSS framework"
            ],
            answer: 0
        },
        {
            question: "Which status code usually indicates that a requested resource was not found?",
            options: ["200", "201", "404", "500"],
            answer: 2
        },
        {
            question: "Why is input validation important in backend applications?",
            options: [
                "Only to improve UI design",
                "To ensure incoming data meets expected rules",
                "To increase image quality",
                "To change HTTP methods"
            ],
            answer: 1
        },
        {
            question: "What is middleware commonly used for in backend frameworks?",
            options: [
                "Processing requests between the request and response",
                "Designing database tables",
                "Creating images",
                "Compiling CSS"
            ],
            answer: 0
        },
        {
            question: "Which HTTP status code commonly represents an internal server error?",
            options: ["201", "301", "404", "500"],
            answer: 3
        }
    ],

    "Full Stack Developer": [
        {
            question: "What does a full stack developer typically work with?",
            options: [
                "Only databases",
                "Only frontend interfaces",
                "Both frontend and backend technologies",
                "Only operating systems"
            ],
            answer: 2
        },
        {
            question: "Which layer is responsible for presenting the user interface?",
            options: [
                "Frontend",
                "Database",
                "Operating system",
                "Network hardware"
            ],
            answer: 0
        },
        {
            question: "What is the purpose of an API between frontend and backend?",
            options: [
                "To allow communication between application components",
                "To replace HTML",
                "To store images permanently",
                "To compile Java"
            ],
            answer: 0
        },
        {
            question: "Which HTTP method is commonly used to retrieve data?",
            options: ["POST", "GET", "PATCH", "DELETE"],
            answer: 1
        },
        {
            question: "What is authentication used for?",
            options: [
                "Determining what a user is allowed to do",
                "Verifying the identity of a user",
                "Styling a webpage",
                "Compressing images"
            ],
            answer: 1
        },
        {
            question: "What is authorization?",
            options: [
                "Verifying user identity",
                "Determining what an authenticated user can access",
                "Creating a database",
                "Rendering HTML"
            ],
            answer: 1
        },
        {
            question: "Which practice helps protect sensitive configuration values?",
            options: [
                "Hardcoding passwords in frontend code",
                "Using environment variables",
                "Publishing API keys publicly",
                "Putting secrets in CSS"
            ],
            answer: 1
        }
    ],

    "MERN Stack Developer": [
        {
            question: "What does the M in MERN stand for?",
            options: ["MySQL", "MongoDB", "MariaDB", "Machine Learning"],
            answer: 1
        },
        {
            question: "Which MERN technology is primarily used for building user interfaces?",
            options: ["MongoDB", "Express.js", "React", "Node.js"],
            answer: 2
        },
        {
            question: "What is Express.js mainly used for?",
            options: [
                "Database storage",
                "Building backend web applications and APIs",
                "Creating UI components",
                "Image editing"
            ],
            answer: 1
        },
        {
            question: "Which runtime allows JavaScript to execute on the server?",
            options: ["React", "MongoDB", "Node.js", "CSS"],
            answer: 2
        },
        {
            question: "Which library is commonly used to interact with MongoDB from Node.js?",
            options: ["Mongoose", "Redux", "Axios", "React Router"],
            answer: 0
        },
        {
            question: "What type of database is MongoDB?",
            options: [
                "Relational database",
                "Document-oriented NoSQL database",
                "Graph database only",
                "File system"
            ],
            answer: 1
        },
        {
            question: "Which tool is commonly used to send HTTP requests from a React application?",
            options: ["Axios", "Mongoose", "MongoDB", "Express Router"],
            answer: 0
        }
    ],

    "Java Developer": [
        {
            question: "Which feature allows Java programs to run on different platforms?",
            options: ["JVM", "CSS", "MongoDB", "HTML"],
            answer: 0
        },
        {
            question: "Which keyword is used to inherit a class in Java?",
            options: ["implements", "extends", "inherits", "super"],
            answer: 1
        },
        {
            question: "Which concept allows the same method name to have different implementations?",
            options: [
                "Inheritance",
                "Polymorphism",
                "Encapsulation",
                "Compilation"
            ],
            answer: 1
        },
        {
            question: "Which collection does not allow duplicate elements?",
            options: ["List", "Set", "ArrayList", "Vector"],
            answer: 1
        },
        {
            question: "What is the purpose of the final keyword?",
            options: [
                "It can prevent modification depending on its usage",
                "It creates a database",
                "It starts a thread",
                "It imports packages"
            ],
            answer: 0
        },
        {
            question: "Which exception is checked at compile time?",
            options: [
                "RuntimeException",
                "NullPointerException",
                "IOException",
                "ArithmeticException"
            ],
            answer: 2
        },
        {
            question: "Which component is responsible for executing Java bytecode?",
            options: ["JVM", "JDK compiler only", "Maven", "Git"],
            answer: 0
        }
    ],

    "Python Developer": [
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["function", "def", "func", "define"],
            answer: 1
        },
        {
            question: "Which Python data type stores key-value pairs?",
            options: ["List", "Tuple", "Dictionary", "Set"],
            answer: 2
        },
        {
            question: "What does PEP 8 primarily provide?",
            options: [
                "Python coding style guidelines",
                "Database commands",
                "Network protocols",
                "Machine learning algorithms"
            ],
            answer: 0
        },
        {
            question: "Which keyword is used to handle exceptions?",
            options: ["catch", "try", "error", "exception"],
            answer: 1
        },
        {
            question: "Which feature allows iteration over a sequence?",
            options: ["for loop", "import", "class", "lambda only"],
            answer: 0
        },
        {
            question: "Which library is widely used for numerical computing in Python?",
            options: ["NumPy", "Express", "React", "Mongoose"],
            answer: 0
        },
        {
            question: "Which Python library is commonly used for data analysis?",
            options: ["Pandas", "Express", "Spring", "React"],
            answer: 0
        }
    ],

    "JavaScript Developer": [
        {
            question: "Which keyword declares a block-scoped variable that can be reassigned?",
            options: ["var", "let", "const", "static"],
            answer: 1
        },
        {
            question: "What does === check in JavaScript?",
            options: [
                "Only value",
                "Only type",
                "Value and type",
                "Only object reference"
            ],
            answer: 2
        },
        {
            question: "What is a Promise used for?",
            options: [
                "Handling asynchronous operations",
                "Creating CSS",
                "Managing databases directly",
                "Defining HTML"
            ],
            answer: 0
        },
        {
            question: "Which method converts JSON text into a JavaScript object?",
            options: [
                "JSON.parse()",
                "JSON.stringify()",
                "JSON.convert()",
                "JSON.object()"
            ],
            answer: 0
        },
        {
            question: "What is a closure?",
            options: [
                "A function retaining access to its lexical scope",
                "A database connection",
                "A CSS property",
                "An HTTP request"
            ],
            answer: 0
        },
        {
            question: "Which method creates a new array by transforming every element?",
            options: ["filter()", "map()", "reduce()", "find()"],
            answer: 1
        },
        {
            question: "What does async/await simplify?",
            options: [
                "Working with asynchronous JavaScript",
                "Writing CSS",
                "Creating database schemas",
                "Compiling Java"
            ],
            answer: 0
        }
    ],

    "React Developer": [
        {
            question: "What is React primarily used for?",
            options: [
                "Building user interfaces",
                "Managing databases",
                "Operating system development",
                "Network routing"
            ],
            answer: 0
        },
        {
            question: "What is a React component?",
            options: [
                "A reusable UI building block",
                "A database table",
                "A server process",
                "A CSS compiler"
            ],
            answer: 0
        },
        {
            question: "Which hook is commonly used to manage state?",
            options: ["useState", "useRoute", "useServer", "useDatabase"],
            answer: 0
        },
        {
            question: "Which hook is commonly used for side effects?",
            options: ["useState", "useEffect", "useClass", "useHTML"],
            answer: 1
        },
        {
            question: "Why are keys used when rendering lists in React?",
            options: [
                "To help React identify list elements",
                "To encrypt data",
                "To connect MongoDB",
                "To create routes"
            ],
            answer: 0
        },
        {
            question: "What is the Virtual DOM?",
            options: [
                "A lightweight representation of the UI used by React",
                "A physical browser component",
                "A database",
                "A server"
            ],
            answer: 0
        },
        {
            question: "What is a controlled component?",
            options: [
                "A form element whose value is controlled by React state",
                "A backend component",
                "A database component",
                "A CSS component"
            ],
            answer: 0
        }
    ],

    "Node.js Developer": [
        {
            question: "What is Node.js?",
            options: [
                "A JavaScript runtime",
                "A database",
                "A CSS framework",
                "A programming language"
            ],
            answer: 0
        },
        {
            question: "Which engine powers Node.js JavaScript execution?",
            options: ["V8", "JVM", "SpiderMonkey only", "CLR"],
            answer: 0
        },
        {
            question: "What is npm?",
            options: [
                "Node Package Manager",
                "Network Processing Module",
                "Node Programming Method",
                "New Package Machine"
            ],
            answer: 0
        },
        {
            question: "What does the Node.js event loop help manage?",
            options: [
                "Asynchronous operations",
                "CSS styling",
                "Database schemas",
                "HTML structure"
            ],
            answer: 0
        },
        {
            question: "Which module system is traditionally associated with Node.js?",
            options: ["CommonJS", "CSS Modules only", "JVM", "FXML"],
            answer: 0
        },
        {
            question: "Which object provides information about environment variables?",
            options: ["process.env", "node.env", "system.env", "global.env"],
            answer: 0
        },
        {
            question: "Why should CPU-heavy operations be handled carefully in Node.js?",
            options: [
                "They can block the event loop",
                "They always delete data",
                "They disable MongoDB",
                "They prevent JavaScript execution permanently"
            ],
            answer: 0
        }
    ],

    "Software Engineer": [
        {
            question: "What is the purpose of a version control system?",
            options: [
                "Track and manage changes to code",
                "Design UI colors",
                "Run databases",
                "Replace testing"
            ],
            answer: 0
        },
        {
            question: "Which data structure follows FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: 1
        },
        {
            question: "Which data structure follows LIFO?",
            options: ["Queue", "Stack", "Heap", "Graph"],
            answer: 1
        },
        {
            question: "What is the average time complexity of binary search on a sorted array?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            answer: 1
        },
        {
            question: "What does O(n) describe?",
            options: [
                "Linear growth of an algorithm's complexity",
                "Constant growth",
                "Exponential growth",
                "No growth"
            ],
            answer: 0
        },
        {
            question: "Why are unit tests useful?",
            options: [
                "They test individual units of code",
                "They replace all debugging",
                "They replace version control",
                "They deploy applications"
            ],
            answer: 0
        },
        {
            question: "Which principle encourages software modules to have a single responsibility?",
            options: [
                "Single Responsibility Principle",
                "FIFO principle",
                "DRY database",
                "HTTP principle"
            ],
            answer: 0
        }
    ],

    "Data Scientist": [
        {
            question: "Which library is commonly used for numerical computing in Python?",
            options: ["NumPy", "React", "Express", "Mongoose"],
            answer: 0
        },
        {
            question: "Which library is widely used for tabular data manipulation?",
            options: ["Pandas", "Node.js", "React", "Spring"],
            answer: 0
        },
        {
            question: "What is the purpose of Exploratory Data Analysis?",
            options: [
                "Understand patterns and characteristics of data",
                "Deploy a server",
                "Create CSS",
                "Encrypt passwords"
            ],
            answer: 0
        },
        {
            question: "What is overfitting?",
            options: [
                "A model performing very well on training data but poorly on unseen data",
                "A model with no parameters",
                "A database error",
                "Missing data"
            ],
            answer: 0
        },
        {
            question: "Which technique can help reduce the effect of extreme values?",
            options: [
                "Outlier handling",
                "HTML rendering",
                "API routing",
                "CSS normalization"
            ],
            answer: 0
        },
        {
            question: "What is a feature in machine learning?",
            options: [
                "An input variable used by a model",
                "The final prediction only",
                "A database table",
                "A programming language"
            ],
            answer: 0
        },
        {
            question: "Why is data preprocessing important?",
            options: [
                "It prepares data for reliable analysis or modeling",
                "It creates UI components",
                "It replaces algorithms",
                "It deploys servers"
            ],
            answer: 0
        }
    ],

    "Data Analyst": [
        {
            question: "Which tool is commonly used for data manipulation in Python?",
            options: ["Pandas", "React", "Express", "Node.js"],
            answer: 0
        },
        {
            question: "What is the mean?",
            options: [
                "The average of a set of values",
                "The middle value only",
                "The most frequent value",
                "The largest value"
            ],
            answer: 0
        },
        {
            question: "What is the median?",
            options: [
                "The middle value when data is ordered",
                "The average",
                "The largest value",
                "The smallest value"
            ],
            answer: 0
        },
        {
            question: "What is an outlier?",
            options: [
                "A value significantly different from other observations",
                "Always the average",
                "A missing column",
                "A duplicate table"
            ],
            answer: 0
        },
        {
            question: "What is data visualization used for?",
            options: [
                "Communicating patterns and insights visually",
                "Encrypting data",
                "Creating APIs",
                "Compiling code"
            ],
            answer: 0
        },
        {
            question: "What is correlation used to measure?",
            options: [
                "The relationship between variables",
                "Database size",
                "Code execution time only",
                "Number of rows only"
            ],
            answer: 0
        },
        {
            question: "What is the purpose of data cleaning?",
            options: [
                "Correcting or handling inaccurate, missing, or inconsistent data",
                "Creating websites",
                "Deploying applications",
                "Writing APIs"
            ],
            answer: 0
        }
    ],

    "Machine Learning Engineer": [
        {
            question: "What is supervised learning?",
            options: [
                "Learning from labeled data",
                "Learning without data",
                "Only database management",
                "Only visualization"
            ],
            answer: 0
        },
        {
            question: "What is the purpose of a training dataset?",
            options: [
                "To train a machine learning model",
                "To deploy the application",
                "To create a UI",
                "To store passwords"
            ],
            answer: 0
        },
        {
            question: "What is overfitting?",
            options: [
                "Poor performance on training data",
                "Good training performance but poor generalization",
                "No training data",
                "A database failure"
            ],
            answer: 1
        },
        {
            question: "What is a model's feature?",
            options: [
                "An input variable",
                "Only the output",
                "A database index",
                "An API route"
            ],
            answer: 0
        },
        {
            question: "What does accuracy measure in classification?",
            options: [
                "The proportion of correct predictions",
                "The number of features",
                "Training time only",
                "Database size"
            ],
            answer: 0
        },
        {
            question: "Why is a validation set used?",
            options: [
                "To evaluate and tune a model during development",
                "To store passwords",
                "To create HTML",
                "To replace training data completely"
            ],
            answer: 0
        },
        {
            question: "What is feature scaling used for?",
            options: [
                "Putting numerical features on comparable scales",
                "Increasing database size",
                "Creating APIs",
                "Rendering components"
            ],
            answer: 0
        }
    ],

    "AI Engineer": [
        {
            question: "What does NLP stand for?",
            options: [
                "Natural Language Processing",
                "Network Learning Protocol",
                "Node Language Program",
                "Natural Logic Processing"
            ],
            answer: 0
        },
        {
            question: "What is a prompt in generative AI?",
            options: [
                "An instruction or input given to an AI model",
                "A database index",
                "A CSS property",
                "A server port"
            ],
            answer: 0
        },
        {
            question: "What is an LLM?",
            options: [
                "Large Language Model",
                "Low Level Machine",
                "Logical Learning Module",
                "Language Link Manager"
            ],
            answer: 0
        },
        {
            question: "What is prompt engineering?",
            options: [
                "Designing effective instructions for AI models",
                "Building database indexes",
                "Creating CSS layouts",
                "Managing DNS"
            ],
            answer: 0
        },
        {
            question: "What is hallucination in generative AI?",
            options: [
                "When a model produces incorrect or fabricated information",
                "When a model shuts down",
                "When a database crashes",
                "When an API returns 404"
            ],
            answer: 0
        },
        {
            question: "What is an embedding commonly used for?",
            options: [
                "Representing information as numerical vectors",
                "Styling websites",
                "Creating HTTP headers",
                "Compiling Java"
            ],
            answer: 0
        },
        {
            question: "Why is output validation important when using AI APIs?",
            options: [
                "AI output may not always follow the expected format",
                "It increases monitor size",
                "It replaces authentication",
                "It disables APIs"
            ],
            answer: 0
        }
    ],

    "DevOps Engineer": [
        {
            question: "What does CI stand for?",
            options: [
                "Continuous Integration",
                "Code Installation",
                "Cloud Interface",
                "Computer Integration"
            ],
            answer: 0
        },
        {
            question: "What does CD commonly stand for in CI/CD?",
            options: [
                "Continuous Delivery/Deployment",
                "Code Database",
                "Computer Design",
                "Cloud Database"
            ],
            answer: 0
        },
        {
            question: "What is Docker primarily used for?",
            options: [
                "Containerizing applications",
                "Writing Java code",
                "Designing UI",
                "Managing SQL queries"
            ],
            answer: 0
        },
        {
            question: "What is Infrastructure as Code?",
            options: [
                "Managing infrastructure using machine-readable configuration",
                "Writing application UI",
                "Creating database records manually",
                "Writing HTML"
            ],
            answer: 0
        },
        {
            question: "What is monitoring used for?",
            options: [
                "Observing system health and performance",
                "Creating CSS",
                "Writing frontend components",
                "Replacing source control"
            ],
            answer: 0
        },
        {
            question: "What is a deployment pipeline?",
            options: [
                "An automated sequence for building, testing, and deploying software",
                "A database table",
                "A UI component",
                "A programming language"
            ],
            answer: 0
        },
        {
            question: "Why are logs important in production systems?",
            options: [
                "They help diagnose application and infrastructure problems",
                "They replace databases",
                "They create frontend pages",
                "They encrypt all traffic"
            ],
            answer: 0
        }
    ],

    "Cloud Engineer": [
        {
            question: "What is cloud computing?",
            options: [
                "On-demand computing resources delivered over a network",
                "Only local storage",
                "A programming language",
                "A CSS framework"
            ],
            answer: 0
        },
        {
            question: "What does scalability mean?",
            options: [
                "The ability to handle increased workload",
                "Deleting servers",
                "Reducing all traffic",
                "Removing databases"
            ],
            answer: 0
        },
        {
            question: "What is virtualization?",
            options: [
                "Creating virtual computing environments",
                "Creating CSS styles",
                "Writing APIs",
                "Encrypting passwords"
            ],
            answer: 0
        },
        {
            question: "What is object storage commonly used for?",
            options: [
                "Storing files and unstructured data",
                "Executing JavaScript",
                "Managing CPU registers",
                "Rendering HTML"
            ],
            answer: 0
        },
        {
            question: "What is load balancing?",
            options: [
                "Distributing traffic across multiple servers",
                "Encrypting files",
                "Creating databases",
                "Writing frontend code"
            ],
            answer: 0
        },
        {
            question: "What is auto-scaling?",
            options: [
                "Automatically adjusting resources based on demand",
                "Automatically deleting all servers",
                "Changing source code",
                "Changing database schema manually"
            ],
            answer: 0
        },
        {
            question: "Why are cloud IAM systems important?",
            options: [
                "They control access to cloud resources",
                "They create UI designs",
                "They compile programs",
                "They replace databases"
            ],
            answer: 0
        }
    ],

    "Cybersecurity Engineer": [
        {
            question: "What is authentication?",
            options: [
                "Verifying a user's identity",
                "Determining database size",
                "Styling a website",
                "Compressing files"
            ],
            answer: 0
        },
        {
            question: "What is authorization?",
            options: [
                "Determining what an authenticated user can access",
                "Verifying identity",
                "Encrypting every file",
                "Creating passwords"
            ],
            answer: 0
        },
        {
            question: "What is encryption used for?",
            options: [
                "Protecting data by transforming it into an encoded form",
                "Improving CSS",
                "Increasing CPU speed",
                "Creating databases"
            ],
            answer: 0
        },
        {
            question: "What is hashing commonly used for?",
            options: [
                "Creating a one-way representation of data",
                "Decrypting passwords",
                "Rendering webpages",
                "Increasing network bandwidth"
            ],
            answer: 0
        },
        {
            question: "What does HTTPS provide?",
            options: [
                "Encrypted communication between client and server",
                "A database engine",
                "A programming language",
                "A CSS framework"
            ],
            answer: 0
        },
        {
            question: "What is SQL injection?",
            options: [
                "An attack involving malicious SQL input",
                "A frontend rendering technique",
                "A cloud deployment method",
                "A Java feature"
            ],
            answer: 0
        },
        {
            question: "Why should passwords generally be hashed rather than stored as plaintext?",
            options: [
                "To reduce the risk of exposing the original passwords",
                "To make passwords longer",
                "To improve CSS",
                "To increase network speed"
            ],
            answer: 0
        }
    ],

    "Database Administrator": [
        {
            question: "What is a database index used for?",
            options: [
                "Improving query performance",
                "Styling tables",
                "Encrypting passwords only",
                "Creating APIs"
            ],
            answer: 0
        },
        {
            question: "What is a primary key?",
            options: [
                "A unique identifier for records",
                "A duplicate field",
                "A database password",
                "A table name"
            ],
            answer: 0
        },
        {
            question: "What is normalization?",
            options: [
                "Organizing relational data to reduce redundancy",
                "Deleting all duplicate databases",
                "Encrypting a database",
                "Creating frontend components"
            ],
            answer: 0
        },
        {
            question: "What is a transaction?",
            options: [
                "A logical unit of database operations",
                "A CSS rule",
                "A frontend component",
                "A network cable"
            ],
            answer: 0
        },
        {
            question: "What does ACID stand for?",
            options: [
                "Atomicity, Consistency, Isolation, Durability",
                "Access, Control, Index, Data",
                "Automatic Code Integration Database",
                "Application Control and Internal Data"
            ],
            answer: 0
        },
        {
            question: "What is a database backup used for?",
            options: [
                "Recovering data after loss or corruption",
                "Increasing frontend speed",
                "Creating APIs",
                "Replacing indexes"
            ],
            answer: 0
        },
        {
            question: "What is a deadlock?",
            options: [
                "A situation where transactions wait indefinitely for each other",
                "A deleted table",
                "A database backup",
                "A frontend error"
            ],
            answer: 0
        }
    ],

    "Mobile App Developer": [
        {
            question: "What is responsive design important for mobile applications?",
            options: [
                "Adapting interfaces to different screen sizes",
                "Creating databases",
                "Encrypting passwords",
                "Managing servers"
            ],
            answer: 0
        },
        {
            question: "What is an API commonly used for in mobile apps?",
            options: [
                "Communicating with backend services",
                "Changing screen brightness",
                "Compiling CSS",
                "Replacing the operating system"
            ],
            answer: 0
        },
        {
            question: "Why is local storage useful in mobile applications?",
            options: [
                "For storing data locally on the device",
                "For creating cloud servers",
                "For styling components",
                "For compiling Java"
            ],
            answer: 0
        },
        {
            question: "What is push notification used for?",
            options: [
                "Sending timely messages to users",
                "Creating databases",
                "Running SQL queries",
                "Rendering CSS"
            ],
            answer: 0
        },
        {
            question: "Why should mobile applications optimize network requests?",
            options: [
                "To reduce latency, bandwidth usage, and battery consumption",
                "To increase app size",
                "To remove authentication",
                "To disable caching"
            ],
            answer: 0
        },
        {
            question: "What is an application lifecycle?",
            options: [
                "The different states an application goes through",
                "A database table",
                "A CSS property",
                "A network protocol"
            ],
            answer: 0
        },
        {
            question: "Why is secure storage important in mobile apps?",
            options: [
                "To protect sensitive local data and credentials",
                "To improve animations",
                "To increase screen size",
                "To create APIs"
            ],
            answer: 0
        }
    ],

    "Android Developer": [
        {
            question: "Which language is officially supported for modern Android development?",
            options: ["Kotlin", "PHP", "Ruby", "SQL"],
            answer: 0
        },
        {
            question: "What is an Activity in Android?",
            options: [
                "A component that typically represents a UI screen",
                "A database table",
                "A server",
                "A CSS file"
            ],
            answer: 0
        },
        {
            question: "What is an Android Intent used for?",
            options: [
                "Communicating between components or requesting actions",
                "Creating SQL tables",
                "Styling UI",
                "Encrypting databases"
            ],
            answer: 0
        },
        {
            question: "What is the Android lifecycle?",
            options: [
                "The sequence of states an Android component moves through",
                "A database schema",
                "A programming language",
                "A network protocol"
            ],
            answer: 0
        },
        {
            question: "What is Gradle commonly used for in Android projects?",
            options: [
                "Build automation and dependency management",
                "UI drawing only",
                "Database administration",
                "Network monitoring"
            ],
            answer: 0
        },
        {
            question: "What is RecyclerView used for?",
            options: [
                "Efficiently displaying lists of items",
                "Creating APIs",
                "Encrypting passwords",
                "Managing servers"
            ],
            answer: 0
        },
        {
            question: "Why are permissions important in Android?",
            options: [
                "They control access to sensitive device resources",
                "They create layouts",
                "They replace activities",
                "They compile Kotlin"
            ],
            answer: 0
        }
    ],

    "iOS Developer": [
        {
            question: "Which language is commonly used for modern iOS development?",
            options: ["Swift", "PHP", "Python only", "SQL"],
            answer: 0
        },
        {
            question: "What is SwiftUI?",
            options: [
                "A framework for building user interfaces",
                "A database",
                "A backend server",
                "A network protocol"
            ],
            answer: 0
        },
        {
            question: "What is UIKit?",
            options: [
                "A framework for building and managing iOS interfaces",
                "A database engine",
                "A cloud platform",
                "A testing language"
            ],
            answer: 0
        },
        {
            question: "What is an optional in Swift?",
            options: [
                "A value that can contain a value or nil",
                "A database field",
                "A UI component",
                "A server"
            ],
            answer: 0
        },
        {
            question: "What is Xcode?",
            options: [
                "Apple's integrated development environment",
                "A database",
                "A web server",
                "A CSS framework"
            ],
            answer: 0
        },
        {
            question: "Why is memory management important in iOS applications?",
            options: [
                "To avoid excessive memory usage and leaks",
                "To create APIs",
                "To change UI colors",
                "To replace networking"
            ],
            answer: 0
        },
        {
            question: "What is an App Store provisioning profile related to?",
            options: [
                "App signing and distribution",
                "Database normalization",
                "CSS styling",
                "HTTP routing"
            ],
            answer: 0
        }
    ],

    "UI/UX Designer": [
        {
            question: "What does UX primarily focus on?",
            options: [
                "User experience and usability",
                "Database indexing",
                "Server deployment",
                "Backend routing"
            ],
            answer: 0
        },
        {
            question: "What does UI primarily refer to?",
            options: [
                "The visual interface users interact with",
                "Database architecture",
                "Server hardware",
                "Network security"
            ],
            answer: 0
        },
        {
            question: "What is a wireframe?",
            options: [
                "A basic visual representation of a page or interface",
                "A database schema",
                "A server",
                "A programming language"
            ],
            answer: 0
        },
        {
            question: "What is a prototype?",
            options: [
                "An interactive representation used to test a design",
                "A production database",
                "A backend server",
                "A CSS compiler"
            ],
            answer: 0
        },
        {
            question: "What is usability testing?",
            options: [
                "Observing users interacting with a design to identify problems",
                "Testing database speed only",
                "Testing server hardware",
                "Writing APIs"
            ],
            answer: 0
        },
        {
            question: "Why is consistency important in UI design?",
            options: [
                "It makes interfaces easier to understand and use",
                "It increases database size",
                "It replaces user testing",
                "It removes accessibility"
            ],
            answer: 0
        },
        {
            question: "What is accessibility in UI/UX?",
            options: [
                "Designing products usable by people with different abilities",
                "Making websites faster only",
                "Adding more animations",
                "Using larger databases"
            ],
            answer: 0
        }
    ],

    "Product Manager": [
        {
            question: "What is the primary responsibility of a product manager?",
            options: [
                "Guide product development toward user and business goals",
                "Write every line of code",
                "Manage only servers",
                "Design every icon"
            ],
            answer: 0
        },
        {
            question: "What is a product requirement?",
            options: [
                "A defined need or capability the product should provide",
                "A database password",
                "A CSS rule",
                "A server log"
            ],
            answer: 0
        },
        {
            question: "What is prioritization used for?",
            options: [
                "Deciding which work should be done first",
                "Deleting all features",
                "Replacing development",
                "Creating database indexes"
            ],
            answer: 0
        },
        {
            question: "What is an MVP?",
            options: [
                "Minimum Viable Product",
                "Maximum Value Program",
                "Managed Version Protocol",
                "Minimum Visual Platform"
            ],
            answer: 0
        },
        {
            question: "Why is user feedback important?",
            options: [
                "It helps understand user needs and improve the product",
                "It replaces all testing",
                "It removes business requirements",
                "It creates databases"
            ],
            answer: 0
        },
        {
            question: "What is a product roadmap?",
            options: [
                "A high-level plan for the product's future direction",
                "A database schema",
                "A programming language",
                "A server configuration"
            ],
            answer: 0
        },
        {
            question: "What is a product metric?",
            options: [
                "A measurable indicator used to evaluate product performance",
                "A CSS property",
                "A source code file",
                "A database password"
            ],
            answer: 0
        }
    ],

    "QA / Test Engineer": [
        {
            question: "What is software testing?",
            options: [
                "Evaluating software to find defects and verify requirements",
                "Writing only production code",
                "Designing logos",
                "Managing databases only"
            ],
            answer: 0
        },
        {
            question: "What is unit testing?",
            options: [
                "Testing individual units of code",
                "Testing an entire organization",
                "Testing only network hardware",
                "Testing UI colors"
            ],
            answer: 0
        },
        {
            question: "What is integration testing?",
            options: [
                "Testing interactions between components",
                "Testing one variable only",
                "Testing hardware temperature",
                "Testing CSS only"
            ],
            answer: 0
        },
        {
            question: "What is regression testing?",
            options: [
                "Testing to ensure existing functionality still works after changes",
                "Testing only new features",
                "Deleting old tests",
                "Testing database passwords"
            ],
            answer: 0
        },
        {
            question: "What is a test case?",
            options: [
                "A defined set of inputs, conditions, and expected results",
                "A database table",
                "A source code compiler",
                "A server process"
            ],
            answer: 0
        },
        {
            question: "What is automation testing?",
            options: [
                "Using tools or scripts to execute tests automatically",
                "Testing without software",
                "Manual UI design",
                "Database backup"
            ],
            answer: 0
        },
        {
            question: "What is a bug?",
            options: [
                "A defect or unexpected behavior in software",
                "A successful deployment",
                "A database schema",
                "A UI component"
            ],
            answer: 0
        }
    ]
};