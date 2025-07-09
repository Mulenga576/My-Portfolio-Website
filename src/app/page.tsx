import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Hi, I'm Your Name</span>
              <span className="block text-blue-600">Full Stack Developer</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              I build exceptional digital experiences with modern web technologies.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/#projects"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  View My Work
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Me
            </h2>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Your Photo</span>
                  </div>
                </div>
                <div className="lg:py-16">
                  <p className="mt-4 text-gray-600">
                    Hello! I'm a passionate Full Stack Developer with expertise in building modern web applications. 
                    I love turning ideas into reality through clean, efficient, and maintainable code.
                  </p>
                  <p className="mt-4 text-gray-600">
                    With a strong foundation in both frontend and backend development, I create seamless user 
                    experiences while ensuring robust and scalable server-side functionality.
                  </p>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900">Technologies I work with:</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Git'].map((tech) => (
                        <div key={tech} className="flex items-center">
                          <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              My Projects
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Here are some of the projects I've worked on recently.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[1, 2, 3].map((project) => (
              <div key={project} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Project {project} Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">Project {project}</h3>
                  <p className="mt-2 text-gray-600">
                    A brief description of the project and the technologies used. Highlight the key features and your role in the project.
                  </p>
                  <div className="mt-4">
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
