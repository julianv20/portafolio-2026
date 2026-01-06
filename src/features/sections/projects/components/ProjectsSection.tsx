import { FaBriefcase, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { PROJECTS } from "../../../../core/constants/portfolio.constants";

export default function ProjectsSection() {
  return (
    <div className="p-6 space-y-6" style={{ color: "#F7F7F7" }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 pb-4"
        style={{ borderBottom: "1px solid #F7F7F7", color: "#3EB0F9" }}
      >
        <FaBriefcase className="text-lg" />
        <h3 className="text-xl font-semibold">Proyectos</h3>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="rounded-lg p-5 transition-all duration-75 border-2"
            style={{
              backgroundColor: index % 2 === 0 ? "#252525" : "#2A2A2A",
              borderColor: "#F7F7F7",
              boxShadow: "3px 3px 0px 0px #F7F7F7",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = "5px 5px 0px 0px #F7F7F7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "3px 3px 0px 0px #F7F7F7";
            }}
          >
            {/* Title */}
            <h4 className="text-lg font-bold mb-2" style={{ color: "#F7F7F7" }}>
              {project.title}
            </h4>

            {/* Description */}
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: "#D0D0D0" }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium border"
                  style={{
                    backgroundColor: "#3EB0F9",
                    borderColor: "#F7F7F7",
                    color: "#000000",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 flex-wrap">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-75 border-2"
                  style={{
                    backgroundColor: "#3EB0F9",
                    borderColor: "#F7F7F7",
                    color: "#000000",
                    boxShadow: "2px 2px 0px 0px #F7F7F7",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-1px, -1px)";
                    e.currentTarget.style.boxShadow = "3px 3px 0px 0px #F7F7F7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = "2px 2px 0px 0px #F7F7F7";
                  }}
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Ver
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all duration-75 border-2"
                  style={{
                    backgroundColor: "#FF5500",
                    borderColor: "#F7F7F7",
                    color: "#000000",
                    boxShadow: "2px 2px 0px 0px #F7F7F7",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-1px, -1px)";
                    e.currentTarget.style.boxShadow = "3px 3px 0px 0px #F7F7F7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = "2px 2px 0px 0px #F7F7F7";
                  }}
                >
                  <FaGithub className="text-xs" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
