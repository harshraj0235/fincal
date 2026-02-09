
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Download, Mail, Phone, MapPin, Linkedin, Github, User, Code, Award, FileText, GraduationCap, Plus, Trash2, Minus, Briefcase } from "lucide-react";
import { getPdfLibs } from '../lib/pdfExportClient';

// Types
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  address: string;
}

interface Education {
  degree: string;
  institution: string;
  gpa: string;
  year: string;
}

interface Experience {
  position: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

interface Project {
  name: string;
  date: string;
  description: string[];
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  achievements: string[];
  certifications: string[];
}

// PDF Generation Function
const generatePDF = async (resumeData: ResumeData) => {
  const { html2canvas, jsPDF } = await getPdfLibs();
  try {
    const element = document.getElementById('resume-content');
    if (!element) {
      console.error('Resume content element not found');
      return;
    }

    const originalWidth = element.style.width;
    const originalHeight = element.style.height;
    
    element.style.width = '794px';
    element.style.height = 'auto';
    element.style.minHeight = '1123px';

    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: element.scrollHeight,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('resume-content');
        if (clonedElement) {
          clonedElement.style.width = '794px';
          clonedElement.style.height = 'auto';
        }
      }
    });

    element.style.width = originalWidth;
    element.style.height = originalHeight;

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (imgHeight <= pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pdfHeight;
      }
    }

    const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    console.log('ATS-friendly PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

// Main Resume Builder Component
const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "HARSH RAJ",
      email: "harshitpatel0235@gmail.com",
      phone: "+91-963-136-5869",
      linkedin: "LinkedIn",
      github: "github.com/harshraj0235",
      address: "72 A, Indrapuri, Bhopal, Madhya Pradesh (462022), India"
    },
    summary: "Highly motivated IT student with a strong foundation in Java and web development, seeking jobs to apply skills in real-world projects. Proven track record of success in academic and extracurricular activities, demonstrating strong problem-solving abilities and a passion for technology.",
    education: [
      {
        degree: "Bachelor of Technology in Information Technology",
        institution: "Lakshmi Narain College of Technology (LNCT), Bhopal, India",
        gpa: "7.8 (Till 5th semester)",
        year: ""
      }
    ],
    experience: [
      {
        position: "Web Developer Intern",
        company: "Oasis Infobyte",
        duration: "Nov'22 - Dec'22",
        responsibilities: [
          "Optimized website performance and enhanced user experience",
          "Collaborated with the development team to implement updates and enhancements",
          "Learned SEO techniques to improve online presence"
        ]
      }
    ],
    skills: [
      "Java", "JavaScript", "Web Development", "HTML", "CSS", "React", 
      "GitHub", "MySQL", "DSA", "OOPS", "Python", "Flask", "FastAPI"
    ],
    projects: [
      {
        name: "CS Quiz Master",
        date: "April'24",
        description: [
          "Use JavaScript to dynamically manage a database of categorized computer science MCQs",
          "Present an interactive quiz interface with a timer for each topic section",
          "Automatically calculate and display quiz results with performance feedback upon completion"
        ]
      },
      {
        name: "Weather App",
        date: "Aug'23",
        description: [
          "Fetch weather data from an API like OpenWeatherMap",
          "Display current weather and forecast",
          "Option to search for weather in different cities"
        ]
      }
    ],
    achievements: [
      "3-star rating on HackerRank for Java",
      "Ranked among top 300 on GeeksforGeeks",
      "Active participation in cricket, badminton, and biking"
    ],
    certifications: [
      "Java – Apna college",
      "Html, Css, JavaScript - Coursera"
    ]
  });

  const [jobDescription, setJobDescription] = useState(`About PwC:
At PwC, our purpose is to build trust in society and solve important problems. With offices in 156 countries and more than 295,000 people, we are among the leading professional services networks in the world.

Job Position Title: Specialist_GRC Risk Consulting_Advisory

Key Responsibilities:
- Assist in identifying, analyzing, and mitigating financial risks in diverse client engagements
- Support the team in conducting compliance assessments and developing risk management frameworks
- Participate in data analysis and report preparation to support risk and compliance projects
- Collaborate with team members to deliver innovative solutions tailored to client needs
- Stay updated on the latest trends and regulatory changes impacting the financial industry

Mandatory skill sets:
- Basic problem solving skills
- Excellent communication skills including proficiency in English language
- Open to regular travel
- Self-disciplined and self-motivated
- Ability to innovate, create lasting relationships and work independently

Preferred skill sets:
- Proficiency in excel and power point

Education qualification: B.Com`);

  // Helper functions
  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  const updateEducation = (education: Education[]) => {
    setResumeData({ ...resumeData, education });
  };

  const updateExperience = (experience: Experience[]) => {
    setResumeData({ ...resumeData, experience });
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData({ ...resumeData, projects });
  };

  const updateSkills = (value: string) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setResumeData({ ...resumeData, skills: skillsArray });
  };

  const updateAchievements = (value: string) => {
    const achievementsArray = value.split('\n').filter(achievement => achievement.trim());
    setResumeData({ ...resumeData, achievements: achievementsArray });
  };

  const updateCertifications = (value: string) => {
    const certificationsArray = value.split('\n').filter(cert => cert.trim());
    setResumeData({ ...resumeData, certifications: certificationsArray });
  };

  // Education section functions
  const addEducation = () => {
    const newEducation: Education = { degree: "", institution: "", gpa: "", year: "" };
    updateEducation([...resumeData.education, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    updateEducation(updatedEducation);
  };

  const updateEducationField = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = resumeData.education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    updateEducation(updatedEducation);
  };

  // Experience section functions
  const addExperience = () => {
    const newExperience: Experience = { position: "", company: "", duration: "", responsibilities: [""] };
    updateExperience([...resumeData.experience, newExperience]);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
    updateExperience(updatedExperience);
  };

  const updateExperienceField = (index: number, field: keyof Experience, value: string | string[]) => {
    const updatedExperience = resumeData.experience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    updateExperience(updatedExperience);
  };

  const addResponsibility = (expIndex: number) => {
    const updatedExperience = resumeData.experience.map((exp, i) => 
      i === expIndex ? { ...exp, responsibilities: [...exp.responsibilities, ""] } : exp
    );
    updateExperience(updatedExperience);
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const updatedExperience = resumeData.experience.map((exp, i) => 
      i === expIndex ? { 
        ...exp, 
        responsibilities: exp.responsibilities.filter((_, j) => j !== respIndex) 
      } : exp
    );
    updateExperience(updatedExperience);
  };

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    const updatedExperience = resumeData.experience.map((exp, i) => 
      i === expIndex ? {
        ...exp,
        responsibilities: exp.responsibilities.map((resp, j) => j === respIndex ? value : resp)
      } : exp
    );
    updateExperience(updatedExperience);
  };

  // Projects section functions
  const addProject = () => {
    const newProject: Project = { name: "", date: "", description: [""] };
    updateProjects([...resumeData.projects, newProject]);
  };

  const removeProject = (index: number) => {
    const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
    updateProjects(updatedProjects);
  };

  const updateProjectField = (index: number, field: keyof Project, value: string | string[]) => {
    const updatedProjects = resumeData.projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    updateProjects(updatedProjects);
  };

  const addDescription = (projectIndex: number) => {
    const updatedProjects = resumeData.projects.map((project, i) => 
      i === projectIndex ? { ...project, description: [...project.description, ""] } : project
    );
    updateProjects(updatedProjects);
  };

  const removeDescription = (projectIndex: number, descIndex: number) => {
    const updatedProjects = resumeData.projects.map((project, i) => 
      i === projectIndex ? { 
        ...project, 
        description: project.description.filter((_, j) => j !== descIndex) 
      } : project
    );
    updateProjects(updatedProjects);
  };

  const updateDescription = (projectIndex: number, descIndex: number, value: string) => {
    const updatedProjects = resumeData.projects.map((project, i) => 
      i === projectIndex ? {
        ...project,
        description: project.description.map((desc, j) => j === descIndex ? value : desc)
      } : project
    );
    updateProjects(updatedProjects);
  };

  const handleDownloadPDF = () => {
    generatePDF(resumeData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ATS-Friendly Resume Builder
          </h1>
          <p className="text-lg text-gray-600">
            Create professional resumes tailored to job descriptions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Job Description */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] border-gray-200 focus:border-blue-500"
                />
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => updatePersonalInfo('name', e.target.value)}
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={resumeData.personalInfo.github}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={resumeData.personalInfo.address}
                    onChange={(e) => updatePersonalInfo('address', e.target.value)}
                    className="border-gray-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  placeholder="Write your professional summary..."
                  value={resumeData.summary}
                  onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                  className="min-h-[100px] border-gray-200 focus:border-blue-500"
                />
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">Education {index + 1}</h3>
                      <Button
                        onClick={() => removeEducation(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) => updateEducationField(index, 'degree', e.target.value)}
                          placeholder="Bachelor of Technology..."
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`institution-${index}`}>Institution</Label>
                        <Input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) => updateEducationField(index, 'institution', e.target.value)}
                          placeholder="University name..."
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`gpa-${index}`}>GPA/CGPA</Label>
                        <Input
                          id={`gpa-${index}`}
                          value={edu.gpa}
                          onChange={(e) => updateEducationField(index, 'gpa', e.target.value)}
                          placeholder="7.8 (Till 5th semester)"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`year-${index}`}>Year</Label>
                        <Input
                          id={`year-${index}`}
                          value={edu.year}
                          onChange={(e) => updateEducationField(index, 'year', e.target.value)}
                          placeholder="2020-2024"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addEducation} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {resumeData.experience.map((exp, expIndex) => (
                  <div key={expIndex} className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">Experience {expIndex + 1}</h3>
                      <Button
                        onClick={() => removeExperience(expIndex)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`position-${expIndex}`}>Position</Label>
                        <Input
                          id={`position-${expIndex}`}
                          value={exp.position}
                          onChange={(e) => updateExperienceField(expIndex, 'position', e.target.value)}
                          placeholder="Web Developer Intern"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`company-${expIndex}`}>Company</Label>
                        <Input
                          id={`company-${expIndex}`}
                          value={exp.company}
                          onChange={(e) => updateExperienceField(expIndex, 'company', e.target.value)}
                          placeholder="Company Name"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor={`duration-${expIndex}`}>Duration</Label>
                        <Input
                          id={`duration-${expIndex}`}
                          value={exp.duration}
                          onChange={(e) => updateExperienceField(expIndex, 'duration', e.target.value)}
                          placeholder="Nov'22 - Dec'22"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Responsibilities</Label>
                      <div className="space-y-2 mt-2">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <div key={respIndex} className="flex gap-2">
                            <Textarea
                              value={resp}
                              onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)}
                              placeholder="Describe your responsibility..."
                              className="border-gray-200 focus:border-blue-500"
                              rows={2}
                            />
                            <Button
                              onClick={() => removeResponsibility(expIndex, respIndex)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 h-auto"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => addResponsibility(expIndex)}
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Responsibility
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addExperience} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {resumeData.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">Project {projectIndex + 1}</h3>
                      <Button
                        onClick={() => removeProject(projectIndex)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`project-name-${projectIndex}`}>Project Name</Label>
                        <Input
                          id={`project-name-${projectIndex}`}
                          value={project.name}
                          onChange={(e) => updateProjectField(projectIndex, 'name', e.target.value)}
                          placeholder="CS Quiz Master"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`project-date-${projectIndex}`}>Date</Label>
                        <Input
                          id={`project-date-${projectIndex}`}
                          value={project.date}
                          onChange={(e) => updateProjectField(projectIndex, 'date', e.target.value)}
                          placeholder="April'24"
                          className="border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Project Description</Label>
                      <div className="space-y-2 mt-2">
                        {project.description.map((desc, descIndex) => (
                          <div key={descIndex} className="flex gap-2">
                            <Textarea
                              value={desc}
                              onChange={(e) => updateDescription(projectIndex, descIndex, e.target.value)}
                              placeholder="Describe what you accomplished in this project..."
                              className="border-gray-200 focus:border-blue-500"
                              rows={2}
                            />
                            <Button
                              onClick={() => removeDescription(projectIndex, descIndex)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 h-auto"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => addDescription(projectIndex)}
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Description
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addProject} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  placeholder="Java, JavaScript, React, Python..."
                  value={resumeData.skills.join(', ')}
                  onChange={(e) => updateSkills(e.target.value)}
                  className="border-gray-200 focus:border-blue-500"
                />
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Label htmlFor="achievements">Achievements (one per line)</Label>
                <Textarea
                  id="achievements"
                  placeholder="3-star rating on HackerRank for Java&#10;Ranked among top 300 on GeeksforGeeks"
                  value={resumeData.achievements.join('\n')}
                  onChange={(e) => updateAchievements(e.target.value)}
                  className="min-h-[100px] border-gray-200 focus:border-blue-500"
                />
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Label htmlFor="certifications">Certifications (one per line)</Label>
                <Textarea
                  id="certifications"
                  placeholder="Java – Apna college&#10;HTML, CSS, JavaScript - Coursera"
                  value={resumeData.certifications.join('\n')}
                  onChange={(e) => updateCertifications(e.target.value)}
                  className="min-h-[100px] border-gray-200 focus:border-blue-500"
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  Resume Preview
                  <Button 
                    onClick={handleDownloadPDF}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div id="resume-content" className="bg-white text-black font-sans w-full max-w-[8.27in] mx-auto" style={{ minHeight: '11.69in', fontSize: '11px', lineHeight: '1.4' }}>
                  {/* Header */}
                  <div className="text-center py-4 border-b border-gray-400">
                    <h1 className="text-xl font-bold text-black mb-1 tracking-normal uppercase">
                      {resumeData.personalInfo.name}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-3 text-xs text-black">
                      <span>{resumeData.personalInfo.email}</span>
                      <span>•</span>
                      <span>{resumeData.personalInfo.phone}</span>
                      <span>•</span>
                      <span>{resumeData.personalInfo.linkedin}</span>
                      <span>•</span>
                      <span>{resumeData.personalInfo.github}</span>
                    </div>
                    <div className="text-xs text-black mt-1">
                      {resumeData.personalInfo.address}
                    </div>
                  </div>

                  <div className="px-6 py-3 space-y-4">
                    {/* Professional Summary */}
                    {resumeData.summary && (
                      <div>
                        <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                          PROFESSIONAL SUMMARY
                        </h2>
                        <p className="text-xs leading-relaxed text-black">
                          {resumeData.summary}
                        </p>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                          EDUCATION
                        </h2>
                        <div className="space-y-2">
                          {resumeData.education.map((edu, index) => (
                            <div key={index}>
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-semibold text-black text-xs">{edu.degree}</div>
                                  <div className="text-black text-xs">{edu.institution}</div>
                                  {edu.gpa && (
                                    <div className="text-black text-xs">CGPA: {edu.gpa}</div>
                                  )}
                                </div>
                                {edu.year && (
                                  <div className="text-xs text-black font-medium">{edu.year}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Skills */}
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                          TECHNICAL SKILLS
                        </h2>
                        <div className="text-xs text-black">
                          <strong>Languages & Technologies:</strong> {resumeData.skills.join(', ')}
                        </div>
                      </div>
                    )}

                    {/* Work Experience */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                          PROFESSIONAL EXPERIENCE
                        </h2>
                        <div className="space-y-3">
                          {resumeData.experience.map((exp, index) => (
                            <div key={index}>
                              <div className="flex justify-between items-start mb-1">
                                <div>
                                  <div className="font-semibold text-black text-xs">{exp.position}</div>
                                  <div className="text-black text-xs font-medium">{exp.company}</div>
                                </div>
                                <div className="text-xs text-black font-medium">{exp.duration}</div>
                              </div>
                              <ul className="ml-3 space-y-1">
                                {exp.responsibilities.map((resp, respIndex) => (
                                  <li key={respIndex} className="text-xs text-black relative pl-2 before:content-['•'] before:absolute before:left-0">
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                          PROJECTS
                        </h2>
                        <div className="space-y-3">
                          {resumeData.projects.map((project, index) => (
                            <div key={index}>
                              <div className="flex justify-between items-start mb-1">
                                <div className="font-semibold text-black text-xs">{project.name}</div>
                                <div className="text-xs text-black font-medium">{project.date}</div>
                              </div>
                              <ul className="ml-3 space-y-1">
                                {project.description.map((desc, descIndex) => (
                                  <li key={descIndex} className="text-xs text-black relative pl-2 before:content-['•'] before:absolute before:left-0">
                                    {desc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {resumeData.achievements.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                          ACHIEVEMENTS
                        </h2>
                        <ul className="ml-3 space-y-1">
                          {resumeData.achievements.map((achievement, index) => (
                            <li key={index} className="text-xs text-black relative pl-2 before:content-['•'] before:absolute before:left-0">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Certifications */}
                    {resumeData.certifications.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-black mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                          CERTIFICATIONS
                        </h2>
                        <ul className="ml-3 space-y-1">
                          {resumeData.certifications.map((cert, index) => (
                            <li key={index} className="text-xs text-black relative pl-2 before:content-['•'] before:absolute before:left-0">
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
