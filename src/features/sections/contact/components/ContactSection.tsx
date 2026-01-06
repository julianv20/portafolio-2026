import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";
import { CONTACT_INFO } from "../../../../core/constants/portfolio.constants";

export default function ContactSection() {
  const contactMethods = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: CONTACT_INFO.email,
      link: `mailto:${CONTACT_INFO.email}`,
      bgColor: "#3EB0F9",
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: CONTACT_INFO.github,
      link: CONTACT_INFO.github,
      bgColor: "#FF5500",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: CONTACT_INFO.linkedin,
      link: CONTACT_INFO.linkedin,
      bgColor: "#3EB0F9",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      value: CONTACT_INFO.twitter,
      link: CONTACT_INFO.twitter,
      bgColor: "#FFA61E",
    },
    {
      icon: <FaGlobe />,
      label: "Website",
      value: CONTACT_INFO.website,
      link: CONTACT_INFO.website,
      bgColor: "#FF5500",
    },
  ].filter((method) => method.value); // Solo mostrar los que tengan valor

  return (
    <div className="p-6 space-y-6" style={{ color: "#F7F7F7" }}>
      {/* Header */}
      <div
        className="flex items-center gap-2 pb-4"
        style={{ borderBottom: "1px solid #F7F7F7", color: "#3EB0F9" }}
      >
        <FaEnvelope className="text-lg" />
        <h3 className="text-xl font-semibold">Contacto</h3>
      </div>

      {/* Intro text */}
      <div className="leading-relaxed" style={{ color: "#D0D0D0" }}>
        <p>¿Tienes un proyecto en mente o quieres colaborar?</p>
        <p className="mt-2" style={{ color: "#3EB0F9" }}>
          Conectemos y hagamos algo increíble juntos.
        </p>
      </div>

      {/* Contact methods */}
      <div className="space-y-3">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.link}
            target={method.label !== "Email" ? "_blank" : undefined}
            rel={method.label !== "Email" ? "noopener noreferrer" : undefined}
            className="flex items-center gap-4 p-4 rounded-lg transition-all duration-75 border-2 group"
            style={{
              backgroundColor: method.bgColor,
              borderColor: "#F7F7F7",
              boxShadow: "3px 3px 0px 0px #F7F7F7",
              color: "#000000",
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
            {/* Icon */}
            <div className="text-2xl" style={{ color: "#000000" }}>
              {method.icon}
            </div>

            {/* Label and value */}
            <div className="flex-1">
              <div className="text-sm opacity-70">{method.label}</div>
              <div className="font-medium text-sm break-all">
                {method.label === "Email"
                  ? method.value
                  : method.value
                      ?.replace("https://", "")
                      .replace("http://", "")}
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">
              →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
