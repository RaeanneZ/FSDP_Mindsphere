import React from "react";
import { founders } from "../utils";

const AboutSection = () => {
  return (
    <section className="bg-[#F5F7FA] py-16 px-8 text-center">
      <h2 className="text-3xl font-semibold mb-2">About</h2>
      <p className="text-lg text-gray-600 mb-8">
        Introducing the leadership team and their journey.
      </p>

      {/* Image of Founders */}
      <div className="flex justify-center mb-12">
        <img
          src={founders}
          alt="Founders"
          className="rounded-lg shadow-lg w-3/4 max-w-lg"
        />
      </div>

      {/* Founder's Profiles */}
      <div className="max-w-4xl mx-auto text-left space-y-8">
        {/* Profile for Simon */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Simon, Founder</h3>
          <p>
            Simon has over 32 years of experience in real estate and
            international partnerships. He holds a Bachelor of Arts in Business
            Management from Kingston University and has pursued:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              Cambridge International Diploma in Teaching and Training from the
              University of Cambridge
            </li>
            <li>
              Certified Professional Coach by the International Coaches
              Federation
            </li>
            <li>
              ACTA Certified Trainer by Singapore Workforce Skills
              Qualifications
            </li>
          </ul>
          <p>
            He spent over a decade at OrangeTee & Tie Pte Ltd (OTT), one of
            Singapore's top real estate agencies, rising through the ranks to
            Board of Director and Chief Operating Officer where he trained
            thousands of real estate agents and team leaders. He spearheaded
            integration efforts during OTT's merger and acquisition, integrating
            over 95% of the salesforce, exceeding 1,000 salespeople.
          </p>
          <p>
            Always up for a challenge, Simon left OTT to become Managing
            Director at Singapore's first geospatial technology company
            Mogul.sg, securing a significant public-private partnership with the
            Ministry of National Development, marking a significant milestone in
            Singapore's real estate industry. This pioneer initiative sets a new
            standard for industry-government cooperation and drives sustainable
            urban development strategies.
          </p>
          <p>
            Currently, Simon serves as a consultant and advisor to several
            organizations in Singapore and is involved in entrepreneurship,
            driven by his mission to give back to society.
          </p>
        </div>

        {/* Profile for Christine */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Christine, Co-Founder</h3>
          <p>
            Graduated with a Bachelor in Business Management from the Royal
            Melbourne Institute of Technology, Christine embodies multi-talent;
            she started teaching at the tender age of 17 and with patience as
            her strongest virtue, she advocates inclusive education for both
            neurotypical and special needs children. For close to 20 years now,
            she pursues her passion as an educator fervently, with an
            inclination towards guiding students who struggle with passing exams
            to eventually pass with flying colors.
          </p>
          <p>
            At 35, she took up the role of Adjunct Lecturer at the School of
            Business and Accountancy with Ngee Ann Polytechnic, extending her
            impact to adult teaching and motivating them to greater heights in
            their careers. She has impacted over 10,000 students till date.
          </p>
          <p>
            Concurrently, Christine hones her People skills through Business
            Development in the Banking and Finance sector. Currently a Talent
            Development Lead with the Singapore FinTech Association, she
            identifies with the sector’s hiring needs and gaps and commits to
            growing talents within Singapore to feed into the sector. Her
            expertise in both education and talent development harmonize
            complementarily, enabling her to become the bridge between employers
            and the future pillars of our economy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
