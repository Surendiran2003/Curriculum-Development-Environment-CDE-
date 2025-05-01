// Component name mappings
export const componentNameMap = {
    MJD: 'Major Disciplinary (Compulsory – Hardcore Subjects)',
    MID: 'Minor Disciplinary (Specialization Specific – Softcore Subjects)',
    MLD: 'Multi-Disciplinary',
    FC: 'Foundation Course',
    IDC: 'Interdisciplinary Course',
    AEC: 'Ability Enhancement Courses',
    SEC: 'Skill Enhancement Courses',
    VAC: 'Value Added Courses',
    SI: 'Summer Internship',
    CES: 'Community Engagement Service',
    RPD: 'Research Project/Dissertation',
    ELC: 'Elective',
    DEC: 'Departmental Elective',
    GEC: 'Generic Elective',
    OEC: 'Open Elective',
    MN: 'Minor'
  };
  
  // Get display name for a component
  export const getComponentDisplayName = (componentCode) => {
    if (!componentCode) return '';
    
    const [prefix, number] = componentCode.split(' ');
    const fullName = componentNameMap[prefix] || prefix;
    
    return `${fullName} ${number || ''}`;
  };
  
  // Calculate total credits for a semester
  export const calculateTotalCredits = (courses) => {
    return courses.reduce((total, course) => total + course.credits, 0);
  };
  
  // Calculate total lecture hours for a semester
  export const calculateTotalLectureHours = (courses) => {
    return courses.reduce((total, course) => total + course.lectureHours, 0);
  };
  
  // Calculate total tutorial hours for a semester
  export const calculateTotalTutorialHours = (courses) => {
    return courses.reduce((total, course) => total + course.tutorialHours, 0);
  };
  
  // Calculate total practical hours for a semester
  export const calculateTotalPracticalHours = (courses) => {
    return courses.reduce((total, course) => total + course.practicalHours, 0);
  };