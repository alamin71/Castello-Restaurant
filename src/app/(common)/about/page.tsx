import AboutBranches from '@/main/About/AboutBranches';
import AboutHero from '@/main/About/AboutHero';
import Targets from '@/main/About/Targets';
import Team from '@/main/About/Team';

const About = () => {
    return (
        <div>
            <AboutHero />
            <Targets />
            <Team />
            <AboutBranches />
        </div>
    );
};

export default About;