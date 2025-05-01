// Mock data for courses and component names
export const mockCoursesData = [
    // ==================== SEMESTER I COURSES ====================
    {
      "courseCode": "CS101",
      "title": "Introduction to Computer Science",
      "component": "MJD 1", // Major Disciplinary 1
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamental concepts of computing and programming.",
        "objectives": ["Understand CS fundamentals", "Learn programming basics"],
        "prerequisites": "None",
        "internalMarks": "40",
        "endSemesterMarks": "60",
        "durationTheory": "3 hours",
        "durationPractical": "3 hours",
        "outcomes": [
          "Understand fundamental concepts of computing systems",
          "Develop problem-solving abilities using computational thinking",
          "Implement basic algorithms in a programming language",
          "Analyze the performance of simple algorithms",
          "Recognize the role of computing in various disciplines"
        ],
        "units": [
          {
            "id": 1,
            "number": 1,
            "title": "Introduction to Computing",
            "content": "History of computing – Components of a computer system – Hardware and software concepts – Operating systems – Programming languages and paradigms – Computer networks and the Internet",
            "hours": 10
          },
          {
            "id": 2,
            "number": 2,
            "title": "Problem Solving and Algorithms",
            "content": "Computational thinking – Problem solving strategies – Algorithm design – Flowcharts and pseudocode – Time and space complexity",
            "hours": 8
          },
          {
            "id": 3,
            "number": 3,
            "title": "Programming Fundamentals",
            "content": "Variables and data types – Operators and expressions – Control structures – Functions and procedures – Arrays and strings – File I/O",
            "hours": 12
          },
          {
            "id": 4,
            "number": 4,
            "title": "Data Representation",
            "content": "Number systems – Binary, octal, and hexadecimal – Data representation – Character encoding – Floating point representation – Error detection and correction",
            "hours": 8
          },
          {
            "id": 5,
            "number": 5,
            "title": "Introduction to Data Structures",
            "content": "Abstract data types – Arrays – Linked lists – Stacks – Queues – Trees – Graphs – Applications of data structures",
            "hours": 10
          }
        ],
        "practicalExercises": [
          "Install and configure a programming environment",
          "Implement programs demonstrating basic programming constructs",
          "Develop programs using arrays and strings",
          "Implement simple data structures",
          "Create applications with file I/O",
          "Develop a mini-project integrating various concepts"
        ],
        "practicalHoursPerExercise": [2, 4, 4, 6, 4, 8],
        "references": [
          {
            "author": "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
            "title": "Introduction to Algorithms",
            "publisher": "MIT Press",
            "year": "2022"
          },
          {
            "author": "Brian W. Kernighan, Dennis M. Ritchie",
            "title": "The C Programming Language",
            "publisher": "Prentice Hall",
            "year": "1988"
          },
          {
            "author": "Donald Knuth",
            "title": "The Art of Computer Programming, Volume 1",
            "publisher": "Addison-Wesley",
            "year": "1997"
          }
        ],
        "designedBy": "Department of Computer Science"
      }
    },
    {
      "courseCode": "MA101",
      "title": "Discrete Mathematics",
      "component": "MID 1", // Minor Disciplinary 1
      "hs": "H",
      "credits": 3,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 0
      },
      "syllabus": {
        "description": "Mathematical structures that are fundamentally discrete.",
        "objectives": ["Learn set theory", "Understand logic and proofs"]
      }
    },
    {
      "courseCode": "EN101",
      "title": "Technical Communication",
      "component": "AEC 1", // Ability Enhancement 1
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 1,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Effective communication for technical professionals.",
        "objectives": ["Develop writing skills", "Improve presentation techniques"]
      }
    },
    {
      "courseCode": "CS102",
      "title": "Programming Laboratory",
      "component": "SEC 1", // Skill Enhancement 1
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 0,
        "T": 0,
        "P": 4
      },
      "syllabus": {
        "description": "Hands-on programming experience in C/C++.",
        "objectives": ["Implement data structures", "Develop programming skills"]
      }
    },
    {
      "courseCode": "HU101",
      "title": "Ethics in Computing",
      "component": "VAC 1", // Value Added 1
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 0
      },
      "syllabus": {
        "description": "Ethical considerations in computing and technology.",
        "objectives": ["Understand ethical frameworks", "Apply ethics to technology"]
      }
    },
    
    // ==================== SEMESTER II COURSES ====================
    {
      "courseCode": "CS201",
      "title": "Data Structures",
      "component": "MJD 2", // Major Disciplinary 2
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamental data structures and their implementations.",
        "objectives": ["Implement common data structures", "Analyze algorithm complexity"]
      }
    },
    {
      "courseCode": "CS202",
      "title": "Object-Oriented Programming",
      "component": "MJD 3", // Major Disciplinary 3
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Principles and practices of object-oriented programming.",
        "objectives": ["Master OOP concepts", "Design class hierarchies"]
      }
    },
    {
      "courseCode": "MA201",
      "title": "Probability and Statistics",
      "component": "MID 2", // Minor Disciplinary 2
      "hs": "H",
      "credits": 3,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 0
      },
      "syllabus": {
        "description": "Fundamentals of probability theory and statistical methods.",
        "objectives": ["Understand probability distributions", "Apply statistical tests"]
      }
    },
    {
      "courseCode": "EC201",
      "title": "Digital Electronics",
      "component": "MID 3", // Minor Disciplinary 3
      "hs": "H",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Digital circuits and logic design fundamentals.",
        "objectives": ["Design combinational circuits", "Implement sequential logic"]
      }
    },
    {
      "courseCode": "EN201",
      "title": "Professional Communication",
      "component": "AEC 2", // Ability Enhancement 2
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 1,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Advanced communication skills for professional settings.",
        "objectives": ["Develop report writing", "Master interview skills"]
      }
    },
  
    // ==================== SEMESTER III COURSES ====================
    {
      "courseCode": "CS301",
      "title": "Database Systems",
      "component": "MJD 4", // Major Disciplinary 4
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamentals of database design and implementation.",
        "objectives": ["Design relational schemas", "Implement SQL queries"]
      }
    },
    {
      "courseCode": "CS302",
      "title": "Computer Networks",
      "component": "MJD 5", // Major Disciplinary 5
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Principles and practices of computer networking.",
        "objectives": ["Understand network protocols", "Implement socket programming"]
      }
    },
    {
      "courseCode": "CS303",
      "title": "Operating Systems",
      "component": "MJD 6", // Major Disciplinary 6
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Design and implementation of operating systems.",
        "objectives": ["Understand process management", "Implement multithreading"]
      }
    },
    {
      "courseCode": "SE301",
      "title": "Software Engineering",
      "component": "MID 4", // Minor Disciplinary 4
      "hs": "H",
      "credits": 3,
      "hours": {
        "L": 3,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Principles and practices of software development.",
        "objectives": ["Apply software development methodologies", "Practice team-based development"]
      }
    },
    {
      "courseCode": "CS304",
      "title": "Web Development",
      "component": "SEC 2", // Skill Enhancement 2
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Modern web development technologies and frameworks.",
        "objectives": ["Build responsive websites", "Implement client-server architecture"]
      }
    },
  
    // ==================== SEMESTER IV COURSES ====================
    {
      "courseCode": "CS401",
      "title": "Machine Learning",
      "component": "MJD 7", // Major Disciplinary 7
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamentals of machine learning algorithms and applications.",
        "objectives": ["Implement supervised learning", "Evaluate model performance"]
      }
    },
    {
      "courseCode": "CS402",
      "title": "Artificial Intelligence",
      "component": "MID 5", // Minor Disciplinary 5
      "hs": "H",
      "credits": 3,
      "hours": {
        "L": 3,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamentals of artificial intelligence and intelligent systems.",
        "objectives": ["Implement search algorithms", "Design knowledge-based systems"]
      }
    },
    {
      "courseCode": "CS403",
      "title": "Compiler Design",
      "component": "MJD 8", // Major Disciplinary 8
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Principles and techniques of compiler construction.",
        "objectives": ["Build lexical analyzers", "Implement parsers and code generators"]
      }
    },
    {
      "courseCode": "CS404",
      "title": "Computer Graphics",
      "component": "MID 6", // Minor Disciplinary 6 (option 1)
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamentals of computer graphics and visualization.",
        "objectives": ["Implement rendering algorithms", "Create interactive graphics"]
      }
    },
    {
      "courseCode": "CS405",
      "title": "Cryptography and Network Security",
      "component": "MID 6", // Minor Disciplinary 6 (option 2)
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Principles and practices of cryptography and network security.",
        "objectives": ["Understand encryption algorithms", "Implement secure communications"]
      }
    },
    {
      "courseCode": "CS406",
      "title": "Cloud Computing",
      "component": "MID 6", // Minor Disciplinary 6 (option 3)
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Principles and practices of cloud computing.",
        "objectives": ["Design cloud architecture", "Implement distributed systems"]
      }
    },
    {
      "courseCode": "CS407",
      "title": "Mobile Application Development",
      "component": "SEC 3", // Skill Enhancement 3
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Design and development of mobile applications.",
        "objectives": ["Build Android applications", "Implement responsive mobile UI"]
      }
    },
    
    // ==================== SEMESTER V COURSES ====================
    {
      "courseCode": "CS501",
      "title": "Big Data Analytics",
      "component": "MJD 9", // Major Disciplinary 9
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Processing and analyzing large-scale data sets.",
        "objectives": ["Use Hadoop ecosystem", "Implement MapReduce algorithms"]
      }
    },
    {
      "courseCode": "CS502",
      "title": "Internet of Things",
      "component": "MJD 10", // Major Disciplinary 10
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamentals of IoT architectures and applications.",
        "objectives": ["Design IoT systems", "Implement sensor networks"]
      }
    },
    {
      "courseCode": "CS503",
      "title": "Data Mining",
      "component": "MID 7", // Minor Disciplinary 7 (option 1)
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Techniques for discovering patterns in large data sets.",
        "objectives": ["Implement clustering algorithms", "Apply association rule mining"]
      }
    },
    {
      "courseCode": "CS504",
      "title": "Natural Language Processing",
      "component": "MID 7", // Minor Disciplinary 7 (option 2)
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Computational techniques for analyzing human language.",
        "objectives": ["Implement text processing algorithms", "Build language models"]
      }
    },
    {
      "courseCode": "CS505",
      "title": "Computer Vision",
      "component": "MID 7", // Minor Disciplinary 7 (option 3)
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Techniques for acquiring, processing, and analyzing visual data.",
        "objectives": ["Implement image processing algorithms", "Build object recognition systems"]
      }
    },
    {
      "courseCode": "CS506",
      "title": "Blockchain Technology",
      "component": "SEC 4", // Skill Enhancement 4
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamentals of blockchain architecture and applications.",
        "objectives": ["Implement distributed ledgers", "Develop smart contracts"]
      }
    },
    {
      "courseCode": "MG501",
      "title": "Technology Management",
      "component": "VAC 2", // Value Added 2
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 0
      },
      "syllabus": {
        "description": "Management principles for technology organizations.",
        "objectives": ["Understand innovation management", "Apply strategic planning"]
      }
    },
    
    // ==================== SEMESTER VI COURSES ====================
    {
      "courseCode": "CS601",
      "title": "Deep Learning",
      "component": "MJD 11", // Major Disciplinary 11
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Advanced neural network architectures and applications.",
        "objectives": ["Implement CNNs and RNNs", "Build deep learning models"]
      }
    },
    {
      "courseCode": "CS602",
      "title": "Quantum Computing",
      "component": "MID 8", // Minor Disciplinary 8 (option 1)
      "hs": "H",
      "credits": 3,
      "hours": {
        "L": 3,
        "T": 0,
        "P": 0
      },
      "syllabus": {
        "description": "Fundamentals of quantum computing and algorithms.",
        "objectives": ["Understand quantum mechanics basics", "Implement quantum algorithms"]
      }
    },
    {
      "courseCode": "CS603",
      "title": "Robotics",
      "component": "MID 8", // Minor Disciplinary 8 (option 2)
      "hs": "H",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Principles of robotic systems and applications.",
        "objectives": ["Design robotic systems", "Implement control algorithms"]
      }
    },
    {
      "courseCode": "CS604",
      "title": "Augmented and Virtual Reality",
      "component": "MID 8", // Minor Disciplinary 8 (option 3)
      "hs": "H",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Design and development of AR/VR applications.",
        "objectives": ["Create immersive experiences", "Implement AR/VR interfaces"]
      }
    },
    {
      "courseCode": "CS605",
      "title": "DevOps and Continuous Integration",
      "component": "SEC 5", // Skill Enhancement 5
      "hs": "S",
      "credits": 3,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Principles and practices of DevOps and CI/CD.",
        "objectives": ["Implement CI/CD pipelines", "Automate deployment processes"]
      }
    },
    {
      "courseCode": "CS606",
      "title": "Capstone Project",
      "component": "MLD 1", // Multi-Disciplinary 1
      "hs": "H",
      "credits": 6,
      "hours": {
        "L": 0,
        "T": 0,
        "P": 12
      },
      "syllabus": {
        "description": "Comprehensive project integrating multiple disciplines.",
        "objectives": ["Apply full development lifecycle", "Demonstrate technical proficiency"]
      }
    },
    
    // ==================== SEMESTER VII COURSES (MSc/MTech) ====================
    {
      "courseCode": "CS701",
      "title": "Advanced Machine Learning",
      "component": "MJD 12", // Major Disciplinary 12
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 2
      },
      "syllabus": {
        "description": "Advanced topics in machine learning and data science.",
        "objectives": ["Implement reinforcement learning", "Apply GANs and transformers"]
      }
    },
    {
      "courseCode": "CS702",
      "title": "Research Methodology",
      "component": "AEC 3", // Ability Enhancement 3
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 0
      },
      "syllabus": {
        "description": "Principles and practices of research in computer science.",
        "objectives": ["Design research studies", "Write research papers"]
      }
    },
    {
      "courseCode": "CS703",
      "title": "High Performance Computing",
      "component": "MID 9", // Minor Disciplinary 9 (option 1)
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Parallel and distributed computing principles.",
        "objectives": ["Implement parallel algorithms", "Optimize computational performance"]
      }
    },
    {
      "courseCode": "CS704",
      "title": "Advanced Computer Architecture",
      "component": "MID 9", // Minor Disciplinary 9 (option 2)
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 3,
        "T": 1,
        "P": 0
      },
      "syllabus": {
        "description": "Advanced topics in computer architecture and organization.",
        "objectives": ["Analyze processor designs", "Optimize memory hierarchies"]
      }
    },
    
    // ==================== SEMESTER VIII COURSES (MSc/MTech) ====================
    {
      "courseCode": "CS801",
      "title": "Thesis/Dissertation",
      "component": "MLD 2", // Multi-Disciplinary 2
      "hs": "H",
      "credits": 12,
      "hours": {
        "L": 0,
        "T": 0,
        "P": 24
      },
      "syllabus": {
        "description": "Independent research culminating in a thesis.",
        "objectives": ["Conduct original research", "Write scholarly dissertation"]
      }
    },
    {
      "courseCode": "CS802",
      "title": "Advanced Topics in Computer Science",
      "component": "MJD 13", // Major Disciplinary 13
      "hs": "H",
      "credits": 4,
      "hours": {
        "L": 4,
        "T": 0,
        "P": 0
      },
      "syllabus": {
        "description": "Cutting-edge topics in computer science research.",
        "objectives": ["Analyze current research", "Develop novel solutions"]
      }
    },
    
    // ==================== MOOC AND ONLINE COURSE OPTIONS ====================
    {
      "courseCode": "MOOC101",
      "title": "Introduction to Data Science",
      "component": "VAC 3", // Value Added 3 (option 1)
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 2
      },
      "syllabus": {
        "description": "Fundamentals of data science and analytics.",
        "objectives": ["Apply data analysis techniques", "Visualize data insights"]
      }
    },
    {
      "courseCode": "MOOC102",
      "title": "UI/UX Design",
      "component": "VAC 3", // Value Added 3 (option 2)
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 1,
        "T": 0,
        "P": 3
      },
      "syllabus": {
        "description": "Principles and practices of user interface design.",
        "objectives": ["Design user-centered interfaces", "Conduct usability testing"]
      }
    },
    {
      "courseCode": "MOOC103",
      "title": "Game Development",
      "component": "VAC 3", // Value Added 3 (option 3)
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 1,
        "T": 0,
        "P": 3
      },
      "syllabus": {
        "description": "Fundamentals of game design and development.",
        "objectives": ["Create interactive games", "Implement game mechanics"]
      }
    },
    {
      "courseCode": "MOOC104",
      "title": "Digital Marketing",
      "component": "VAC 4", // Value Added 4 (option 1)
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 0
      },
      "syllabus": {
        "description": "Strategies and techniques for digital marketing.",
        "objectives": ["Develop marketing campaigns", "Analyze marketing metrics"]
      }
    },
    {
      "courseCode": "MOOC105",
      "title": "Entrepreneurship",
      "component": "VAC 4", // Value Added 4 (option 2)
      "hs": "S",
      "credits": 2,
      "hours": {
        "L": 2,
        "T": 0,
        "P": 0
      },
      "syllabus": {
        "description": "Fundamentals of starting and running a business.",
        "objectives": ["Create business plans", "Understand funding mechanisms"]
      }
    }
  ];
  
  // Component name mapping
  export const componentNameMap = {
    "MJD": "Major Disciplinary",
    "MID": "Minor Disciplinary",
    "AEC": "Ability Enhancement",
    "SEC": "Skill Enhancement",
    "VAC": "Value-Added",
    "MLD": "Multi-Disciplinary"
  };
  
  // Initial semester data
  export const initialSemesterData = [
    { id: 1, name: 'Semester I', courses: [] },
    { id: 2, name: 'Semester II', courses: [] },
    { id: 3, name: 'Semester III', courses: [] },
    { id: 4, name: 'Semester IV', courses: [] },
    { id: 5, name: 'Semester V', courses: [] },
    { id: 6, name: 'Semester VI', courses: [] },
    { id: 7, name: 'Semester VII', courses: [] },
    { id: 8, name: 'Semester VIII', courses: [] }
  ];
  
  // Pre-populated semester data (optional - for testing)
  export const prePopulatedSemesterData = [
    { 
      id: 1, 
      name: 'Semester I', 
      courses: [
        {
          id: 101,
          code: "CS101",
          title: "Introduction to Computer Science",
          component: "MJD 1",
          hs: "H",
          credits: 4,
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 2
        },
        {
          id: 102,
          code: "MA101",
          title: "Discrete Mathematics",
          component: "MID 1",
          hs: "H",
          credits: 3,
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0
        },
        {
          id: 103,
          code: "EN101",
          title: "Technical Communication",
          component: "AEC 1",
          hs: "S",
          credits: 2,
          lectureHours: 1,
          tutorialHours: 0,
          practicalHours: 2
        },
        {
          id: 104,
          code: "CS102",
          title: "Programming Laboratory",
          component: "SEC 1",
          hs: "S",
          credits: 2,
          lectureHours: 0,
          tutorialHours: 0,
          practicalHours: 4
        },
        {
          id: 105,
          code: "HU101",
          title: "Ethics in Computing",
          component: "VAC 1",
          hs: "S",
          credits: 2,
          lectureHours: 2,
          tutorialHours: 0,
          practicalHours: 0
        }
      ]
    },
    { 
      id: 2, 
      name: 'Semester II', 
      courses: [
        {
          id: 201,
          code: "CS201",
          title: "Data Structures",
          component: "MJD 2",
          hs: "H",
          credits: 4,
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 2
        },
        {
          id: 202,
          code: "CS202",
          title: "Object-Oriented Programming",
          component: "MJD 3",
          hs: "H",
          credits: 4,
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 2
        },
        {
          id: 203,
          code: "MA201",
          title: "Probability and Statistics",
          component: "MID 2",
          hs: "H",
          credits: 3,
          lectureHours: 3,
          tutorialHours: 1,
          practicalHours: 0
        },
        {
          id: 204,
          code: "EC201",
          title: "Digital Electronics",
          component: "MID 3",
          hs: "H",
          credits: 3,
          lectureHours: 2,
          tutorialHours: 1,
          practicalHours: 2
        },
        {
          id: 205,
          code: "EN201",
          title: "Professional Communication",
          component: "AEC 2",
          hs: "S",
          credits: 2,
          lectureHours: 1,
          tutorialHours: 0,
          practicalHours: 2
        }
      ]
    },
    { id: 3, name: 'Semester III', courses: [] },
    { id: 4, name: 'Semester IV', courses: [] },
    { id: 5, name: 'Semester V', courses: [] },
    { id: 6, name: 'Semester VI', courses: [] },
    { id: 7, name: 'Semester VII', courses: [] },
    { id: 8, name: 'Semester VIII', courses: [] }
  ];