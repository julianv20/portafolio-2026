import { FaUser, FaCode, FaRocket, FaCertificate } from "react-icons/fa";
import { PERSONAL_INFO } from "../../../../core/constants/portfolio.constants";

export default function AboutSection() {
  return (
    <div className="p-6 space-y-6" style={{ color: "#F7F7F7" }}>
      {/* Header con avatar */}
      <div
        className="flex items-center gap-6 pb-6"
        style={{ borderBottom: "1px solid #F7F7F7" }}
      >
        {/* Avatar */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center border-2 flex-shrink-0"
          style={{
            backgroundColor: "#3EB0F9",
            borderColor: "#F7F7F7",
          }}
        >
          <FaUser className="text-4xl" style={{ color: "#000000" }} />
        </div>

        {/* Info básica */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#F7F7F7" }}>
            {PERSONAL_INFO.name}
          </h2>
          <p
            className="text-lg flex items-center gap-2"
            style={{ color: "#3EB0F9" }}
          >
            <FaCode />
            {PERSONAL_INFO.title}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-4">
        <div className="flex items-center gap-2" style={{ color: "#3EB0F9" }}>
          <FaRocket className="text-lg" />
          <h3 className="text-xl font-semibold">Sobre mí</h3>
        </div>
        <p className="leading-relaxed text-base" style={{ color: "#D0D0D0" }}>
          {PERSONAL_INFO.bio}
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 pt-4">
        <div
          className="flex-1 min-w-[140px] rounded-lg p-4 text-center transition-all duration-75 border-2 cursor-pointer"
          style={{
            backgroundColor: "#3EB0F9",
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
          <div className="text-2xl font-bold" style={{ color: "#000000" }}>
            3+
          </div>
          <div className="text-sm" style={{ color: "#000000" }}>
            Años Exp.
          </div>
        </div>

        <div
          className="flex-1 min-w-[140px] rounded-lg p-4 text-center transition-all duration-75 border-2 cursor-pointer"
          style={{
            backgroundColor: "#FFA61E",
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
          <div className="text-2xl font-bold" style={{ color: "#000000" }}>
            9+
          </div>
          <div className="text-sm" style={{ color: "#000000" }}>
            Skills
          </div>
        </div>
      </div>

      {/* Certificaciones */}
      <div
        className="space-y-4 pt-4"
        style={{ borderTop: "1px solid #F7F7F7" }}
      >
        <div className="flex items-center gap-2" style={{ color: "#3EB0F9" }}>
          <FaCertificate className="text-lg" />
          <h3 className="text-xl font-semibold">Certificaciones & Cursos</h3>
        </div>
        <a
          href="https://drive.google.com/drive/folders/1lVsXG0J7Q-I-LxuvF_hH1fXmt7h5Bblu"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg p-4 transition-all duration-75 border-2 cursor-pointer no-underline"
          style={{
            backgroundColor: "#1E1E1E",
            borderColor: "#3EB0F9",
            boxShadow: "3px 3px 0px 0px #3EB0F9",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-2px, -2px)";
            e.currentTarget.style.boxShadow = "5px 5px 0px 0px #3EB0F9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0, 0)";
            e.currentTarget.style.boxShadow = "3px 3px 0px 0px #3EB0F9";
          }}
        >
          <p className="text-sm" style={{ color: "#D0D0D0" }}>
            Accede a mi carpeta de Google Drive con todos mis certificados y
            diplomas de cursos realizados
          </p>
          <p
            className="text-xs mt-2 font-semibold"
            style={{ color: "#3EB0F9" }}
          >
            Ver certificaciones →
          </p>
        </a>
      </div>
    </div>
  );
}
