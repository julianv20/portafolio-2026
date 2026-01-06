import { FaTools } from "react-icons/fa";
import { SKILLS } from "../../../../core/constants/portfolio.constants";

export default function SkillsSection() {
  // Agrupar skills por categoría
  const frontendSkills = SKILLS.filter(
    (skill) => skill.category === "frontend"
  );
  const backendSkills = SKILLS.filter((skill) => skill.category === "backend");
  const toolsSkills = SKILLS.filter((skill) => skill.category === "tools");

  return (
    <div className="p-6 space-y-6" style={{ color: "#F7F7F7" }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 pb-4"
        style={{ borderBottom: "1px solid #F7F7F7", color: "#3EB0F9" }}
      >
        <FaTools className="text-lg" />
        <h3 className="text-xl font-semibold">Skills</h3>
      </div>

      {/* Skills por categoría */}
      <div className="space-y-6">
        {/* Frontend */}
        {frontendSkills.length > 0 && (
          <div className="space-y-3">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#3EB0F9" }}
            >
              Frontend
            </h4>
            <div className="flex flex-wrap gap-2">
              {frontendSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-75 border-2"
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
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backend */}
        {backendSkills.length > 0 && (
          <div className="space-y-3">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#FF5500" }}
            >
              Backend
            </h4>
            <div className="flex flex-wrap gap-2">
              {backendSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-75 border-2"
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
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Herramientas */}
        {toolsSkills.length > 0 && (
          <div className="space-y-3">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#FFA61E" }}
            >
              Herramientas
            </h4>
            <div className="flex flex-wrap gap-2">
              {toolsSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-75 border-2"
                  style={{
                    backgroundColor: "#FFA61E",
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
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
