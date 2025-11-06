import Image from "next/image";
import { Quicksand, Poppins } from "next/font/google";
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Home = () => {
  return (
    <div className="p-32 !bg-white h-svh w-full overflow-auto">
      <div className="w-full flex justify-between items-center">
        <Image
          src="/saad/Frames.svg"
          alt="Description"
          width={100}
          height={100}
          className="h-32 w-32"
        />
        <Image
          src="/saad/Frames-laptop.svg"
          alt="Description"
          width={100}
          height={100}
          className="h-32 w-32"
        />
      </div>
      <div className="flex justify-center w-full">
        <h1
          className={`text-8xl font-bold max-w-[1420px] text-center relative`}
          style={{
            fontFamily: `${quicksand.style.fontFamily} !important`,
            letterSpacing: "-0.5px",
          }}
        >
          Learn At Your Own Pace. Anywhere, Anytime
          <span className="relative flex items-start justify-start">
            <Image
              src="/saad/Frame-calendar.svg"
              alt="Description"
              width={1000}
              height={1000}
              className="h-40 w-40 absolute right-20 -top-24"
            />
          </span>
        </h1>
      </div>

      <div className="mt-32 flex justify-center items-center">
        <div className="relative h-[350px] w-[350px]">
          <Image
            src="/saad/Frame-learn.svg"
            alt="Description"
            width={100}
            height={100}
            className="h-32 w-32 absolute top-6 -left-[660px]"
          />
          <Image
            src="/saad/Frame-bulb.svg"
            alt="Description"
            width={100}
            height={100}
            className="h-32 w-32 absolute top-0 left-[900px]"
          />

          <div className="group w-[350px] h-[350px] hover:w-[500px] absolute -left-[570px] top-20 overflow-visible z-[1] hover:z-50">
            <div className="relative">
              <div className="absolute inset-x-[-50px]"></div>
              <Image
                src="/saad/home-1.png"
                width={1000}
                height={1000}
                alt="home"
                className="w-[350px] h-[350px] rounded-3xl object-cover 
                  -rotate-[21.85deg] transition-all duration-300 ease-in-out
                  group-hover:rotate-0 group-hover:!w-[500px] group-hover:!h-[500px]"
                style={{
                  boxShadow:
                    "-12px 4px 24px 0px #00000040, 12px 4px 24px 0px #00000040",
                }}
              />

              <div
                className="w-72 h-fit absolute inset-0 hidden group-hover:flex flex-col 
            bg-[#ffffff2a] backdrop-blur-[20.100000381469727px] transition-opacity rounded-3xl m-auto p-6"
              >
                <p className="flex justify-between">
                  <span
                    className="text-white font-medium mb-2"
                    style={{
                      fontFamily: `${poppins.style.fontFamily} !important`,
                    }}
                  >
                    Advanced Product Design Class
                  </span>
                  <span
                    className="text-white text-[28px] font-semibold"
                    style={{
                      fontFamily: `${quicksand.style.fontFamily} !important`,
                    }}
                  >
                    $299
                  </span>
                </p>
                <button
                  className="mt-5 bg-white text-[#191919] px-10 py-5 rounded-full font-semibold"
                  style={{
                    boxShadow: "0px 4px 4px 0px #00000040",
                    fontFamily: `${poppins.style.fontFamily} !important`,
                  }}
                >
                  Explore Class
                </button>
              </div>
            </div>
          </div>

          <div className="group w-[350px] h-[350px] hover:w-[500px] absolute -left-[350px] overflow-visible z-[2] hover:z-50">
            <div className="relative">
              <div className="absolute inset-x-[-50px]"></div>
              <Image
                src="/saad/home-2.png"
                width={1000}
                height={1000}
                alt="home"
                className="w-[350px] h-[350px] rounded-3xl object-cover 
                  -rotate-[11.3deg] transition-all duration-300 ease-in-out
                  group-hover:rotate-0 group-hover:!w-[500px] group-hover:!h-[500px]"
                style={{
                  boxShadow:
                    "-12px 4px 24px 0px #00000040, 12px 4px 24px 0px #00000040",
                }}
              />
              <div
                className="w-72 h-fit absolute inset-0 hidden group-hover:flex flex-col 
            bg-[#ffffff2a] backdrop-blur-[20.100000381469727px] transition-opacity rounded-3xl m-auto p-6"
              >
                <p className="flex justify-between">
                  <span
                    className="text-white font-medium mb-2"
                    style={{
                      fontFamily: `${poppins.style.fontFamily} !important`,
                    }}
                  >
                    Branding Masterclass
                  </span>
                  <span
                    className="text-white text-[28px] font-semibold"
                    style={{
                      fontFamily: `${quicksand.style.fontFamily} !important`,
                    }}
                  >
                    $199
                  </span>
                </p>
                <button
                  className="mt-5 bg-white text-[#191919] px-10 py-5 rounded-full font-semibold"
                  style={{
                    boxShadow: "0px 4px 4px 0px #00000040",
                    fontFamily: `${poppins.style.fontFamily} !important`,
                  }}
                >
                  Explore Class
                </button>
              </div>
            </div>
          </div>

          {/* Image 3 */}
          <div className="group w-[350px] h-[350px] hover:w-[500px] absolute -left-[166px] overflow-visible z-[3] hover:z-50">
            <div className="relative">
              <div className="absolute inset-x-[-50px]"></div>
              <Image
                src="/saad/home-3.png"
                width={1000}
                height={1000}
                alt="home"
                className="w-[350px] h-[350px] rounded-3xl object-cover 
                  -rotate-[7.9deg] transition-all duration-300 ease-in-out
                  group-hover:rotate-0 group-hover:!w-[500px] group-hover:!h-[500px]"
                style={{
                  boxShadow:
                    "-12px 4px 24px 0px #00000040, 12px 4px 24px 0px #00000040",
                }}
              />
              <div
                className="w-72 h-fit absolute inset-0 hidden group-hover:flex flex-col 
            bg-[#ffffff2a] backdrop-blur-[20.100000381469727px] transition-opacity rounded-3xl m-auto p-6"
              >
                <p className="flex justify-between">
                  <span
                    className="text-white font-medium mb-2"
                    style={{
                      fontFamily: `${poppins.style.fontFamily} !important`,
                    }}
                  >
                    UI/UX for Beginners
                  </span>
                  <span
                    className="text-white text-[28px] font-semibold"
                    style={{
                      fontFamily: `${quicksand.style.fontFamily} !important`,
                    }}
                  >
                    $249
                  </span>
                </p>
                <button
                  className="mt-5 bg-white text-[#191919] px-10 py-5 rounded-full font-semibold"
                  style={{
                    boxShadow: "0px 4px 4px 0px #00000040",
                    fontFamily: `${poppins.style.fontFamily} !important`,
                  }}
                >
                  Explore Class
                </button>
              </div>
            </div>
          </div>

          {/* Image 4 */}
          <div className="group w-[350px] h-[350px] hover:w-[500px] absolute left-24 overflow-visible z-[4] hover:z-50">
            <div className="relative">
              <div className="absolute inset-x-[-50px]"></div>
              <Image
                src="/saad/home-4.png"
                width={1000}
                height={1000}
                alt="home"
                className="w-[350px] h-[350px] rounded-3xl object-cover 
                  transition-all duration-300 ease-in-out
                  group-hover:rotate-0 group-hover:!w-[500px] group-hover:!h-[500px]"
                style={{
                  boxShadow:
                    "-12px 4px 24px 0px #00000040, 12px 4px 24px 0px #00000040",
                }}
              />
              <div
                className="w-72 h-fit absolute inset-0 hidden group-hover:flex flex-col 
            bg-[#ffffff2a] backdrop-blur-[20.100000381469727px] transition-opacity rounded-3xl m-auto p-6"
              >
                <p className="flex justify-between">
                  <span
                    className="text-white font-medium mb-2"
                    style={{
                      fontFamily: `${poppins.style.fontFamily} !important`,
                    }}
                  >
                    Creative Animation Course
                  </span>
                  <span
                    className="text-white text-[28px] font-semibold"
                    style={{
                      fontFamily: `${quicksand.style.fontFamily} !important`,
                    }}
                  >
                    $179
                  </span>
                </p>
                <button
                  className="mt-5 bg-white text-[#191919] px-10 py-5 rounded-full font-semibold"
                  style={{
                    boxShadow: "0px 4px 4px 0px #00000040",
                    fontFamily: `${poppins.style.fontFamily} !important`,
                  }}
                >
                  Explore Class
                </button>
              </div>
            </div>
          </div>

          {/* Image 5 */}
          <div className="group w-[350px] h-[350px] hover:w-[500px] absolute left-[344px] overflow-visible z-[5] hover:z-50">
            <div className="relative">
              <div className="absolute inset-x-[-50px]"></div>
              <Image
                src="/saad/home-5.png"
                width={1000}
                height={1000}
                alt="home"
                className="w-[350px] h-[350px] rounded-3xl object-cover 
                  rotate-[12.52deg] transition-all duration-300 ease-in-out
                  group-hover:rotate-0 group-hover:!w-[500px] group-hover:!h-[500px]"
                style={{
                  boxShadow:
                    "-12px 4px 24px 0px #00000040, 12px 4px 24px 0px #00000040",
                }}
              />
              <div
                className="w-72 h-fit absolute inset-0 hidden group-hover:flex flex-col 
            bg-[#ffffff2a] backdrop-blur-[20.100000381469727px] transition-opacity rounded-3xl m-auto p-6"
              >
                <p className="flex justify-between">
                  <span
                    className="text-white font-medium mb-2"
                    style={{
                      fontFamily: `${poppins.style.fontFamily} !important`,
                    }}
                  >
                    Photography Essentials
                  </span>
                  <span
                    className="text-white text-[28px] font-semibold"
                    style={{
                      fontFamily: `${quicksand.style.fontFamily} !important`,
                    }}
                  >
                    $149
                  </span>
                </p>
                <button
                  className="mt-5 bg-white text-[#191919] px-10 py-5 rounded-full font-semibold"
                  style={{
                    boxShadow: "0px 4px 4px 0px #00000040",
                    fontFamily: `${poppins.style.fontFamily} !important`,
                  }}
                >
                  Explore Class
                </button>
              </div>
            </div>
          </div>

          {/* Image 6 */}
          <div className="group w-[350px] h-[350px] hover:w-[500px] absolute left-[570px] top-14 overflow-visible z-[6] hover:z-50">
            <div className="relative">
              <div className="absolute inset-x-[-50px]"></div>
              <Image
                src="/saad/home-6.png"
                width={1000}
                height={1000}
                alt="home"
                className="w-[350px] h-[350px] rounded-3xl object-fill 
                  rotate-[22.57deg] transition-all duration-300 ease-in-out
                  group-hover:rotate-0 group-hover:!w-[500px] group-hover:!h-[500px]"
                style={{
                  boxShadow:
                    "-12px 4px 24px 0px #00000040, 12px 4px 24px 0px #00000040",
                }}
              />
              <div
                className="w-72 h-fit absolute inset-0 hidden group-hover:flex flex-col 
            bg-[#ffffff2a] backdrop-blur-[20.100000381469727px] transition-opacity rounded-3xl m-auto p-6"
              >
                <p className="flex justify-between">
                  <span
                    className="text-white font-medium mb-2"
                    style={{
                      fontFamily: `${poppins.style.fontFamily} !important`,
                    }}
                  >
                    Motion Design Pro
                  </span>
                  <span
                    className="text-white text-[28px] font-semibold"
                    style={{
                      fontFamily: `${quicksand.style.fontFamily} !important`,
                    }}
                  >
                    $279
                  </span>
                </p>
                <button
                  className="mt-5 bg-white text-[#191919] px-10 py-5 rounded-full font-semibold"
                  style={{
                    boxShadow: "0px 4px 4px 0px #00000040",
                    fontFamily: `${poppins.style.fontFamily} !important`,
                  }}
                >
                  Explore Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <p
          className="mt-40 text-xl text-center max-w-5xl text-black"
          style={{ fontFamily: `${poppins.style.fontFamily} !important` }}
        >
          Join interactive live classes with expert instructors. Access recorded
          sessions, get personalized feedback, and advance your skills in
          real-time with flexible learning built around your life, master new
          skills on your schedule, from wherever you are.
        </p>
      </div>
      <div className="mt-24 flex justify-center gap-2">
        <button
          className="bg-[#191919] text-white px-16 py-8 rounded-full text-xl font-semibold transition duration-300"
          style={{
            boxShadow: "0px 4px 4px 0px #00000040",
            fontFamily: `${poppins.style.fontFamily} !important`,
          }}
        >
          Join For Free
        </button>
        <button
          className="bg-white text-[#191919] px-16 py-8 rounded-full text-xl font-semibold transition duration-300"
          style={{
            boxShadow: "0px 4px 4px 0px #00000040",
            fontFamily: `${poppins.style.fontFamily} !important`,
          }}
        >
          Explore Class
        </button>
      </div>
    </div>
  );
};

export default Home;
