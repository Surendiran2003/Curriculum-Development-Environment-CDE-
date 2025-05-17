import React from "react";
import Navbar from "../Components/Navbar";

const About = () => {
  const darkMode = localStorage.getItem("theme") === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
      }`}
    >
      <Navbar darkMode={darkMode} />

      <main className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
          About <span className={darkMode ? "text-emerald-400" : "text-emerald-600"}>CDE</span>
        </h1>

        <p
          className={`text-lg md:text-xl leading-relaxed mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <strong>CDE (Curriculum Development Environment)</strong> is an AI-powered web application
          built to assist educators and academic administrators in designing, reviewing, and publishing
          NEP-aligned syllabi and curricula. With intuitive UI, PDF exports, smart prerequisites, and
          intelligent outcome mapping, CDE empowers institutions to transition seamlessly into the future
          of education.
        </p>

        <p
          className={`text-lg md:text-xl leading-relaxed mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          The platform is open-source and built using modern technologies like React, TailwindCSS,
          Node.js  and AI integrations including PDF-lib and LLM APIs. It supports
          collaborative workflows, version control, and printable exports tailored to NEP standards.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-4 text-center">
          About Me
        </h2>
        <p
          className={`text-lg md:text-xl leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          I’m a postgraduate student in Computer Science and an open-source contributor, passionate
          about educational technology, FOSS, and AI. I created CDE as a tool to help institutions
          build academic content in a structured, modern, and accessible way. I’ve also spoken at FOSS
          events on building open hardware with FOSS tools, and enjoy exploring the intersection of
          academia and technology.
        </p>
      </main>

      <div
        className={`absolute inset-0 -z-10 ${
          darkMode
            ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-gray-900 to-gray-900"
            : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100/50 via-gray-50/50 to-white"
        }`}
      ></div>
    </div>
  );
};

export default About;
