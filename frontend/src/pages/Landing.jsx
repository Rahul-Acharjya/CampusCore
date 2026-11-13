import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, ChevronDown, GraduationCap, ShieldCheck, Users, BookOpen } from 'lucide-react';
import logo from '../assets/nlu-logo.png';
gsap.registerPlugin(ScrollTrigger);
const roles = [{ id: 'student', num: '02', title: 'Your Academic World.', copy: 'Attendance, assignments and university notices in one place.', icon: GraduationCap, cta: 'Student portal' }, { id: 'teacher', num: '03', title: 'Manage. Teach. Connect.', copy: 'Everything you need to manage classes, attendance, assignments and communication.', icon: Users, cta: 'Teacher portal' }, { id: 'admin', num: '04', title: 'Everything in Control.', copy: 'Manage departments, faculty, students and academic activities from one place.', icon: ShieldCheck, cta: 'Administrator portal' }];
export default function Landing() {
    const root = useRef(null), nav = useNavigate();


    useEffect(() => {
        const ctx = gsap.context(() => {

            
            const heroTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.hero-scene',
                    start: 'top top',
                    end: '+=1600',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            
            gsap.set('.role-reveal', {
                opacity: 0,
                scale: 0.8
            });

            
            heroTimeline.to('.hero-emblem', {
                scale: 8,
                rotation: 8,
                duration: 2,
                ease: 'power2.inOut'
            }, 0);

            
            heroTimeline.to('.hero-left', {
                opacity: 0,
                y: -80,
                duration: 0.8,
                ease: 'power2.out'
            }, 0.2);

           
            heroTimeline.to('.hero-right-quote', {
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: 'power2.out'
            }, 0.2);

           
            heroTimeline.to('.role-reveal', {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power3.out'
            }, 0.9);

           
            heroTimeline.to('.hero-emblem', {
                scale: 12,
                opacity: 0.08,
                duration: 1.2,
                ease: 'power2.inOut'
            }, 1);

            
            const panels = gsap.utils.toArray('.role-scene');

            panels.forEach((panel) => {

                gsap.fromTo(
                    panel.querySelector('.scene-copy'),
                    {
                        y: 90,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: panel,
                            start: 'top 75%',
                            end: 'top 30%',
                            scrub: 1
                        }
                    }
                );

                gsap.fromTo(
                    panel.querySelector('.login-preview'),
                    {
                        y: 70,
                        opacity: 0,
                        scale: 0.96
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: panel,
                            start: 'top 75%',
                            end: 'top 25%',
                            scrub: 1
                        }
                    }
                );

            });

        }, root);

        return () => ctx.revert();
    }, []);
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    return <main ref={root} className="landing">
    <div
    style={{
        position: 'fixed',
        top: '100px',
        left: '100px',
        zIndex: 99999,
        color: 'white',
       
        padding: '20px'
    }}
>

</div>
    <header className="topbar"><Link to="/" className="wordmark">CAMPUS<span>CORE</span></Link><nav className="main-nav"><button onClick={() => go('home')}>Home</button><button onClick={() => go('student')}>Student</button><button onClick={() => go('teacher')}>Teacher</button><button onClick={() => go('admin')}>Administration</button></nav><div className="nav-right"><span className="university-tag">NORTH LAKHIMPUR UNIVERSITY</span><button className="nav-login" onClick={() => go('student')}>Enter portal <ArrowUpRight size={15} /></button></div></header>
        <section id="home" className="scene hero-scene"><div className="hero-grid"></div><div className="hero-meta">

        </div>
            <div className="hero-left">
                <p className="eyebrow">NORTH LAKHIMPUR UNIVERSITY · DIGITAL CAMPUS</p>
                <h1 className="hero-title">One campus.<br /><em>One connected</em><br />experience.</h1>
                <p className="hero-desc">A smarter way to manage university life.<br />Learning, people and progress — in one place.</p>
                <button className="text-link" onClick={() => go('student')}>Explore CampusCore <ArrowDown size={16} />
                </button>
            </div>
            <div className="hero-emblem-wrap">
                <div className="emblem-orbit orbit-a">
                </div><div className="emblem-orbit orbit-b">
                </div>
                <img className="hero-emblem" src={logo} alt="North Lakhimpur University official emblem" />
                <span className="emblem-caption">EST. NORTH LAKHIMPUR UNIVERSITY</span>
            </div>
            <div className="hero-right-quote">
                <span>CONNECTED BY PURPOSE.</span>
                <p>Built for<br /><i>what's next.</i></p>
                <small>ONE UNIVERSITY. MANY POSSIBILITIES.</small>
            </div>
            <div className="role-reveal">

                <div
                    className="reveal-card"
                    onClick={() => nav('/login/student')}
                >
                    <div className="reveal-icon">
                        <GraduationCap size={28} />
                    </div>

                    <span>02</span>

                    <h3>Student</h3>

                    <p>
                        Attendance, assignments and university notices.
                    </p>

                    <button>
                        Enter portal
                        <ArrowUpRight size={15} />
                    </button>
                </div>


                <div
                    className="reveal-card"
                    onClick={() => nav('/login/teacher')}
                >
                    <div className="reveal-icon">
                        <Users size={28} />
                    </div>

                    <span>03</span>

                    <h3>Teacher</h3>

                    <p>
                        Manage classes, attendance and assignments.
                    </p>

                    <button>
                        Enter portal
                        <ArrowUpRight size={15} />
                    </button>
                </div>


                <div
                    className="reveal-card"
                    onClick={() => nav('/login/admin')}
                >
                    <div className="reveal-icon">
                        <ShieldCheck size={28} />
                    </div>

                    <span>04</span>

                    <h3>Administrator</h3>

                    <p>
                        Manage departments, faculty and students.
                    </p>

                    <button>
                        Enter portal
                        <ArrowUpRight size={15} />
                    </button>
                </div>

            </div>
            <div className="scroll-cue">
                <div>
                    <ArrowDown size={14} /></div>
            </div>
            {/* <div className="hero-index">01 <span>—</span> HOME</div> */}
        </section>
        {roles.map((r, i) => <section className={`scene role-scene role-${r.id}`} id={r.id} key={r.id}>
            <div className="scene-wash"></div>
            <div className="hero-meta"><span>{r.num} / 04</span><i></i><small>{r.id.toUpperCase()} PORTAL</small>
            </div>
            <div className="scene-copy">
                <p className="eyebrow">CAMPUSCORE / {r.id.toUpperCase()}</p>
                <h2>{r.title}</h2><p>{r.copy}</p><button className="text-link" onClick={() => nav(`/login/${r.id}`)}>Continue to {r.id} portal <ArrowUpRight size={16} />
                </button>
            </div>
            <div className="login-preview">
                <div className="preview-top">
                    <div className="preview-dots"><b></b><b></b><b></b></div><span>SECURE ACCESS / {r.num}</span>
                </div>
                <div className="preview-icon"><r.icon size={24} />
                </div>
                <h3>{r.id === 'student' ? 'Student access' : r.id === 'teacher' ? 'Faculty access' : 'Administrator access'}</h3>
                <p>Sign in with your university credentials</p>
                <div className="fake-field">{r.id === 'student' ? 'Student ID or email' : r.id === 'teacher' ? 'Teacher ID or official email' : 'Administrator email'}
                </div>
                <div className="fake-field">Password <span>••••••••••</span>
                </div>
                <button className="preview-button" onClick={() => nav(`/login/${r.id}`)}>Continue <ArrowUpRight size={15} />
                </button>
                <div className="preview-foot"><span>ENCRYPTED SESSION</span>
                    <span>NLU · CAMPUSCORE</span>
                </div>
            </div>
            <div className="scene-footer">
                <span>0{i + 2}</span>
                <span className="footer-line">
                </span><span>{r.id.toUpperCase()} EXPERIENCE</span>
            </div>
        </section>)}
        <footer className="landing-footer">
            <span className="wordmark">CAMPUS<span>CORE</span>
            </span>
            <span>North Lakhimpur University</span>
            <span>© 2026 CampusCore</span>
        </footer></main>
}
